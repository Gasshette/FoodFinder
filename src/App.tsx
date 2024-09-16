import { GoogleMap, Libraries, LoadScript } from "@react-google-maps/api";
import { useCallback, useState } from "react";

const libraries: Libraries = ["places"];

function App() {
  const [map, setMap] = useState<google.maps.Map | null>(null);

  const containerStyle = {
    width: "80vw",
    height: "80vh",
  };

  // Lille
  const center = {
    lat: 50.633333,
    lng: 3.066667,
  };

  const searchRestaurants = async (
    restaurantCategory: string,
    city: string
  ) => {
    if (!map) {
      throw new Error("map is null");
    }

    const service = new google.maps.places.PlacesService(map);
    const request = {
      query: `${restaurantCategory} restaurants in ${city}`,
      fields: ["name", "geometry", "place_id"],
    };

    service.textSearch(request, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        // Process the results
        console.log(results);
      }
    });
  };

  const onLoad = useCallback((map: google.maps.Map) => {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  return (
    <LoadScript
      loadingElement={<div>loading</div>}
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_API_KEY}
      libraries={libraries}
    >
      <button onClick={() => searchRestaurants("pizza", "Lille")}>
        Search Pizza
      </button>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={0}
        onLoad={onLoad}
        onUnmount={onUnmount}
      />
    </LoadScript>
  );
}

export default App;
