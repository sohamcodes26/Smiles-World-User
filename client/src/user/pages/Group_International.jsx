import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Calendar, Users, Clock, Star, Heart, ArrowLeft, Plane } from "lucide-react";
import { useGroupDeparturePackages } from "../hooks/usePackages";

export default function GroupDepartureInternational() {
  const { data: internationalDepartures, isLoading, isError } = useGroupDeparturePackages({ tag: 'international' });

  return (
    <div>
      <section className="py-20 px-4 orange-bg-gradient">
        <div className="max-w-6xl mx-auto">
          <Link to="/group-departure" className="inline-flex items-center text-primary hover:text-primary/80 mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Group Departures
          </Link>
          <div className="text-center space-y-8">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground">
              🌍 International Group Tours
            </h1>
            <p className="text-2xl text-muted-foreground max-w-4xl mx-auto">
              Embark on international adventures with like-minded travelers. 
              From exotic beaches to bustling cities, explore the world together!
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 orange-bg-light">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {isLoading && <p className="col-span-full text-center">Loading packages...</p>}
            {isError && <p className="col-span-full text-center text-red-600">Could not fetch packages.</p>}
            
            {internationalDepartures && internationalDepartures.map((pkg) => (
              <div key={pkg._id} className="package-card group overflow-hidden bg-white rounded-lg shadow-lg">
                <div className="relative">
                  <img src={pkg.cardImage || "/group_image.webp"} alt={pkg.name} className="w-full h-64 object-cover" />
                  <div className="absolute top-4 right-4">
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm flex items-center">
                      <Plane className="w-3 h-3 mr-1" />
                      International
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                      {pkg.name}
                    </h3>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{pkg.startingFromPrice}</div>
                      <div className="text-sm text-muted-foreground">per person</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 text-muted-foreground mb-4">
                    <div className="flex items-center space-x-1">
                      <MapPin size={16} />
                      <span className="text-sm">{pkg.placesCovered}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock size={16} />
                      <span className="text-sm">{pkg.duration}</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Tour Highlights:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {pkg.highlights && pkg.highlights.slice(0, 3).map((highlight, i) => (
                          <li key={i} className="flex items-start space-x-2">
                            <span className="text-blue-500 mt-1">✓</span>
                            <span>{highlight.title}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex space-x-2">
                        <button className="flex-1 btn-adventure bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors">
                          View Details
                        </button>
                        <button className="shrink-0 border border-gray-300 p-2 rounded-lg hover:bg-gray-50">
                          <Heart className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Explore the World Together
            </h2>
            <p className="text-xl text-muted-foreground">
              International group travel made easy with comprehensive support and expert planning
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: "🛂", title: "Visa Support", description: "Complete visa assistance and documentation support for hassle-free travel" },
              { icon: "✈️", title: "Flight Included", description: "Round-trip flights, airport transfers, and all transportation included" },
              { icon: "🏨", title: "Premium Stays", description: "Carefully selected accommodations in prime locations worldwide" },
              { icon: "🗣️", title: "Language Support", description: "Local guides and tour managers who speak your language" },
              { icon: "💱", title: "Currency Exchange", description: "Guidance on currency exchange and local payment methods" },
              { icon: "📞", title: "24/7 Support", description: "Round-the-clock assistance throughout your international journey" }
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

      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-foreground">
              Ready for Your International Adventure?
            </h2>
            <p className="text-lg text-muted-foreground">
              Join thousands of happy travelers who have explored the world with us. 
              Book your spot today and create memories that last a lifetime!
            </p>
            <div className="flex justify-center space-x-4">
              <button className="btn-adventure bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-lg transition-colors">
                📞 Call for Booking
              </button>
              <button className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-lg text-lg transition-colors">
                💬 Chat with Expert
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}