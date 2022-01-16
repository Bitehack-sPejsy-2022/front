import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { LatLng } from "leaflet";
import { Component } from "react";
import { ListOfPOI, Poi } from "../../api/apiModels";

export interface PoiListProps {
  listOfPoi: ListOfPOI;
  Icon?: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
    muiName: string;
  };
  buttonHandler: (index: number) => void;
}
