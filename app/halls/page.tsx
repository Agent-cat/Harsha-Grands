"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Crown,
  Users,
  Star,
  MapPin,
  Calendar,
  Filter,
  Search,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";

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

const categories = ["All", "ballroom", "conference", "garden", "salon"];

export default function HallsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("name");
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
        setHalls(data);
      }
    } catch (error) {
      console.error("Error fetching halls:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredHalls = halls
    .filter((hall) => {
      const matchesSearch =
        hall.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hall.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" ||
        hall.name.toLowerCase().includes(selectedCategory.toLowerCase());
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.pricePerHour - b.pricePerHour;
        case "price-high":
          return b.pricePerHour - a.pricePerHour;
        case "capacity":
          return b.capacity - a.capacity;
        case "name":
        default:
          return a.name.localeCompare(b.name);
      }
    });

  if (loading) {
    return (
      <div className="min-h-screen pt-12 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">
              Our Event Halls
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our collection of premium venues
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
              >
                <div className="h-56 bg-gray-200 animate-pulse"></div>
                <div className="p-8">
                  <div className="h-6 bg-gray-200 rounded mb-4 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded mb-6 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-12 bg-white">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">
            Our Event Halls
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our collection of premium venues, each designed to create
            unforgettable moments for your special occasions
          </p>
        </div>

        {/* Filters Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search halls..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent transition-colors"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-3">
              <Filter className="h-5 w-5 text-gray-600" />
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? "bg-yellow-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent transition-colors"
            >
              <option value="name">Sort by Name</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="capacity">Capacity</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        {/* Halls Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredHalls.map((hall) => (
            <div
              key={hall.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100"
            >
              {/* Image */}
              <div className="h-56 relative overflow-hidden">
                <Image
                  width={500}
                  height={300}
                  src={hall.imageUrl || "/placeholder-hall.jpg"}
                  alt={hall.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-md">
                  <span className="text-sm font-semibold text-yellow-600">
                    ${hall.pricePerHour}/hr
                  </span>
                </div>
              </div>

              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-2xl font-serif font-bold text-gray-900">
                    {hall.name}
                  </h3>
                  <div className="flex items-center bg-yellow-50 px-2 py-1 rounded">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium text-gray-700 ml-1">
                      4.8
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 mb-6 line-clamp-2 leading-relaxed">
                  {hall.description}
                </p>

                <div className="flex items-center text-gray-600 mb-6">
                  <Users className="h-4 w-4 mr-2" />
                  <span className="text-sm">Up to {hall.capacity} guests</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-8">
                  {hall.amenities.slice(0, 3).map((amenity, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-gray-50 text-gray-600 text-xs rounded-full border border-gray-200"
                    >
                      {amenity}
                    </span>
                  ))}
                  {hall.amenities.length > 3 && (
                    <span className="px-3 py-1 bg-gray-50 text-gray-600 text-xs rounded-full border border-gray-200">
                      +{hall.amenities.length - 3} more
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-gray-900">
                      ${hall.pricePerHour}
                    </div>
                    <div className="text-sm text-gray-500">per hour</div>
                  </div>
                  <Link
                    href={`/halls/${hall.id}`}
                    className="inline-flex items-center px-6 py-3 bg-yellow-600 text-white rounded-xl hover:bg-yellow-700 transition-all duration-300 font-medium"
                  >
                    View Details
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredHalls.length === 0 && (
          <div className="text-center py-20">
            <Crown className="h-16 w-16 text-gray-300 mx-auto mb-6" />
            <h3 className="text-xl font-serif font-semibold text-gray-900 mb-3">
              No halls found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
