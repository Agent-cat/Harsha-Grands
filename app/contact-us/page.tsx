"use client";

import { useState } from "react";
import {
  Crown,
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  Check,
  Calendar,
  Users,
  Star,
  ChevronRight,
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    date: "",
    guests: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setIsSubmitted(true);
    setFormData({
      name: "",
      email: "",
      phone: "",
      eventType: "",
      date: "",
      guests: "",
      message: "",
    });
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#fff8e7] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-3xl font-serif font-bold text-gray-800 mb-4">
            Thank You!
          </h2>
          <p className="text-gray-600 mb-6">
            Your inquiry has been received. Our event planning team will contact
            you within 24 hours to discuss your special occasion.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
          >
            Send Another Message
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Page Header */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Let's create something extraordinary together. Our event planning
            team is ready to bring your vision to life.
          </p>
        </div>
      </div>

      {/* Contact Information */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-serif font-bold text-gray-800 mb-2">
                Phone
              </h3>
              <p className="text-gray-600">+1 (555) 123-4567</p>
              <p className="text-gray-600">Mon-Fri: 9AM-6PM</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-serif font-bold text-gray-800 mb-2">
                Email
              </h3>
              <p className="text-gray-600">info@grandconvention.com</p>
              <p className="text-gray-600">events@grandconvention.com</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-serif font-bold text-gray-800 mb-2">
                Location
              </h3>
              <p className="text-gray-600">123 Luxury Avenue</p>
              <p className="text-gray-600">Grand City, GC 12345</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-serif font-bold text-gray-800 mb-2">
                Hours
              </h3>
              <p className="text-gray-600">Mon-Fri: 9AM-8PM</p>
              <p className="text-gray-600">Sat-Sun: 10AM-6PM</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-serif font-bold text-gray-800 mb-6">
                Plan Your Event
              </h2>
              <p className="text-gray-600 mb-8">
                Tell us about your dream event and our team will help you create
                an unforgettable experience.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                      placeholder="(555) 123-4567"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Event Type *
                    </label>
                    <select
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                    >
                      <option value="">Select event type</option>
                      <option value="wedding">Wedding</option>
                      <option value="corporate">Corporate Event</option>
                      <option value="party">Private Party</option>
                      <option value="conference">Conference</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Event Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of Guests
                    </label>
                    <input
                      type="number"
                      name="guests"
                      value={formData.guests}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                      placeholder="100"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tell us about your event *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-600 focus:border-transparent"
                    placeholder="Describe your vision, requirements, and any special requests..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 focus:ring-4 focus:ring-yellow-600 focus:ring-opacity-50 transition-colors duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message
                      <Send className="ml-2 h-5 w-5" />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Additional Information */}
            <div className="space-y-8">
              {/* Why Choose Us */}
              <div>
                <h3 className="text-2xl font-serif font-bold text-gray-800 mb-6">
                  Why Choose Grand Convention
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Crown className="h-6 w-6 text-yellow-600 mr-3 shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">
                        Luxury Venues
                      </h4>
                      <p className="text-gray-600">
                        Premium spaces designed for sophisticated events
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Users className="h-6 w-6 text-yellow-600 mr-3 shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">
                        Expert Team
                      </h4>
                      <p className="text-gray-600">
                        Dedicated event planners with years of experience
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Star className="h-6 w-6 text-yellow-600 mr-3 shrink-0 mt-1" />
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">
                        Exceptional Service
                      </h4>
                      <p className="text-gray-600">
                        Attention to detail in every aspect of your event
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-serif font-bold text-gray-800 mb-4">
                  Our Achievements
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-600 mb-1">
                      500+
                    </div>
                    <div className="text-sm text-gray-600">Events Hosted</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-600 mb-1">
                      4.9
                    </div>
                    <div className="text-sm text-gray-600">Average Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-600 mb-1">
                      10+
                    </div>
                    <div className="text-sm text-gray-600">
                      Years Experience
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-600 mb-1">
                      98%
                    </div>
                    <div className="text-sm text-gray-600">
                      Client Satisfaction
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="bg-linear-to-r from-yellow-600 to-yellow-800 rounded-xl p-6 text-white">
                <h3 className="text-xl font-serif font-bold mb-3">
                  Ready to Get Started?
                </h3>
                <p className="text-yellow-100 mb-4">
                  Schedule a tour of our venues and see the magic in person.
                </p>
                <button className="w-full py-3 px-4 bg-white text-yellow-600 rounded-lg hover:bg-gray-100 transition-colors duration-300 font-medium flex items-center justify-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule a Tour
                  <ChevronRight className="ml-2 h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
