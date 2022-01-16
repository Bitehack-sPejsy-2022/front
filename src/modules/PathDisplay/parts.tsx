import React from "react";
import styled from "styled-components";

export const Name = styled.h6``;

export const Category = styled.h6`
  color: #555;
  font-weight: normal;
  border-bottom: 1px solid #333;
`;

export const Description = styled.div`
  padding-top: 8px;

  & p {
    margin: 0;
  }
`;
