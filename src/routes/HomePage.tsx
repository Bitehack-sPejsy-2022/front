import { BoundsLiteral, LatLng } from "leaflet";
import React, { useEffect, useState } from "react";
import { ListOfPOI, Poi } from "../api/apiModels";
import { getPoiByCityName } from "../api/requests";
import MapDisplay from "../modules/MapDisplay/MapDisplay";

const HomePage = () => {
  const [poi, setPoi] = useState<ListOfPOI>([]);
  const [bounds, setBounds] = useState<BoundsLiteral>([
    [0, 0],
    [0, 0],
  ]);

  useEffect(() => {
    getPoiByCityName("Kraków").then((result) => {
      // console.log(result.data.list_of_poi);
      const listOfPoi = result.data.list_of_poi;

      if (listOfPoi.length) {
        let bounds: BoundsLiteral = [
          [listOfPoi[0].latitude, listOfPoi[0].longitude],
          [listOfPoi[0].latitude, listOfPoi[0].longitude],
        ];

        listOfPoi.map((poi) => {
          if (poi.latitude > bounds[0][0]) bounds[0][0] = poi.latitude;
          if (poi.latitude < bounds[1][0]) bounds[1][0] = poi.latitude;
          if (poi.longitude > bounds[0][1]) bounds[0][1] = poi.longitude;
          if (poi.longitude < bounds[1][1]) bounds[1][1] = poi.longitude;
        });

        setBounds(bounds);
      }
      setPoi(result.data.list_of_poi);
    });
  }, []);

  const addPoiHandler = (latlng: LatLng) => {
    console.log("xd");
    const newPoi: Poi = {
      name: "Punkt dodany przez użyszkodnika",
      description: "Brak opisu",
      latitude: latlng.lat,
      longitude: latlng.lng,
      address: "Brak adresu",
      category: "Dodane przez użyszkodnika",
      picture_url: "",
      open_hour: 0,
      close_hour: 0,
    };
    setPoi((oldPoi) => [...oldPoi, newPoi]);
  };

  return <MapDisplay listOfPoi={poi} addPoi={addPoiHandler} bounds={bounds} />;
};

export default HomePage;
