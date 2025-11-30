"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Share2,
  Crown,
  Users,
  Star,
  MapPin,
  Phone,
  Calendar,
  Check,
  X,
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

export default function HallDetailPage() {
  const params = useParams();
  const hallId = params.id as string;

  const [hall, setHall] = useState<Hall | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingStep, setBookingStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    customerName: "",
    customerPhone: "",
    bookingDate: "",
    startTime: "",
    endTime: "",
  });

  useEffect(() => {
    fetchHall();
  }, [hallId]);

  const fetchHall = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/halls/${hallId}`);
      if (response.ok) {
        const data = await response.json();
        setHall(data);
      }
    } catch (error) {
      console.error("Error fetching hall:", error);
    } finally {
      setLoading(false);
    }
  };

  const nextImage = () => {
    if (!hall) return;
    setCurrentImageIndex((prev) => (prev + 1) % 1); // Only one image for now
  };

  const prevImage = () => {
    if (!hall) return;
    setCurrentImageIndex((prev) => (prev - 1 + 1) % 1); // Only one image for now
  };

  const handleBookNow = async () => {
    const session = await authClient.getSession();
    if (!session.data?.user) {
      // Redirect to sign in
      window.location.href = "/auth/signin";
      return;
    }
    setShowBookingModal(true);
  };

  const submitBooking = async () => {
    try {
      const session = await authClient.getSession();
      if (!session.data?.user) return;

      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session.data.user.id,
          hallId: hall?.id,
          customerName: bookingData.customerName,
          customerPhone: bookingData.customerPhone,
          bookingDate: bookingData.bookingDate,
          startTime: bookingData.startTime,
          endTime: bookingData.endTime,
          totalPrice: hall?.pricePerHour || 0, // Calculate based on duration
        }),
      });

      if (response.ok) {
        setShowBookingModal(false);
        setBookingStep(1);
        setBookingData({
          customerName: "",
          customerPhone: "",
          bookingDate: "",
          startTime: "",
          endTime: "",
        });
        alert("Booking submitted successfully!");
      } else {
        alert("Failed to submit booking");
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
      alert("Failed to submit booking");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
          </div>
        </div>
        <div className="h-96 bg-gray-200 animate-pulse"></div>
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
            </div>
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-xl p-8 h-96 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!hall) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Crown className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">
            Hall Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The hall you're looking for doesn't exist or has been removed.
          </p>
          <Link
            href="/halls"
            className="inline-flex items-center px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Halls
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Back Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link
            href="/halls"
            className="inline-flex items-center text-gray-600 hover:text-yellow-600 transition-colors"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Halls
          </Link>
        </div>
      </div>

      {/* Hero Section with Image Gallery */}
      <section className="relative">
        <div className="h-96 relative overflow-hidden">
          {hall.imageUrl ? (
            <img
              src={hall.imageUrl}
              alt={hall.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="h-full bg-linear-to-br from-yellow-100 to-yellow-200 flex items-center justify-center">
              <Crown className="h-32 w-32 text-yellow-600" />
            </div>
          )}

          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex space-x-2">
            <button
              onClick={() => setIsFavorited(!isFavorited)}
              className="bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-colors"
            >
              <Heart
                className={`h-5 w-5 ${
                  isFavorited ? "fill-red-500 text-red-500" : "text-gray-600"
                }`}
              />
            </button>
            <button className="bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-colors">
              <Share2 className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
      </section>

      {/* Hall Information */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Header */}
              <div>
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">
                      {hall.name}
                    </h1>
                    <div className="flex items-center space-x-6">
                      <div className="flex items-center text-gray-600">
                        <Users className="h-4 w-4 mr-2" />
                        <span>Up to {hall.capacity} guests</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-gray-900">
                      ${hall.pricePerHour}
                    </div>
                    <div className="text-gray-600">per hour</div>
                  </div>
                </div>

                <p className="text-lg text-gray-700 leading-relaxed">
                  {hall.description}
                </p>
              </div>

              {/* Amenities */}
              <div>
                <h2 className="text-2xl font-serif font-bold text-gray-900 mb-8">
                  Premium Amenities
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {hall.amenities.map((amenity, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-gray-50 px-4 py-3 rounded-lg border border-gray-200"
                    >
                      <Crown className="h-4 w-4 text-yellow-600 mr-3 shrink-0" />
                      <span className="text-gray-700 text-sm">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div>
                <h2 className="text-2xl font-serif font-bold text-gray-900 mb-8">
                  Availability
                </h2>
                <div className="bg-gray-50 rounded-xl border border-gray-200 p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Select Date
                      </label>
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-3">
                        Select Time
                      </label>
                      <select
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                      >
                        <option value="">Select a time</option>
                        <option value="morning">
                          Morning (9:00 AM - 12:00 PM)
                        </option>
                        <option value="afternoon">
                          Afternoon (12:00 PM - 5:00 PM)
                        </option>
                        <option value="evening">
                          Evening (5:00 PM - 11:00 PM)
                        </option>
                        <option value="fullday">Full Day</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Booking Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-xl shadow-sm p-8 sticky top-24">
                <h3 className="text-xl font-serif font-bold text-gray-900 mb-6">
                  Book This Venue
                </h3>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Venue Rate</span>
                    <span className="font-semibold text-gray-900">
                      ${hall.pricePerHour}/hour
                    </span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-600">Capacity</span>
                    <span className="font-semibold text-gray-900">
                      {hall.capacity} guests
                    </span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-8 space-y-4">
                  <button
                    onClick={handleBookNow}
                    className="w-full py-4 px-6 bg-yellow-600 text-white rounded-xl hover:bg-yellow-700 transition-all duration-300 font-medium"
                  >
                    Book Now
                  </button>
                  <button className="w-full py-4 px-6 border border-yellow-600 text-yellow-600 rounded-xl hover:bg-yellow-50 transition-all duration-300 font-medium">
                    Schedule Tour
                  </button>
                  <button className="w-full py-4 px-6 bg-white text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-300 font-medium border border-gray-300">
                    <Phone className="h-4 w-4 inline mr-2" />
                    Call (555) 123-4567
                  </button>
                </div>

                <div className="mt-8 p-6 bg-yellow-50 rounded-xl">
                  <div className="flex items-center mb-3">
                    <Crown className="h-5 w-5 text-yellow-600 mr-3" />
                    <span className="font-semibold text-gray-900">
                      Premium Support
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Our event planning team is ready to assist you with every
                    detail of your special occasion.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Modal */}
        {showBookingModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              {/* Header */}
              <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
                <h2 className="text-2xl font-serif font-bold text-gray-900">
                  Book {hall?.name}
                </h2>
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="h-6 w-6 text-gray-600" />
                </button>
              </div>

              {/* Progress Steps */}
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  {[1, 2].map((step) => (
                    <div key={step} className="flex items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                          bookingStep >= step
                            ? "bg-yellow-600 text-white"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {step}
                      </div>
                      <span
                        className={`ml-2 text-sm ${
                          bookingStep >= step
                            ? "text-gray-900"
                            : "text-gray-500"
                        }`}
                      >
                        {step === 1 ? "Customer Info" : "Booking Date"}
                      </span>
                      {step < 2 && (
                        <div className="w-12 h-px bg-gray-300 mx-4"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Form Content */}
              <div className="p-6">
                {bookingStep === 1 && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Customer Information
                    </h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={bookingData.customerName}
                        onChange={(e) =>
                          setBookingData({
                            ...bookingData,
                            customerName: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={bookingData.customerPhone}
                        onChange={(e) =>
                          setBookingData({
                            ...bookingData,
                            customerPhone: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>
                    <div className="flex justify-end">
                      <button
                        onClick={() => setBookingStep(2)}
                        disabled={
                          !bookingData.customerName ||
                          !bookingData.customerPhone
                        }
                        className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                      >
                        Next Step
                      </button>
                    </div>
                  </div>
                )}

                {bookingStep === 2 && (
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Select Booking Date
                    </h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Booking Date
                      </label>
                      <input
                        type="date"
                        value={bookingData.bookingDate}
                        onChange={(e) =>
                          setBookingData({
                            ...bookingData,
                            bookingDate: e.target.value,
                          })
                        }
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                        min={new Date().toISOString().split("T")[0]}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Start Time
                        </label>
                        <input
                          type="time"
                          value={bookingData.startTime}
                          onChange={(e) =>
                            setBookingData({
                              ...bookingData,
                              startTime: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          End Time
                        </label>
                        <input
                          type="time"
                          value={bookingData.endTime}
                          onChange={(e) =>
                            setBookingData({
                              ...bookingData,
                              endTime: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                          required
                        />
                      </div>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Estimated Total:</span>
                        <span className="text-2xl font-bold text-yellow-600">
                          ${hall?.pricePerHour || 0}/hour
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <button
                        onClick={() => setBookingStep(1)}
                        className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Back
                      </button>
                      <button
                        onClick={submitBooking}
                        disabled={
                          !bookingData.bookingDate ||
                          !bookingData.startTime ||
                          !bookingData.endTime
                        }
                        className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                      >
                        Submit Booking
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
