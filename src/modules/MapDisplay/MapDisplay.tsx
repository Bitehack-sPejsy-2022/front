import { BoundsLiteral, LatLngTuple } from "leaflet";
import React from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  MapConsumer,
  Polyline,
} from "react-leaflet";
import { MapDisplayProps } from "./constants";
import * as P from "./parts";

const MapDisplay = ({ listOfPoi, addPoi, afterFly, shouldFly, line }: MapDisplayProps) => {
  const defaultPosition: LatLngTuple = [50.056, 19.93];

  console.log(listOfPoi);

  let bounds: BoundsLiteral = [
    [0, 0],
    [0, 0],
  ];

  if (listOfPoi.length) {
    bounds = [
      [listOfPoi[0].latitude, listOfPoi[0].longitude],
      [listOfPoi[0].latitude, listOfPoi[0].longitude],
    ];

    listOfPoi.map((poi) => {
      if (poi.latitude > bounds[0][0]) bounds[0][0] = poi.latitude;
      if (poi.latitude < bounds[1][0]) bounds[1][0] = poi.latitude;
      if (poi.longitude > bounds[0][1]) bounds[0][1] = poi.longitude;
      if (poi.longitude < bounds[1][1]) bounds[1][1] = poi.longitude;
    });
    console.log(bounds);
  }

  const MapEvents = () => {
    const map = useMapEvents({
      click: (e) => {
        addPoi(e.latlng);
      },
    });
    return null;
  };

  const markers = listOfPoi?.map((poi, i) => (
    <Marker key={i} position={[poi.latitude, poi.longitude]}>
      <Popup>
        <P.Name>{poi.name}</P.Name>
        <P.Category>{poi.category}</P.Category>
        {poi.description ? (
          <P.Description dangerouslySetInnerHTML={{ __html: poi.description }} />
        ) : (
          <P.Description>Brak opisu</P.Description>
        )}
      </Popup>
    </Marker>
  ));

  return (
    <MapContainer center={defaultPosition} zoom={12} scrollWheelZoom style={{ height: "100vh" }}>
      {shouldFly && (
        <MapConsumer>
          {(map) => {
            map.flyToBounds(bounds);
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
      {(() => {
        if (line) {
          const purpleOptions = { color: "purple" };
          const polyline = line.list_of_poi.map((timedPoi) => ({
            lat: timedPoi.poi.latitude,
            lng: timedPoi.poi.longitude,
          }));
          return <Polyline pathOptions={purpleOptions} positions={polyline} />;
        }
        return null;
      })()}
      <MapEvents />
    </MapContainer>
  );
};

export default MapDisplay;
