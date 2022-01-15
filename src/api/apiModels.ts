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

export {};
