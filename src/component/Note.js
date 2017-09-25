import React, { Component } from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { String as StringModel } from 'store/String';
import tonal from 'tonal';
import styled from 'styled-components';
import Tuner from './Tuner';

const Note = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: capitalize;

    ${props => {
        if (props.scaleDegree === -1) return `
            opacity: 0.3;
        `;
        if (props.scaleDegree === 0) return `
            background: red;
            color: white;
        `;
        return `
            background: black;
            color: white;
        `;
    }}
`;

@observer
export default class String extends Component {
    static propTypes = {
        note: PropTypes.string.isRequired,
        scale: PropTypes.instanceOf(tonal.Scale).isRequired,
    };

    render() {
        let scaleDegree = -1;
        this.props.scale.forEach((scaleNote, index) => {
            scaleNote = tonal.note.pc(tonal.note.simplify(scaleNote));
            if (scaleNote === this.props.note) {
                scaleDegree = index;
            }
        });

        return (
            <Note scaleDegree={scaleDegree}>
                {this.props.note.toString(true)}
            </Note>
        );
    }
}
