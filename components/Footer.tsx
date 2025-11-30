import Link from "next/link";
import {
  Crown,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  ChevronRight,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Crown className="h-8 w-8 text-yellow-600" />
              <span className="text-2xl font-bold bg-linear-to-r from-yellow-600 to-yellow-800 bg-clip-text text-transparent">
                Grand Convention
              </span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Experience the pinnacle of luxury event hosting at Grand
              Convention. Our stunning venues and exceptional service create
              unforgettable moments for weddings, corporate events, and special
              celebrations.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center text-gray-300">
                <Phone className="h-5 w-5 mr-3 text-yellow-600" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center text-gray-300">
                <Mail className="h-5 w-5 mr-3 text-yellow-600" />
                <span>info@grandconvention.com</span>
              </div>
              <div className="flex items-center text-gray-300">
                <MapPin className="h-5 w-5 mr-3 text-yellow-600" />
                <span>123 Luxury Avenue, Grand City, GC 12345</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex space-x-4 mt-6">
              <a
                href="#"
                className="bg-gray-800 hover:bg-yellow-600 p-2 rounded-full transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="bg-gray-800 hover:bg-yellow-600 p-2 rounded-full transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="bg-gray-800 hover:bg-yellow-600 p-2 rounded-full transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-serif font-bold mb-6 text-yellow-600">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-yellow-600 transition-colors flex items-center"
                >
                  <ChevronRight className="h-4 w-4 mr-2" />
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/halls"
                  className="text-gray-300 hover:text-yellow-600 transition-colors flex items-center"
                >
                  <ChevronRight className="h-4 w-4 mr-2" />
                  Our Halls
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="text-gray-300 hover:text-yellow-600 transition-colors flex items-center"
                >
                  <ChevronRight className="h-4 w-4 mr-2" />
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-yellow-600 transition-colors flex items-center"
                >
                  <ChevronRight className="h-4 w-4 mr-2" />
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact-us"
                  className="text-gray-300 hover:text-yellow-600 transition-colors flex items-center"
                >
                  <ChevronRight className="h-4 w-4 mr-2" />
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-serif font-bold mb-6 text-yellow-600">
              Services
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-yellow-600 transition-colors flex items-center"
                >
                  <ChevronRight className="h-4 w-4 mr-2" />
                  Wedding Planning
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-yellow-600 transition-colors flex items-center"
                >
                  <ChevronRight className="h-4 w-4 mr-2" />
                  Corporate Events
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-yellow-600 transition-colors flex items-center"
                >
                  <ChevronRight className="h-4 w-4 mr-2" />
                  Private Parties
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-yellow-600 transition-colors flex items-center"
                >
                  <ChevronRight className="h-4 w-4 mr-2" />
                  Catering Services
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-gray-300 hover:text-yellow-600 transition-colors flex items-center"
                >
                  <ChevronRight className="h-4 w-4 mr-2" />
                  Event Decoration
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-xl font-serif font-bold mb-2 text-yellow-600">
                Stay Updated
              </h3>
              <p className="text-gray-300">
                Subscribe to our newsletter for exclusive offers and event
                planning tips.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-600"
              />
              <button className="px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2024 Grand Convention. All rights reserved.
            </div>
            <div className="flex space-x-6">
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-yellow-600 text-sm transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-gray-400 hover:text-yellow-600 text-sm transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/sitemap"
                className="text-gray-400 hover:text-yellow-600 text-sm transition-colors"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
