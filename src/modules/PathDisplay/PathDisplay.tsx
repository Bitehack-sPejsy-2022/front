import { BoundsLiteral, LatLngTuple } from "leaflet";
import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  MapConsumer,
  Polyline,
} from "react-leaflet";
import { Trip } from "../../api/apiModels";
import { PathDisplayProps } from "./constants";
import * as P from "./parts";

const PathDisplay = ({ recommendedTrips, trip, afterFly, shouldFly }: PathDisplayProps) => {
  const defaultPosition: LatLngTuple = [50.056, 19.93];

  console.log(recommendedTrips);

  const markers = recommendedTrips?.trips[trip].list_of_poi.list_of_poi.map((poi, i) => (
    <Marker key={i} position={[poi.poi.latitude, poi.poi.longitude]}>
      <Popup>
        <P.Name>{poi.poi.name}</P.Name>
        <P.Category>{poi.poi.category}</P.Category>
        {poi.poi.description ? (
          <P.Description dangerouslySetInnerHTML={{ __html: poi.poi.description }} />
        ) : (
          <P.Description>Brak opisu</P.Description>
        )}
      </Popup>
    </Marker>
  ));

  console.log("CHUJ");
  console.log(markers);

  return (
    <MapContainer
      // bounds={recommendedTrips?.trips[trip].bounds}
      center={defaultPosition}
      zoom={12}
      scrollWheelZoom
      style={{ height: "100vh" }}
    >
      {shouldFly && recommendedTrips && (
        <MapConsumer>
          {(map) => {
            map.flyToBounds(recommendedTrips.trips[trip].bounds);
            afterFly();
            return null;
          }}
        </MapConsumer>
      )}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markers}
      {recommendedTrips?.trips.length &&
        (() => {
          const colorOptions = { color: "red", weight: 6 };
          const polyline = recommendedTrips.trips[trip].route.map(({ lat, lng }) => ({
            lat,
            lng,
          }));
          console.log(polyline);
          return <Polyline pathOptions={colorOptions} positions={polyline} />;
        })()}
    </MapContainer>
  );
};

export default PathDisplay;
