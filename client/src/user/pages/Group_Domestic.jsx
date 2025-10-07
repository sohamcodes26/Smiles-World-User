import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Calendar, Users, Clock, Star, Heart, ArrowLeft } from "lucide-react";

export default function GroupDepartureDomestic() {
  // Mock data for simplicity
  const domesticDepartures = [
    {
      id: 1,
      title: "Golden Triangle Tour",
      type: 'domestic',
      destination: "Delhi-Agra-Jaipur",
      duration: "7 Days",
      price: "₹25,000",
      image: "/group_image.webp",
      startDate: "2024-01-15",
      endDate: "2024-01-22",
      maxCapacity: 20,
      currentBookings: 15,
      highlights: ["Visit Taj Mahal", "Explore Red Fort", "Rajasthani Culture"],
      includes: ["Accommodation", "Meals", "Transportation", "Guide"]
    },
    {
      id: 2,
      title: "Kerala Backwaters",
      type: 'domestic',
      destination: "Kochi-Alleppey",
      duration: "5 Days",
      price: "₹18,000",
      image: "/group_image.webp",
      startDate: "2024-01-20",
      endDate: "2024-01-25",
      maxCapacity: 15,
      currentBookings: 10,
      highlights: ["Houseboat Stay", "Spice Gardens", "Kathakali Show"],
      includes: ["Accommodation", "Meals", "Houseboat", "Guide"]
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="py-20 px-4 orange-bg-gradient">
        <div className="max-w-6xl mx-auto">
          <Link to="/group-departure" className="inline-flex items-center text-primary hover:text-primary/80 mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Group Departures
          </Link>
          
          <div className="text-center space-y-8">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground">
              🇮🇳 Domestic Group Tours
            </h1>
            <p className="text-2xl text-muted-foreground max-w-4xl mx-auto">
              Explore the incredible diversity of India with fellow travelers. 
              From the Golden Triangle to Kerala's backwaters, discover your homeland like never before!
            </p>
          </div>
        </div>
      </section>

      {/* Domestic Tours Grid */}
      <section className="py-16 px-4 orange-bg-light">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {domesticDepartures.map((departure) => (
              <div key={departure.id} className="package-card group overflow-hidden bg-white rounded-lg shadow-lg">
                <div className="relative">
                  <img
                    src={departure.image}
                    alt={departure.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm">
                      🇮🇳 Domestic
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-white/90 text-foreground px-3 py-1 rounded-full text-sm flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      {departure.currentBookings}/{departure.maxCapacity} Booked
                    </span>
                  </div>
                  {departure.currentBookings >= departure.maxCapacity * 0.8 && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm">
                        Almost Full!
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {departure.title}
                    </h3>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{departure.price}</div>
                      <div className="text-sm text-muted-foreground">per person</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 text-muted-foreground mb-4">
                    <div className="flex items-center space-x-1">
                      <MapPin size={16} />
                      <span className="text-sm">{departure.destination}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock size={16} />
                      <span className="text-sm">{departure.duration}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                      <Calendar size={16} />
                      <span>Starts: {new Date(departure.startDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Tour Highlights:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {departure.highlights.map((highlight, i) => (
                          <li key={i} className="flex items-start space-x-2">
                            <span className="text-green-500 mt-1">✓</span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Includes:</h4>
                      <div className="flex flex-wrap gap-2">
                        {departure.includes.slice(0, 3).map((item, i) => (
                          <span key={i} className="border border-gray-300 px-2 py-1 rounded text-xs">
                            {item}
                          </span>
                        ))}
                        {departure.includes.length > 3 && (
                          <span className="border border-gray-300 px-2 py-1 rounded text-xs">
                            +{departure.includes.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex space-x-2 pt-4">
                      <button className="flex-1 btn-travel bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-lg transition-colors">
                        Book Now
                      </button>
                      <button className="shrink-0 border border-gray-300 p-2 rounded-lg hover:bg-gray-50">
                        <Heart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Domestic Group Travel */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Discover India with Fellow Travelers
            </h2>
            <p className="text-xl text-muted-foreground">
              Experience the rich culture, heritage, and natural beauty of India in great company
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🏛️",
                title: "Rich Heritage",
                description: "Explore UNESCO World Heritage sites and ancient monuments with expert guides"
              },
              {
                icon: "🍛",
                title: "Authentic Cuisine",
                description: "Savor regional delicacies and traditional meals prepared by local chefs"
              },
              {
                icon: "🎭",
                title: "Cultural Immersion",
                description: "Experience local festivals, traditions, and customs firsthand"
              }
            ].map((benefit, index) => (
              <div key={index} className="info-card group">
                <div className="info-card-icon">{benefit.icon}</div>
                <h3 className="info-card-title">{benefit.title}</h3>
                <p className="info-card-description">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}