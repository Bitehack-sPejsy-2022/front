import React from "react";
import styled from "styled-components";

export const RoutePageWrapper = styled.div`
  display: grid;
  grid-template-columns: 2fr 3fr;
`;

export const PoiListWrapper = styled.div`
  display: grid;
  grid-template-rows: auto auto 1fr;
  height: 100vh;
  padding: 8px;
  grid-gap: 16px;
`;

export const PathSettingsWrapper = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: 1fr 1fr;
  grid-gap: 16px;
`;

export const PathListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  grid-auto-rows: auto;
  max-height: 100vh;
  padding: 8px;
  grid-gap: 16px;
`;
