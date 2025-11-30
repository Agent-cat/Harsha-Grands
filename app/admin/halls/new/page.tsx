"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Crown, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function NewHallPage() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    capacity: "",
    pricePerHour: "",
    imageUrl: "",
    amenities: [] as string[],
  });
  const [newAmenity, setNewAmenity] = useState("");

  useEffect(() => {
    const fetchSession = async () => {
      const session = await authClient.getSession();
      setData(session.data);

      if (!session.data?.user || (session.data.user as any).role !== "ADMIN") {
        router.push("/");
        return;
      }
      setLoading(false);
    };
    fetchSession();
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/halls", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          capacity: parseInt(formData.capacity),
          pricePerHour: parseFloat(formData.pricePerHour),
        }),
      });

      if (response.ok) {
        router.push("/admin");
      } else {
        alert("Failed to create hall");
      }
    } catch (error) {
      console.error("Error creating hall:", error);
      alert("Failed to create hall");
    }
  };

  const addAmenity = () => {
    if (newAmenity.trim()) {
      setFormData({
        ...formData,
        amenities: [...formData.amenities, newAmenity.trim()],
      });
      setNewAmenity("");
    }
  };

  const removeAmenity = (index: number) => {
    setFormData({
      ...formData,
      amenities: formData.amenities.filter((_, i) => i !== index),
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-600"></div>
      </div>
    );
  }

  if (!data?.user || (data.user as any).role !== "ADMIN") {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <Crown className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">
            Access Denied
          </h2>
          <p className="text-gray-600 mb-6">
            You don't have permission to access this page.
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
              <Link
                href="/admin"
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Admin</span>
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className="text-xl font-semibold text-gray-900">
                Add New Hall
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hall Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                placeholder="Enter hall name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                required
                rows={4}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                placeholder="Describe the hall"
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Capacity
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  value={formData.capacity}
                  onChange={(e) =>
                    setFormData({ ...formData, capacity: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                  placeholder="Number of guests"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price per Hour
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  value={formData.pricePerHour}
                  onChange={(e) =>
                    setFormData({ ...formData, pricePerHour: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                  placeholder="Price per hour"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image URL
              </label>
              <input
                type="url"
                value={formData.imageUrl}
                onChange={(e) =>
                  setFormData({ ...formData, imageUrl: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amenities
              </label>
              <div className="flex space-x-2 mb-3">
                <input
                  type="text"
                  value={newAmenity}
                  onChange={(e) => setNewAmenity(e.target.value)}
                  onKeyPress={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addAmenity())
                  }
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                  placeholder="Add an amenity"
                />
                <button
                  type="button"
                  onClick={addAmenity}
                  className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.amenities.map((amenity, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full"
                  >
                    {amenity}
                    <button
                      type="button"
                      onClick={() => removeAmenity(index)}
                      className="ml-2 text-yellow-600 hover:text-yellow-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <Link
                href="/admin"
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
              >
                Create Hall
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
