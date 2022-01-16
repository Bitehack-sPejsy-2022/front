import { IconButton, TextField } from "@mui/material";
import { BoundsLiteral, LatLngTuple } from "leaflet";
import React from "react";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, MapConsumer } from "react-leaflet";
import { PoiSettingsListProps } from "./constants";
import * as P from "./parts";

const PoiSettingsList = ({ listOfPoi, time, setTime }: PoiSettingsListProps) => {
  console.log(listOfPoi);

  const poi = listOfPoi?.map((poi, i) => (
    <P.ListElement key={i}>
      <P.Image>Obraz</P.Image>
      <P.Name>{poi.name}</P.Name>
      <P.Category>{poi.category}</P.Category>
      <P.Text>Czas spędzony w tym miejscu</P.Text>
      <P.Button>
        <TextField
          type="number"
          value={time[i]}
          onChange={(e) => setTime(parseInt(e.target.value), i)}
          label="Czas w godzinach"
        />
      </P.Button>
    </P.ListElement>
  ));

  return <P.ListWrapper>{poi}</P.ListWrapper>;
};

export default PoiSettingsList;
