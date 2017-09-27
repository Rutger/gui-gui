import React, { Component } from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { PropTypes as MobXTypes } from 'mobx-react';
import styled from 'styled-components';

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

@observer
export default class String extends Component {
    static propTypes = {
        note: PropTypes.string.isRequired,
        scale: MobXTypes.arrayOrObservableArray.isRequired,
    };

    render() {
        let scaleDegree = -1;
        this.props.scale.forEach((scaleNote, index) => {
            if (scaleNote === this.props.note) {
                scaleDegree = index;
            }
        });

        return (
            <Note scaleDegree={scaleDegree}>
                {this.props.note}
            </Note>
        );
    }
}
