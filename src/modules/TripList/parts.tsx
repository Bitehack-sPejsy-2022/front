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
  width: 100px;
  height: 100px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

export const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  grid-gap: 4px;
  grid-auto-rows: 1fr;
  height: 100%;
  overflow: scroll;
  padding: 4px;
`;

export const ListElement = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 100px 1fr 80px;
  width: 100%;
  height: 100px;
  grid-template-areas:
    "image title button"
    "image category button";
  border: 1px solid #aaa;
  border-radius: 4px;
`;

export const Movement = styled.div`
  border-left: 3px dashed #333;
  margin-left: 50px;
  padding: 8px;
`;
