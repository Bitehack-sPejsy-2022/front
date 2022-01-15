import { BoundsLiteral, LatLng } from "leaflet";
import { ListOfPOI, Poi } from "../../api/apiModels";

export interface MapDisplayProps {
  listOfPoi: ListOfPOI;
  addPoi: (latlng: LatLng) => void;
  bounds: BoundsLiteral;
}
