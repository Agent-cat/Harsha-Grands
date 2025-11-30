"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import {
  Crown,
  Menu,
  X,
  ChevronDown,
  Phone,
  Mail,
  Calendar,
  User,
  LogOut,
  Sparkles,
  Settings,
} from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchSession = async () => {
      const session = await authClient.getSession();
      setData(session.data);
    };
    fetchSession();
  }, []);

  const handleSignOut = async () => {
    await authClient.signOut();
    setData(null);
    setIsDropdownOpen(false);
  };

  const navigation = [
    { name: "Home", href: "/" },
    { name: "Our Halls", href: "/halls" },
    { name: "Gallery", href: "/gallery" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact-us" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-lg shadow-lg border-b border-yellow-100"
          : "bg-white/90 backdrop-blur-md border-b border-transparent"
      }`}
    >
      {/* Top Bar */}

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <Crown className="h-8 w-8 text-yellow-600 group-hover:text-yellow-700 transition-colors" />
              <Sparkles className="h-3 w-3 text-yellow-500 absolute -top-1 -right-1 animate-pulse" />
            </div>
            <span className="text-2xl font-serif font-bold bg-linear-to-r from-yellow-600 to-yellow-800 bg-clip-text text-transparent">
              Grand Convention
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative font-medium transition-all duration-200 ${
                  isActive(item.href)
                    ? "text-yellow-600"
                    : "text-gray-700 hover:text-yellow-600"
                }`}
              >
                {item.name}
                {isActive(item.href) && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-yellow-600 rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* Auth Section */}
          <div className="hidden lg:flex items-center space-x-4">
            {data?.user ? (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 px-4 py-2 bg-yellow-50 hover:bg-yellow-100 rounded-xl transition-colors border border-yellow-200"
                >
                  <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <span className="font-medium text-gray-800">
                    {data.user.name?.split(" ")[0] || "User"}
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-gray-600 transition-transform ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="font-medium text-gray-800">
                        {data.user.name}
                      </p>
                      <p className="text-sm text-gray-500">{data.user.email}</p>
                    </div>
                    <div className="py-2">
                      {data?.user?.role === "ADMIN" && (
                        <Link
                          href="/admin"
                          className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 transition-colors"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <Settings className="h-4 w-4" />
                          <span>Admin Panel</span>
                        </Link>
                      )}
                      <Link
                        href="/dashboard"
                        className="block px-4 py-2 text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 transition-colors"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        My Bookings
                      </Link>
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-gray-700 hover:bg-yellow-50 hover:text-yellow-600 transition-colors"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Profile Settings
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors flex items-center space-x-2"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  href="/auth/signin"
                  className="px-6 py-2 text-gray-700 hover:text-yellow-600 font-medium transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="px-6 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-xl font-medium transition-all duration-200 shadow-sm hover:shadow-lg"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-100">
            <div className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-3 rounded-xl font-medium transition-colors ${
                    isActive(item.href)
                      ? "bg-yellow-50 text-yellow-600"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100">
              {data?.user ? (
                <div className="space-y-3">
                  <div className="px-4 py-3 bg-yellow-50 rounded-xl">
                    <p className="font-medium text-gray-800">
                      {data.user.name}
                    </p>
                    <p className="text-sm text-gray-500">{data.user.email}</p>
                  </div>
                  {data?.user?.role === "ADMIN" && (
                    <Link
                      href="/admin"
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center space-x-2 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
                    >
                      <Settings className="h-4 w-4" />
                      <span>Admin Panel</span>
                    </Link>
                  )}
                  <Link
                    href="/dashboard"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
                  >
                    My Bookings
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors flex items-center space-x-2"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Link
                    href="/auth/signin"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-3 text-center bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/auth/signup"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-4 py-3 text-center bg-yellow-600 hover:bg-yellow-700 text-white rounded-xl font-medium transition-colors"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
