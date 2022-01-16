import { BoundsLiteral, LatLng } from "leaflet";
import React, { useEffect, useState } from "react";
import { RouteComponentProps, withRouter } from "react-router";
import { ListOfPOI, Poi } from "../../api/apiModels";
import { getPoiByCityName, postSearchNearPoint } from "../../api/requests";
import MapDisplay from "../../modules/MapDisplay/MapDisplay";
import PoiList from "../../modules/PoiList/PoiList";
import { CityChoosePoiWrapper, PoiListWrapper } from "./parts";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import PublishIcon from "@mui/icons-material/Publish";
import { Button } from "@mui/material";

const MapPage = ({ history }: RouteComponentProps) => {
  const [poi, setPoi] = useState<ListOfPOI>([]);
  const [selectedPoi, setSelectedPoi] = useState<ListOfPOI>([]);
  const [bounds, setBounds] = useState<BoundsLiteral>([
    [0, 0],
    [0, 0],
  ]);
  const [shouldFly, setShouldFly] = useState(false);

  useEffect(() => {
    console.log((history.location.state as { cityName: string }).cityName);
    getPoiByCityName((history.location.state as { cityName: string }).cityName).then((result) => {
      setPoi(result.data.list_of_poi);
      // setShouldFly(true);
      console.log(result.data.list_of_poi);
    });
  }, []);

  const addPoiHandler = (latlng: LatLng) => {
    const newPoi: Poi = {
      name: "Punkt dodany przez użytkownika",
      description: "",
      latitude: latlng.lat,
      longitude: latlng.lng,
      address: "Brak adresu",
      category: "User added",
      picture_url: "",
      open_hour: 0,
      close_hour: 0,
    };
    setSelectedPoi((oldPoi) => [...oldPoi, newPoi]);
    postSearchNearPoint(latlng).then((result) => {
      const listOfPoi = result.data.list_of_poi;
      console.log(listOfPoi);
      if (listOfPoi.length) {
        const newPoi: Poi = {
          name: listOfPoi[0].name,
          description: listOfPoi[0].description,
          latitude: listOfPoi[0].latitude,
          longitude: listOfPoi[0].longitude,
          address: listOfPoi[0].address,
          category: listOfPoi[0].category,
          picture_url: listOfPoi[0].picture_url,
          open_hour: listOfPoi[0].open_hour,
          close_hour: listOfPoi[0].close_hour,
        };
        setSelectedPoi((oldPoi) => [...oldPoi.slice(0, -1), newPoi]);
      }
    });
  };

  const afterFlyHandler = () => {
    setShouldFly(false);
  };

  const addToSelectedHandler = (index: number) => {
    const element = poi[index];
    setPoi((old) => old.filter((poi, i) => i != index));
    setSelectedPoi((old) => [...old, element]);
    setShouldFly(true);
  };

  const deleteFromSelectedHandler = (index: number) => {
    const element = selectedPoi[index];
    setSelectedPoi((old) => old.filter((poi, i) => i != index));
    setPoi((old) => [...old, element]);
    setShouldFly(true);
  };

  return (
    <CityChoosePoiWrapper>
      <PoiListWrapper>
        <Button
          variant="contained"
          endIcon={<PublishIcon />}
          size={"large"}
          onClick={() =>
            history.push("/route", [
              selectedPoi,
              (history.location.state as { cityName: string }).cityName,
            ])
          }
        >
          Potwierdź punkty
        </Button>
        <div>Wybrane punkty</div>
        <PoiList
          listOfPoi={selectedPoi}
          Icon={RemoveIcon}
          buttonHandler={deleteFromSelectedHandler}
        />

        <div>Sugerowane punkty</div>
        <PoiList listOfPoi={poi} Icon={AddIcon} buttonHandler={addToSelectedHandler} />
      </PoiListWrapper>
      <MapDisplay
        listOfPoi={selectedPoi}
        addPoi={addPoiHandler}
        afterFly={afterFlyHandler}
        shouldFly={shouldFly}
      />
    </CityChoosePoiWrapper>
  );
};

export default withRouter(MapPage);
