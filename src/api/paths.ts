const paths = {
  poiByCity: (name: string) => `/poi/city/${name}`,
  searchNearPoint: "/search_near_point",
  getPlannedTrips: "/plan_trip",
  poiBySelected: "/search_polygon",
};

export default paths;
