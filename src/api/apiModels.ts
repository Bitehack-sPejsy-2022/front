import { BoundsLiteral, LatLng } from "leaflet";

export interface Poi {
  name: string;
  description: string;
  address: string;
  category: string;
  latitude: number;
  longitude: number;
  picture_url: string;
  open_hour: number;
  close_hour: number;
}

export type ListOfPOI = Poi[];

export type GetPoiByCityReturnType = { list_of_poi: ListOfPOI };

export interface TimedPoi {
  poi: Poi;
  time_spent: number;
}

export type ListOfTimedPois = { list_of_poi: TimedPoi[] };

export interface Trip {
  list_of_poi: ListOfTimedPois;
  transit_times: number[];
  route: LatLng[];
  bounds: BoundsLiteral;
}

export interface RecommendedTrips {
  trips: Trip[];
}

export interface PlanTripRequest {
  chosen_pois: ListOfTimedPois;
  start_time: string;
  end_time: string;
  number_of_trips: number;
}

export {};
