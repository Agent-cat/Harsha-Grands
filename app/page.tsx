"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import {
  Star,
  Users,
  Calendar,
  MapPin,
  Crown,
  Sparkles,
  ChevronRight,
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

const Home = () => {
  const [halls, setHalls] = useState<Hall[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHalls();
  }, []);

  const fetchHalls = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/halls");
      if (response.ok) {
        const data = await response.json();
        // Get first 3 halls for featured section
        setHalls(data.slice(0, 3));
      }
    } catch (error) {
      console.error("Error fetching halls:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Welcome Section */}
        <div className="text-center mb-20">
          <div className="flex justify-center mb-8">
            <div className="relative">
              <Crown className="h-16 w-16 text-yellow-600" />
              <Sparkles className="h-5 w-5 text-yellow-500 absolute -top-2 -right-2" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6 text-gray-900">
            Grand Convention
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Where Luxury Meets Excellence
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/halls"
              className="inline-flex items-center px-8 py-4 bg-yellow-600 hover:bg-yellow-700 text-white rounded-xl font-medium transition-all duration-300"
            >
              Explore Our Halls
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="tel:+15551234567"
              className="inline-flex items-center px-8 py-4 border border-yellow-600 text-yellow-600 hover:bg-yellow-50 rounded-xl font-medium transition-all duration-300"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Book a Tour
            </Link>
          </div>
        </div>

        {/* Featured Halls */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
              Featured Venues
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our most sought-after event spaces, each designed to
              create unforgettable experiences
            </p>
          </div>

          {loading ? (
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
                >
                  <div className="h-48 bg-gray-200 animate-pulse"></div>
                  <div className="p-6">
                    <div className="h-6 bg-gray-200 rounded mb-4 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded mb-6 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {halls.map((hall) => (
                <div
                  key={hall.id}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="h-48 bg-linear-to-br from-yellow-100 to-yellow-200 relative">
                    {hall.imageUrl ? (
                      <img
                        src={hall.imageUrl}
                        alt={hall.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Crown className="h-16 w-16 text-yellow-600" />
                      </div>
                    )}
                    <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-md">
                      <span className="text-sm font-semibold text-yellow-600">
                        ${hall.pricePerHour}/hr
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-serif font-bold text-gray-900 mb-2">
                      {hall.name}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {hall.description}
                    </p>
                    <div className="flex items-center text-gray-600 mb-4">
                      <Users className="h-4 w-4 mr-2" />
                      <span className="text-sm">
                        Up to {hall.capacity} guests
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-gray-900">
                        ${hall.pricePerHour}/hr
                      </span>
                      <Link
                        href={`/halls/${hall.id}`}
                        className="text-yellow-600 hover:text-yellow-700 font-medium"
                      >
                        View Details →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Features */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
              Why Choose Grand Convention
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Experience the perfect blend of luxury, service, and
              sophistication
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-serif font-bold text-gray-900 mb-3">
                Premium Venues
              </h3>
              <p className="text-gray-600">
                Meticulously designed spaces that exude elegance and
                sophistication
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-serif font-bold text-gray-900 mb-3">
                Expert Service
              </h3>
              <p className="text-gray-600">
                Dedicated event planning team to ensure your special occasion is
                perfect
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapPin className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-serif font-bold text-gray-900 mb-3">
                Prime Location
              </h3>
              <p className="text-gray-600">
                Conveniently located with easy access and ample parking
                facilities
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gray-50 rounded-3xl p-12">
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
            Ready to Plan Your Event?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Let our expert team help you create an unforgettable experience at
            Grand Convention
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/halls"
              className="inline-flex items-center px-8 py-4 bg-yellow-600 hover:bg-yellow-700 text-white rounded-xl font-medium transition-all duration-300"
            >
              Browse All Venues
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/contact-us"
              className="inline-flex items-center px-8 py-4 border border-gray-300 text-gray-700 hover:bg-white rounded-xl font-medium transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
