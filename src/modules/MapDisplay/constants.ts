import { LatLng } from "leaflet";
import { ListOfPOI, ListOfTimedPois, Poi } from "../../api/apiModels";

export interface MapDisplayProps {
  listOfPoi: ListOfPOI;
  addPoi: (latlng: LatLng) => void;
  afterFly: () => void;
  shouldFly: boolean;
  line?: ListOfTimedPois;
}
