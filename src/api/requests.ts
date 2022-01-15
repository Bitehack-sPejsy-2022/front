import apiInstance from "./axios";
import paths from "./paths";
import * as apiModels from "./apiModels";

export const getPoiByCityName = (name: string) =>
  apiInstance.get<apiModels.GetPoiByCityReturnType>(paths.poiByCity(name));

export {};
