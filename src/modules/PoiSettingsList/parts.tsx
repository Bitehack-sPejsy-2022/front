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
  padding-right: 4px;
`;

export const Image = styled.div`
  grid-area: image;
`;

export const Text = styled.div`
  grid-area: text;
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
  grid-template-rows: 1fr 1fr 2fr;
  grid-template-columns: 100px 1fr 50%;
  width: 100%;
  height: 150px;
  grid-template-areas:
    "image title title"
    "image category category"
    "image text button";
  border: 1px solid #aaa;
  border-radius: 4px;
`;
