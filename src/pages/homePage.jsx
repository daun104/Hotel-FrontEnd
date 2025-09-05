import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchRoomTypes } from "../services/roomService";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Wifi, Car, Coffee, Dumbbell, Waves } from "lucide-react";

const HomePage = () => {
  const navigate = useNavigate();
  const [roomTypes, setRoomTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const amenities = [
    { icon: Wifi, name: "Free WiFi" },
    { icon: Car, name: "Free Parking" },
    { icon: Coffee, name: "Restaurant" },
    { icon: Dumbbell, name: "Fitness Center" },
    { icon: Waves, name: "Swimming Pool" },
  ];

  useEffect(() => {
    loadRoomTypes();
  }, []);

  const loadRoomTypes = async () => {
    setLoading(true);
    setError("");
    const result = await fetchRoomTypes();

    if (result.success) {
      setRoomTypes(result.roomTypes);
    } else {
      setError(result.message || "Failed to fetch room types");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
<header className="border-b">
  <div className="container mx-auto px-4 py-4 flex justify-between items-center">
    <h1 className="text-3xl md:text-4xl font-extrabold text-primary tracking-wide font-serif">
      K<span className="text-yellow-400">&</span>A Grand Resort
    </h1>
    <div>
      <Button onClick={() => navigate("/rooms")}>Book Now</Button>
    </div>
  </div>
</header>


      {/* Hero Section */}
      <section className="relative h-96 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-extrabold drop-shadow-lg leading-tight font-serif mb-4">
              Welcome to <span className="text-yellow-300">Paradise</span>
            </h2>
            <p className="text-lg md:text-xl mb-6 font-light max-w-xl leading-relaxed drop-shadow-sm">
              Experience <span className="italic text-yellow-200">luxury</span> and{" "}
              <span className="italic text-yellow-200">comfort</span> in our world-class
              resort with stunning ocean views.
            </p>
            <div className="flex items-center text-base md:text-lg font-medium bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full w-fit drop-shadow-md">
              <MapPin className="mr-2 text-yellow-300" />
              <span>123 K&A Beach, Kuala Terengganu</span>
            </div>
          </div>
        </div>
      </section>

      {/* Room Types */}
      <section className="py-16 bg-gradient-to-br from-[#f7f8fc] via-[#edf1f9] to-[#dbe5f3]">
        <div className="container mx-auto px-4">
          <h3 className="text-4xl font-bold text-center mb-12 text-gray-800">
            Our Rooms
          </h3>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6 max-w-2xl mx-auto">
              {error}
            </div>
          )}

          {loading ? (
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="overflow-hidden animate-pulse">
                  <div className="h-48 bg-gray-200" />
                  <CardHeader>
                    <div className="h-6 bg-gray-200 rounded mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 mb-4">
                      <div className="h-6 bg-gray-200 rounded w-3/4" />
                      <div className="h-6 bg-gray-200 rounded w-1/2" />
                    </div>
                    <div className="h-10 bg-gray-200 rounded" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {roomTypes.map((room) => (
                <Card
                  key={room._id}
                  className="overflow-hidden border rounded-lg shadow-md hover:shadow-xl transition-transform duration-300 hover:-translate-y-2"
                >
                  <div className="relative aspect-video overflow-hidden group">
                    <img
                      src={room.image || "https://via.placeholder.com/400x250"}
                      alt={room.name}
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                    />
                    {room.name === "Presidential Suite" && (
                      <div className="absolute top-2 right-2 bg-yellow-400 text-black px-2 py-1 text-xs rounded shadow">
                        Top Pick
                      </div>
                    )}
                    {!room.isAvailable && (
                      <div className="absolute top-2 right-2">
                        <Badge variant="destructive">Unavailable</Badge>
                      </div>
                    )}
                  </div>
                  <CardHeader>
                    <CardTitle className="flex justify-between items-start">
                      <div>
                        <div>{room.name}</div>
                        <div className="text-sm text-gray-500 font-normal">
                          {room.size} • {room.bedType}
                        </div>
                      </div>
                      <Badge variant="secondary">RM{room.price}</Badge>
                    </CardTitle>
                    <CardDescription>
                      {room.capacity} guests • {room.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2">
                        {room.amenities?.slice(0, 3).map((amenity) => (
                          <Badge key={amenity} variant="outline" className="text-xs px-2 py-1">
                            {amenity}
                          </Badge>
                        ))}
                        {room.amenities?.length > 3 && (
                          <Badge variant="outline" className="text-xs px-2 py-1">
                            +{room.amenities.length - 3} more
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm text-gray-600">
                        <div className="font-medium mb-1">Features:</div>
                        <ul className="text-xs space-y-1">
                          {room.features?.slice(0, 2).map((feature, index) => (
                            <li key={index}>• {feature}</li>
                          ))}
                        </ul>
                      </div>
                      <Button
                        className="w-full mt-3"
                        onClick={() => navigate(`/booking?roomId=${room._id}`)}
                        disabled={!room.isAvailable}
                        variant={room.isAvailable ? "default" : "secondary"}
                      >
                        {room.isAvailable ? "Book This Room" : "Currently Unavailable"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {error && !loading && (
            <div className="text-center mt-6">
              <Button onClick={loadRoomTypes} variant="outline">
                Try Again
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Amenities */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">Hotel Amenities</h3>
          <div className="grid md:grid-cols-5 gap-8">
            {amenities.map((amenity) => (
              <div key={amenity.name} className="text-center">
                <amenity.icon className="mx-auto h-12 w-12 mb-4 text-primary" />
                <p className="font-medium">{amenity.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Surroundings */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-center mb-12">Explore the Area</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div
              className="relative h-64 rounded-lg overflow-hidden bg-cover bg-center flex items-center justify-center shadow-md"
              style={{
                backgroundImage: "url('https://imagizer.imageshack.com/img922/7777/WlI9Nw.jpg')",
              }}
            >
              <div className="absolute inset-0 bg-black/40" />
              <div className="relative z-10 text-white text-center px-6">
                <h4 className="text-2xl font-bold mb-2 drop-shadow">Private Beach</h4>
                <p className="text-sm md:text-base drop-shadow">Crystal clear waters just steps away</p>
              </div>
            </div>
            <div
              className="relative h-64 rounded-lg overflow-hidden bg-cover bg-center flex items-center justify-center shadow-md"
              style={{
                backgroundImage: "url('https://imagizer.imageshack.com/img923/5728/KaKgzI.jpg')",
              }}
            >
              <div className="absolute inset-0 bg-black/40" />
              <div className="relative z-10 text-white text-center px-6">
                <h4 className="text-2xl font-bold mb-2 drop-shadow">City Center</h4>
                <p className="text-sm md:text-base drop-shadow">
                  Shopping and dining within 10 minutes
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 K&A Grand Resort. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
