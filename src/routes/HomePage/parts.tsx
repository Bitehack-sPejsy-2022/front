import { Typography } from "@mui/material";
import React from "react";
import styled from "styled-components";
import img from "../../assets/map.jpg";

export const Wrapper = styled.div`
  display: grid;
  width: 100vw;
  height: 100vh;
  grid-template-rows: 3fr 7fr;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    "title title"
    "city map";
  background-image: url(${img});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

export const Title = styled(Typography)`
  grid-area: title;
  padding-top: 48px;
  text-align: center;
`;

export const City = styled.div`
  grid-area: city;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

export const Map = styled.div`
  grid-area: map;
  margin: 0 auto;
`;
