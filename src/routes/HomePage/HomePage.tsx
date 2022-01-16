import { Button, Input, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { City, Map, Title, Wrapper } from "./parts";
import MapIcon from "@mui/icons-material/Map";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import { RouteComponentProps, withRouter } from "react-router";

const HomePage = ({ history }: RouteComponentProps) => {
  const [cityName, setCityName] = useState("");
  return (
    <>
      <Wrapper>
        <Title variant="h1" fontWeight="bold">
          TRIPPIE
        </Title>
        <City>
          <TextField
            label="Miasto"
            variant="standard"
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
          />
          <Button
            variant="contained"
            endIcon={<LocationCityIcon />}
            size={"large"}
            style={{ padding: "24px 32px", marginTop: "8px" }}
            onClick={() => {
              console.log(cityName);
              history.push("/citychoose", { cityName });
            }}
          >
            Wyszukaj miasto
          </Button>
        </City>
        <Map>
          <Button
            variant="contained"
            endIcon={<MapIcon />}
            size={"large"}
            style={{ padding: "24px 32px", marginTop: "56px" }}
            onClick={() => {
              console.log(cityName);
              history.push("/mapchoose");
            }}
          >
            Wybierz punkty na mapie
          </Button>
        </Map>
      </Wrapper>
    </>
  );
};

export default withRouter(HomePage);
