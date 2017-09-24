import React, { Component } from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { String as StringModel } from 'store/String';
import teoria from 'teoria';
import { intervalFromSemitones } from '../helpers';
import styled from 'styled-components';
import Tuner from './Tuner';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: stretch;
    height: 60px;
`;

const Fret = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 40px;
`;

const Indicator = styled.div`
    width: 10px;
    height: 10px;
    background: #000;
    border-radius: 50%;
    margin: 5px;
`;

const TunerSpacer = styled.div`
    width: 80px;
`;

const indicatorFormat = [
    null,
    null,
    1,
    null,
    1,
    null,
    1,
    null,
    1,
    null,
    null,
    2,
    null,
    null,
    1,
    null,
    1,
    null,
    1,
    null,
    1,
    null,
];

@observer
export default class Inlay extends Component {
    render() {
        return (
            <Container>
                <TunerSpacer />
                {indicatorFormat.map(amount => {
                    const indicators = [];
                    for (let index = 0; index < amount; index++) {
                        indicators.push(<Indicator />);
                    }

                    return <Fret>{indicators}</Fret>;
                })}
            </Container>
        );
    }
}
