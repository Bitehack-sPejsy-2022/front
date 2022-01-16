import { Button, TextField } from "@mui/material";
import { BoundsLiteral, LatLng } from "leaflet";
import React, { useEffect, useState } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { ListOfPOI, PlanTripRequest, Poi, RecommendedTrips, Trip } from "../../api/apiModels";
import { getPoiByCityName, postPlanTrip, postSearchNearPoint } from "../../api/requests";
import MapDisplay from "../../modules/MapDisplay/MapDisplay";
import PathDisplay from "../../modules/PathDisplay/PathDisplay";
import MapIcon from "@mui/icons-material/Map";
import { PathListWrapper, PathSettingsWrapper, PoiListWrapper, RoutePageWrapper } from "./parts";
import DateTimePicker from "@mui/lab/DateTimePicker";
import PoiSettingsList from "../../modules/PoiSettingsList/PoiSettingsList";
import PoiList from "../../modules/PoiList/PoiList";

const RoutePage = ({ history }: RouteComponentProps) => {
  const [trips, setTrips] = useState<RecommendedTrips>();
  const [shouldFly, setShouldFly] = useState(false);
  const [trip, setTrip] = useState<number>(0);
  const [startTime, setStartTime] = useState(new Date("2022-01-15T09:00:00"));
  const [endTime, setEndTime] = useState(new Date("2022-01-15T21:00:00"));
  const [numberOfTrips, setNumberOfTrips] = useState(1);
  const [times, setTimes] = useState(
    new Array((history.location.state as [ListOfPOI, string])[0].length).fill(1),
  );

  console.log(history);

  const getPaths = () => {
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
      city: (history.location.state as [ListOfPOI, string])[1],
    };
    const tripRequest: PlanTripRequest = {
      chosen_pois: {
        list_of_poi: (history.location.state as [ListOfPOI, string])[0].map((poi, i) => ({
          poi,
          time_spent: times[i],
        })),
      },
      start_time: startTime.toISOString(),
      end_time: endTime.toISOString(),
      number_of_trips: numberOfTrips,
      city: (history.location.state as [ListOfPOI, string])[1],
    };
    postPlanTrip(tripRequest).then((result) => {
      console.log(result.data);
      setTrips(result.data);
      setShouldFly(true);
    });
  };

  const afterFlyHandler = () => {
    setShouldFly(false);
  };

  return (
    <RoutePageWrapper>
      {!trips ? (
        <PoiListWrapper>
          <Button
            variant="contained"
            endIcon={<MapIcon />}
            size={"large"}
            onClick={() => getPaths()}
          >
            Wygeneruj ścieżki
          </Button>
          <PathSettingsWrapper>
            <div>Rozpoczęcie wycieczki</div>
            <DateTimePicker
              label="Rozpoczęcie wycieczki"
              value={startTime}
              onChange={(v) => setStartTime(v as Date)}
              renderInput={(params) => <TextField {...params} />}
            />
            <div>Zakończenie wycieczki</div>
            <DateTimePicker
              label="Zakończenie wycieczki"
              value={endTime}
              onChange={(v) => setEndTime(v as Date)}
              renderInput={(params) => <TextField {...params} />}
            />
            <div>Ilość proponowanych tras</div>
            <TextField
              type="number"
              value={numberOfTrips}
              onChange={(e) => setNumberOfTrips(parseInt(e.target.value))}
              label="Ilość tras"
            />
          </PathSettingsWrapper>
          <PoiSettingsList
            listOfPoi={(history.location.state as [ListOfPOI, string])[0]}
            time={times}
            setTime={(time, i) =>
              setTimes((old) => {
                const newTimes = [...old];
                newTimes[i] = time;
                return newTimes;
              })
            }
          />
        </PoiListWrapper>
      ) : (
        <PathListWrapper>
          {trips.trips.map((trip, i) => {
            return (
              <Button key={i} variant="contained" size={"large"} onClick={() => setTrip(i)}>
                Trasa {i + 1}
              </Button>
            );
          })}
          <PoiList
            listOfPoi={trips.trips[trip].list_of_poi.list_of_poi.map((timedPoi) => timedPoi.poi)}
            buttonHandler={(i) => {}}
          />
        </PathListWrapper>
      )}
      <PathDisplay
        recommendedTrips={trips}
        trip={trip}
        afterFly={afterFlyHandler}
        shouldFly={shouldFly}
      />
    </RoutePageWrapper>
  );
};
export default withRouter(RoutePage);
