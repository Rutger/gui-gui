import React, { Component } from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { PropTypes as MobXTypes } from 'mobx-react';
import styled from 'styled-components';

const Note = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin: 10px 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: capitalize;

    ${props => {
        if (props.scaleDegree === -1) return `
            color: #bbb;
        `;
        if (props.scaleDegree === 0) return `
            background: #f12424;
            color: #fff;
        `;
        return `
            background: #333;
            color: #fff;
        `;
    }}
`;

const String = props => {
  let scaleDegree = -1;
  props.scale.forEach((scaleNote, index) => {
      if (scaleNote === props.note) {
          scaleDegree = index;
      }
  });

  return (
    <Note scaleDegree={scaleDegree}>
        {props.note}
    </Note>
  );
};

String.propTypes = {
    note: PropTypes.string.isRequired,
    scale: MobXTypes.arrayOrObservableArray.isRequired,
};
