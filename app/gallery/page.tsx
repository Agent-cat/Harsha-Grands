"use client";

import { useState } from "react";
import { Crown, Heart, Eye, Download, X } from "lucide-react";
import Image from "next/image";

type ImageSize = "small" | "medium" | "large" | "wide";

interface GalleryImage {
  id: number;
  category: string;
  title: string;
  description: string;
  likes: number;
  views: number;
  imageUrl: string;
  size: ImageSize;
}

const galleryImages: GalleryImage[] = [
  {
    id: 1,
    category: "Weddings",
    title: "Elegant Wedding Reception",
    description:
      "Royal Ballroom adorned with floral arrangements and crystal decor",
    likes: 234,
    views: 1520,
    imageUrl:
      "https://images.unsplash.com/photo-1519733214317-45cf9ce8d3cd?w=1200&h=800&fit=crop",
    size: "large",
  },
  {
    id: 2,
    category: "Corporate",
    title: "Annual Gala Dinner",
    description: "Sophisticated corporate event with premium dining setup",
    likes: 189,
    views: 980,
    imageUrl:
      "https://images.unsplash.com/photo-1469371670807-013ccf25f92a?w=800&h=600&fit=crop",
    size: "medium",
  },
  {
    id: 3,
    category: "Parties",
    title: "Birthday Celebration",
    description: "Vibrant birthday party with themed decorations",
    likes: 156,
    views: 750,
    imageUrl:
      "https://images.unsplash.com/photo-1530103862666-8a14c1c7fa21?w=600&h=600&fit=crop",
    size: "small",
  },
  {
    id: 4,
    category: "Conferences",
    title: "Tech Summit 2024",
    description: "Modern conference setup with advanced AV equipment",
    likes: 203,
    views: 1100,
    imageUrl:
      "https://images.unsplash.com/photo-1515186391118-4c59af5e335a?w=800&h=600&fit=crop",
    size: "medium",
  },
  {
    id: 5,
    category: "Weddings",
    title: "Garden Ceremony",
    description: "Beautiful outdoor wedding ceremony in Emerald Garden",
    likes: 298,
    views: 1850,
    imageUrl:
      "https://images.unsplash.com/photo-1519228613-4117e3af14e6?w=1200&h=600&fit=crop",
    size: "wide",
  },
  {
    id: 6,
    category: "Special Events",
    title: "Charity Fundraiser",
    description: "Elegant fundraiser event with auction setup",
    likes: 167,
    views: 890,
    imageUrl:
      "https://images.unsplash.com/photo-1511795409603-0e3e1b617b3c?w=600&h=600&fit=crop",
    size: "small",
  },
  {
    id: 7,
    category: "Corporate",
    title: "Product Launch",
    description: "High-tech product launch presentation",
    likes: 145,
    views: 720,
    imageUrl:
      "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop",
    size: "medium",
  },
  {
    id: 8,
    category: "Parties",
    title: "New Year Celebration",
    description: "Glamorous New Year's Eve party with champagne tower",
    likes: 312,
    views: 2100,
    imageUrl:
      "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=1200&h=800&fit=crop",
    size: "large",
  },
  {
    id: 9,
    category: "Weddings",
    title: "Intimate Ceremony",
    description: "Small wedding ceremony in Sapphire Salon",
    likes: 178,
    views: 650,
    imageUrl:
      "https://images.unsplash.com/photo-1469371670807-013ccf25f92a?w=600&h=600&fit=crop",
    size: "small",
  },
  {
    id: 10,
    category: "Corporate",
    title: "Business Conference",
    description: "Professional business conference with modern amenities",
    likes: 198,
    views: 920,
    imageUrl:
      "https://images.unsplash.com/photo-1497366216546-9c6050984f0a?w=800&h=600&fit=crop",
    size: "medium",
  },
  {
    id: 11,
    category: "Parties",
    title: "Anniversary Celebration",
    description: "Romantic anniversary party with elegant decorations",
    likes: 167,
    views: 780,
    imageUrl:
      "https://images.unsplash.com/photo-1511795409603-0e3e1b617b3c?w=600&h=600&fit=crop",
    size: "small",
  },
  {
    id: 12,
    category: "Conferences",
    title: "Workshop Session",
    description: "Interactive workshop with collaborative space",
    likes: 145,
    views: 690,
    imageUrl:
      "https://images.unsplash.com/photo-1515186391118-4c59af5e335a?w=800&h=600&fit=crop",
    size: "medium",
  },
  {
    id: 13,
    category: "Weddings",
    title: "Reception Party",
    description: "Lively wedding reception with dancing and celebration",
    likes: 289,
    views: 1670,
    imageUrl:
      "https://images.unsplash.com/photo-1519228613-4117e3af14e6?w=1200&h=800&fit=crop",
    size: "large",
  },
  {
    id: 14,
    category: "Special Events",
    title: "Award Ceremony",
    description: "Prestigious award ceremony with formal setup",
    likes: 156,
    views: 820,
    imageUrl:
      "https://images.unsplash.com/photo-1497366216546-9c6050984f0a?w=1200&h=600&fit=crop",
    size: "wide",
  },
  {
    id: 15,
    category: "Corporate",
    title: "Team Building",
    description: "Corporate team building event with activities",
    likes: 134,
    views: 650,
    imageUrl:
      "https://images.unsplash.com/photo-1519228613-4117e3af14e6?w=600&h=600&fit=crop",
    size: "small",
  },
  {
    id: 16,
    category: "Parties",
    title: "Cocktail Party",
    description: "Sophisticated cocktail party with premium beverages",
    likes: 223,
    views: 1180,
    imageUrl:
      "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=800&h=600&fit=crop",
    size: "medium",
  },
];

export default function GalleryPage() {
  const [likedImages, setLikedImages] = useState<number[]>([]);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const toggleLike = (imageId: number) => {
    setLikedImages((prev) =>
      prev.includes(imageId)
        ? prev.filter((id) => id !== imageId)
        : [...prev, imageId]
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Page Header */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
            Event Gallery
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our collection of memorable events and stunning venue
            setups. See how we transform spaces into extraordinary experiences.
          </p>
        </div>

        {/* Bento Grid Gallery */}
        <div className="auto-rows-[200px] grid grid-cols-4 gap-4 lg:grid-cols-8 lg:auto-rows-[240px]">
          {galleryImages.map((image) => {
            const sizeClasses: Record<ImageSize, string> = {
              small: "col-span-2 row-span-1 lg:col-span-2",
              medium: "col-span-2 row-span-2 lg:col-span-3 lg:row-span-2",
              large: "col-span-2 row-span-2 lg:col-span-4 lg:row-span-3",
              wide: "col-span-4 row-span-1 lg:col-span-6 lg:row-span-2",
            };

            return (
              <div
                key={image.id}
                className={`${
                  sizeClasses[image.size]
                } group relative overflow-hidden rounded-2xl bg-gray-100 cursor-pointer`}
                onClick={() => setSelectedImage(image)}
              >
                <Image
                  fill
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 12.5vw"
                  src={image.imageUrl || "/placeholder-gallery.jpg"}
                  alt={image.title}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority={image.id <= 4}
                />

                {/* Overlay Content */}
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2 py-1 bg-yellow-600 text-white text-xs font-medium rounded-full">
                        {image.category}
                      </span>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => toggleLike(image.id)}
                          className="flex items-center space-x-1 text-white hover:text-red-400 transition-colors"
                        >
                          <Heart
                            className={`h-3 w-3 ${
                              likedImages.includes(image.id)
                                ? "fill-red-400 text-red-400"
                                : ""
                            }`}
                          />
                          <span className="text-xs">
                            {image.likes +
                              (likedImages.includes(image.id) ? 1 : 0)}
                          </span>
                        </button>
                        <div className="flex items-center space-x-1 text-white">
                          <Eye className="h-3 w-3" />
                          <span className="text-xs">{image.views}</span>
                        </div>
                      </div>
                    </div>
                    <h3 className="text-sm font-semibold text-white mb-1">
                      {image.title}
                    </h3>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedImage(image);
                      }}
                      className="text-yellow-600 hover:text-yellow-700 font-medium text-sm"
                    >
                      View Details
                    </button>
                    <p className="text-xs text-gray-200 line-clamp-2">
                      {image.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Image Details Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
                <h2 className="text-2xl font-serif font-bold text-gray-900">
                  {selectedImage.title}
                </h2>
                <button
                  onClick={() => setSelectedImage(null)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="h-6 w-6 text-gray-600" />
                </button>
              </div>

              {/* Image */}
              <div className="relative h-96 md:h-[500px]">
                <Image
                  fill
                  sizes="100vw"
                  src={selectedImage.imageUrl}
                  alt={selectedImage.title}
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <span className="px-3 py-1 bg-yellow-600 text-white text-sm font-medium rounded-full">
                    {selectedImage.category}
                  </span>
                  <div className="flex items-center space-x-4 text-gray-600">
                    <button
                      onClick={() => toggleLike(selectedImage.id)}
                      className="flex items-center space-x-1 hover:text-red-500 transition-colors"
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          likedImages.includes(selectedImage.id)
                            ? "fill-red-500 text-red-500"
                            : ""
                        }`}
                      />
                      <span className="text-sm">
                        {selectedImage.likes +
                          (likedImages.includes(selectedImage.id) ? 1 : 0)}
                      </span>
                    </button>
                    <div className="flex items-center space-x-1">
                      <Eye className="h-4 w-4" />
                      <span className="text-sm">{selectedImage.views}</span>
                    </div>
                  </div>
                </div>

                <h3 className="text-xl font-serif font-semibold text-gray-900 mb-3">
                  About This Event
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {selectedImage.description}
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Event Details
                    </h4>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Premium venue setup</li>
                      <li>• Professional lighting and sound</li>
                      <li>• Dedicated event coordination</li>
                      <li>• Custom catering options</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Venue Features
                    </h4>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Spacious layout</li>
                      <li>• Modern amenities</li>
                      <li>• Climate control</li>
                      <li>• Parking available</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
