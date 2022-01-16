import React from "react";
import styled from "styled-components";

export const Name = styled.h6`
  grid-area: title;
`;

export const Category = styled.h6`
  color: #555;
  font-weight: normal;
  grid-area: category;
`;

export const Description = styled.div`
  padding-top: 8px;

  & p {
    margin: 0;
  }
`;

export const Button = styled.div`
  grid-area: button;
  padding-top: 24px;
`;

export const Image = styled.div`
  grid-area: image;
`;

export const ListWrapper = styled.div`
  display: grid;
  grid-gap: 4px;
  grid-auto-rows: 1fr;
  height: 100%;
  overflow: scroll;
  padding: 4px;
`;

export const ListElement = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 100px 1fr 52px;
  width: 100%;
  height: 100px;
  grid-template-areas:
    "image title button"
    "image category button";
  border: 1px solid #aaa;
  border-radius: 4px;
`;
