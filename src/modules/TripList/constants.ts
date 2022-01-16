import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { LatLng } from "leaflet";
import { Component } from "react";
import { ListOfPOI, Poi, Trip } from "../../api/apiModels";

export interface TripListProps {
  trip: Trip;
}
