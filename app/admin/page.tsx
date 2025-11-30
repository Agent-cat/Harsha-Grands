"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import {
  Settings,
  Plus,
  Edit,
  Trash2,
  Calendar,
  Users,
  DollarSign,
  Eye,
  Crown,
  LogOut,
  Home,
  Building,
} from "lucide-react";

interface Hall {
  id: string;
  name: string;
  description: string;
  capacity: number;
  pricePerHour: number;
  imageUrl: string | null;
  amenities: string[];
  createdAt: string;
  updatedAt: string;
}

interface Booking {
  id: string;
  userId: string;
  hallId: string;
  customerName: string;
  customerPhone: string;
  bookingDate: string;
  startTime: string;
  endTime: string;
  totalPrice: number;
  status: string;
  createdAt: string;
  user: {
    name: string;
    email: string;
  };
  hall: {
    name: string;
  };
}

export default function AdminPage() {
  const [data, setData] = useState<any>(null);
  const [halls, setHalls] = useState<Hall[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("halls");

  useEffect(() => {
    const fetchSession = async () => {
      const session = await authClient.getSession();
      setData(session.data);

      if (!session.data?.user || session.data.user.role !== "ADMIN") {
        window.location.href = "/";
        return;
      }
    };
    fetchSession();
  }, []);

  useEffect(() => {
    if (data?.user?.role === "ADMIN") {
      fetchData();
    }
  }, [data, activeTab]);

  const fetchData = async () => {
    try {
      setLoading(true);
      if (activeTab === "halls") {
        const response = await fetch("/api/halls");
        if (response.ok) {
          const data = await response.json();
          setHalls(data);
        }
      } else if (activeTab === "bookings") {
        const response = await fetch("/api/bookings");
        if (response.ok) {
          const data = await response.json();
          setBookings(data);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await authClient.signOut();
    window.location.href = "/";
  };

  const deleteHall = async (id: string) => {
    if (!confirm("Are you sure you want to delete this hall?")) return;

    try {
      const response = await fetch(`/api/halls/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setHalls(halls.filter((hall) => hall.id !== id));
      }
    } catch (error) {
      console.error("Error deleting hall:", error);
    }
  };

  const updateBookingStatus = async (id: string, status: string) => {
    try {
      const response = await fetch(`/api/bookings/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });
      if (response.ok) {
        setBookings(
          bookings.map((booking) =>
            booking.id === id ? { ...booking, status } : booking
          )
        );
      }
    } catch (error) {
      console.error("Error updating booking:", error);
    }
  };

  if (!data?.user || data.user.role !== "ADMIN") {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Settings className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">
            Access Denied
          </h2>
          <p className="text-gray-600 mb-6">
            You don't have permission to access the admin panel.
          </p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-yellow-600 text-white rounded-xl hover:bg-yellow-700 transition-colors"
          >
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <Crown className="h-8 w-8 text-yellow-600" />
                <span className="text-xl font-serif font-bold text-gray-900">
                  Grand Convention
                </span>
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-xl font-semibold text-gray-900">
                Admin Panel
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">{data.user.name}</span>
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab("halls")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "halls"
                  ? "border-yellow-600 text-yellow-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center space-x-2">
                <Building className="h-4 w-4" />
                <span>Halls Management</span>
              </div>
            </button>
            <button
              onClick={() => setActiveTab("bookings")}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === "bookings"
                  ? "border-yellow-600 text-yellow-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>Bookings</span>
              </div>
            </button>
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "halls" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Halls Management
              </h2>
              <Link
                href="/admin/halls/new"
                className="inline-flex items-center px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add New Hall
              </Link>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl shadow-sm p-6 animate-pulse"
                  >
                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                    <div className="h-3 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {halls.map((hall) => (
                  <div
                    key={hall.id}
                    className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {hall.name}
                        </h3>
                        <div className="flex space-x-2">
                          <Link
                            href={`/admin/halls/${hall.id}/edit`}
                            className="p-2 text-gray-600 hover:text-yellow-600 transition-colors"
                          >
                            <Edit className="h-4 w-4" />
                          </Link>
                          <button
                            onClick={() => deleteHall(hall.id)}
                            className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {hall.description}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            <Users className="h-4 w-4" />
                            <span>{hall.capacity}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <DollarSign className="h-4 w-4" />
                            <span>${hall.pricePerHour}/hr</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "bookings" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Bookings Management
              </h2>
            </div>

            {loading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-white rounded-xl shadow-sm p-6 animate-pulse"
                  >
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Customer
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Hall
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date & Time
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {bookings.map((booking) => (
                        <tr key={booking.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {booking.customerName}
                              </div>
                              <div className="text-sm text-gray-500">
                                {booking.customerPhone}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {booking.hall.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {new Date(booking.bookingDate).toLocaleDateString()}
                            <br />
                            {booking.startTime} - {booking.endTime}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ${booking.totalPrice}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                booking.status === "confirmed"
                                  ? "bg-green-100 text-green-800"
                                  : booking.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {booking.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <select
                              value={booking.status}
                              onChange={(e) =>
                                updateBookingStatus(booking.id, e.target.value)
                              }
                              className="text-sm border-gray-300 rounded-md focus:ring-yellow-500 focus:border-yellow-500"
                            >
                              <option value="pending">Pending</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
