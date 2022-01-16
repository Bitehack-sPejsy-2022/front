import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { LatLng } from "leaflet";
import { Component } from "react";
import { ListOfPOI, Poi } from "../../api/apiModels";

export interface PoiSettingsListProps {
  listOfPoi: ListOfPOI;
  time: number[];
  setTime: (time: number, index: number) => void;
}
