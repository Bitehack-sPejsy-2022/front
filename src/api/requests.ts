import apiInstance from "./axios";
import paths from "./paths";
import * as apiModels from "./apiModels";
import { LatLng } from "leaflet";

export const getPoiByCityName = (name: string) =>
  apiInstance.get<apiModels.GetPoiByCityReturnType>(paths.poiByCity(name));

export const postSearchNearPoint = (latlng: LatLng) =>
  apiInstance.post<apiModels.GetPoiByCityReturnType>(paths.searchNearPoint, latlng);

export const postPlanTrip = (tripRequest: apiModels.PlanTripRequest) =>
  apiInstance.post<apiModels.RecommendedTrips>(paths.getPlannedTrips, tripRequest);

export const postPoiBySelected = (selected: { list_of_points: { lat: number; lng: number }[] }) =>
  apiInstance.post<apiModels.GetPoiByCityReturnType>(paths.poiBySelected, selected);
