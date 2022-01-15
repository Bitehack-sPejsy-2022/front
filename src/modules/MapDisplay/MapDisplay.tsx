import { BoundsLiteral, LatLngTuple } from "leaflet";
import React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, MapConsumer } from "react-leaflet";
import { MapDisplayProps } from "./constants";

const MapDisplay = ({ listOfPoi, addPoi, bounds }: MapDisplayProps) => {
  const defaultPosition: LatLngTuple = [50.056, 19.93];

  console.log(listOfPoi);

  const MapEvents = () => {
    const map = useMapEvents({
      click: (e) => {
        addPoi(e.latlng);
      },
    });
    return null;
  };

  return (
    <MapContainer center={defaultPosition} zoom={12} scrollWheelZoom style={{ height: "100vh" }}>
      <MapConsumer>
        {(map) => {
          if (listOfPoi.length) map.flyToBounds(bounds);
          return null;
        }}
      </MapConsumer>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {listOfPoi?.map((poi) => (
        <Marker position={[poi.latitude, poi.longitude]}>
          <Popup>
            <h4>{poi.name}</h4>
            <br /> {poi.description}
          </Popup>
        </Marker>
      ))}
      <MapEvents />
    </MapContainer>
  );
};

export default MapDisplay;
