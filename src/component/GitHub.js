import React, { Component } from 'react';
import styled from 'styled-components';
import GitHubLogo from 'assets/github.svg';

const StyledImage = styled.img`
    width: 38px;
    height: 38px;
    margin: 12px;
`;

const GitHub = () => {
  return (
      <a
          href="https://github.com/rutger/gui-gui"
          target="_blank"
      >
          <StyledImage
              src={GitHubLogo}
              alt="GitHub"
          />
      </a>
  );
};
