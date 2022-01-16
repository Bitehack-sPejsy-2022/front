import { IconButton } from "@mui/material";
import { BoundsLiteral, LatLngTuple } from "leaflet";
import React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, MapConsumer } from "react-leaflet";
import { TripListProps } from "./constants";
import * as P from "./parts";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";

const TripList = ({ trip }: TripListProps) => {
  console.log(trip);

  const listOfPoi = trip.list_of_poi.list_of_poi;

  const processTime = (time: number) => {
    time *= 60;
    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    const txt = `
      ${hours ? `${hours.toFixed(0)} h ` : ``}
      ${minutes ? `${minutes.toFixed(0)} min` : ``}
    `;
    return txt;
  };

  const poi = listOfPoi?.map((timedPoi, i) => (
    <>
      {i != 0 && (
        <P.Movement>
          <DirectionsWalkIcon fontSize="large" />
          <br />
          Spacerkiem
          <br />
          {processTime(trip.transit_times[i - 1])}
        </P.Movement>
      )}
      <P.ListElement key={i}>
        <P.Image>
          <img
            src={timedPoi.poi.picture_url}
            alt="Brak zdjęcia"
            style={{ width: "100px", height: "100px" }}
          />
        </P.Image>
        <P.Name>{timedPoi.poi.name}</P.Name>
        <P.Category>{timedPoi.poi.category}</P.Category>
        <P.Button>{processTime(timedPoi.time_spent)}</P.Button>
      </P.ListElement>
    </>
  ));

  return <P.ListWrapper>{poi}</P.ListWrapper>;
};

export default TripList;
