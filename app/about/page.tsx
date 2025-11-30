import {
  Crown,
  Users,
  Calendar,
  Star,
  Award,
  Clock,
  MapPin,
  Heart,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Page Header */}
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-6">
            Our Story
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            For over a decade, Grand Convention has been the premier destination
            for luxury events, creating unforgettable moments in stunning
            venues.
          </p>
        </div>

        {/* Company Story */}
        <section className="mb-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8">
                Creating Extraordinary Experiences
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                Founded in 2014, Grand Convention began with a simple vision: to
                provide the most luxurious and sophisticated event spaces in the
                region. What started as a single ballroom has grown into a
                collection of premium venues, each designed to exceed the
                expectations of our most discerning clients.
              </p>
              <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                Our commitment to excellence has earned us recognition as the
                leading convention center for weddings, corporate events, and
                special occasions. We believe that every event deserves to be
                extraordinary, and our dedicated team works tirelessly to ensure
                that each moment is perfect.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center">
                  <Crown className="h-8 w-8 text-yellow-600 mr-3" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900">10+</div>
                    <div className="text-gray-600">Years of Excellence</div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Star className="h-8 w-8 text-yellow-600 mr-3" />
                  <div>
                    <div className="text-2xl font-bold text-gray-900">4.9</div>
                    <div className="text-gray-600">Customer Rating</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="h-96 bg-linear-to-br from-yellow-100 to-yellow-200 rounded-xl flex items-center justify-center">
              <Crown className="h-32 w-32 text-yellow-600" />
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Crown className="h-10 w-10 text-yellow-600" />
              </div>
              <h3 className="text-xl font-serif font-bold text-gray-900 mb-3">
                Excellence
              </h3>
              <p className="text-gray-600">
                We strive for perfection in every detail, from venue preparation
                to event execution.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="h-10 w-10 text-yellow-600" />
              </div>
              <h3 className="text-xl font-serif font-bold text-gray-900 mb-3">
                Passion
              </h3>
              <p className="text-gray-600">
                Our team is genuinely passionate about creating memorable
                experiences for our clients.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-10 w-10 text-yellow-600" />
              </div>
              <h3 className="text-xl font-serif font-bold text-gray-900 mb-3">
                Service
              </h3>
              <p className="text-gray-600">
                Exceptional service is at the heart of everything we do,
                ensuring every client feels valued.
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="h-10 w-10 text-yellow-600" />
              </div>
              <h3 className="text-xl font-serif font-bold text-gray-900 mb-3">
                Quality
              </h3>
              <p className="text-gray-600">
                We maintain the highest standards in venue quality, amenities,
                and event services.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center bg-gray-50 rounded-3xl p-12">
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-4">
            Ready to Experience Grand Convention?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Let us show you why we're the premier destination for luxury events.
            Schedule a tour of our stunning venues today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center px-8 py-4 bg-yellow-600 hover:bg-yellow-700 text-white rounded-xl font-medium transition-all duration-300">
              <Calendar className="mr-2 h-5 w-5" />
              Schedule a Tour
            </button>
            <button className="inline-flex items-center px-8 py-4 border border-gray-300 text-gray-700 hover:bg-white rounded-xl font-medium transition-all duration-300">
              View Our Venues
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
