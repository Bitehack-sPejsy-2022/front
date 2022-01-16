import { LatLng } from "leaflet";
import { ListOfPOI, ListOfTimedPois, Poi, RecommendedTrips } from "../../api/apiModels";

export interface PathDisplayProps {
  recommendedTrips?: RecommendedTrips;
  trip: number;
  afterFly: () => void;
  shouldFly: boolean;
}
