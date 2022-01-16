import { BoundsLiteral, LatLng } from "leaflet";
import React, { useEffect, useState } from "react";
import { ListOfPOI, Poi } from "../api/apiModels";
import { getPoiByCityName, postSearchNearPoint } from "../api/requests";
import MapDisplay from "../modules/MapDisplay/MapDisplay";

const MapPage = () => {
  const [poi, setPoi] = useState<ListOfPOI>([]);
  const [shouldFly, setShouldFly] = useState(false);

  useEffect(() => {
    getPoiByCityName("Warszawa").then((result) => {
      setPoi(result.data.list_of_poi);
      setShouldFly(true);
      console.log(result.data.list_of_poi);
    });
  }, []);

  const addPoiHandler = (latlng: LatLng) => {
    const newPoi: Poi = {
      name: "Punkt dodany przez użytkownika",
      description: "",
      latitude: latlng.lat,
      longitude: latlng.lng,
      address: "Brak adresu",
      category: "User added",
      picture_url: "",
      open_hour: 0,
      close_hour: 0,
    };
    setPoi((oldPoi) => [...oldPoi, newPoi]);
    postSearchNearPoint(latlng, "Warszawa").then((result) => {
      const listOfPoi = result.data.list_of_poi;
      console.log(listOfPoi);
      if (listOfPoi.length) {
        const newPoi: Poi = {
          name: listOfPoi[0].name,
          description: listOfPoi[0].description,
          latitude: listOfPoi[0].latitude,
          longitude: listOfPoi[0].longitude,
          address: listOfPoi[0].address,
          category: listOfPoi[0].category,
          picture_url: listOfPoi[0].picture_url,
          open_hour: listOfPoi[0].open_hour,
          close_hour: listOfPoi[0].close_hour,
        };
        setPoi((oldPoi) => [...oldPoi.slice(0, -1), newPoi]);
      }
    });
  };

  const afterFlyHandler = () => {
    setShouldFly(false);
  };

  return (
    <MapDisplay
      listOfPoi={poi}
      addPoi={addPoiHandler}
      afterFly={afterFlyHandler}
      shouldFly={shouldFly}
    />
  );
};

export default MapPage;
