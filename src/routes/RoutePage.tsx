import { BoundsLiteral, LatLng } from "leaflet";
import React, { useEffect, useState } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { ListOfPOI, PlanTripRequest, Poi, RecommendedTrips, Trip } from "../api/apiModels";
import { getPoiByCityName, postPlanTrip, postSearchNearPoint } from "../api/requests";
import MapDisplay from "../modules/MapDisplay/MapDisplay";
import PathDisplay from "../modules/PathDisplay/PathDisplay";

const RoutePage = ({ history }: RouteComponentProps) => {
  const [trips, setTrips] = useState<RecommendedTrips>();
  const [shouldFly, setShouldFly] = useState(false);
  const [trip, setTrip] = useState<number>(0);

  console.log(history);

  useEffect(() => {
    const exampleTripRequest: PlanTripRequest = {
      chosen_pois: {
        list_of_poi: [
          {
            poi: {
              name: "Kociół",
              description: "opis",
              address: "lol",
              category: "Attraction",
              latitude: 50.05615,
              longitude: 19.927975,
              open_hour: 7,
              close_hour: 16,
              picture_url: "",
            },
            time_spent: 1,
          },
          {
            poi: {
              name: "Lololol",
              description: "opis2",
              address: "lol",
              category: "Attraction",
              latitude: 50.068007,
              longitude: 19.903234,
              open_hour: 7,
              close_hour: 16,
              picture_url: "",
            },
            time_spent: 1,
          },
          {
            poi: {
              name: "trzecia lokacja",
              description: "opis2",
              address: "lol",
              category: "Attraction",
              latitude: 50.069448,
              longitude: 19.945146,
              open_hour: 7,
              close_hour: 16,
              picture_url: "",
            },
            time_spent: 1,
          },
        ],
      },
      start_time: "2022-01-15T07:00:00Z",
      end_time: "2022-01-15T20:00:00Z",
      number_of_trips: 1,
    };
    const tripRequest: PlanTripRequest = {
      chosen_pois: {
        list_of_poi: (history.location.state as ListOfPOI).map((poi) => ({ poi, time_spent: 1 })),
      },
      start_time: "2022-01-15T07:00:00Z",
      end_time: "2022-01-15T20:00:00Z",
      number_of_trips: 1,
    };
    postPlanTrip(tripRequest).then((result) => {
      console.log(result.data);
      setTrips(result.data);
      setShouldFly(true);
    });
  }, []);

  const afterFlyHandler = () => {
    setShouldFly(false);
  };

  return (
    <PathDisplay
      recommendedTrips={trips}
      trip={trip}
      afterFly={afterFlyHandler}
      shouldFly={shouldFly}
    />
  );
};
export default withRouter(RoutePage);
