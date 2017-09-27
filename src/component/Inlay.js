import React, { Component } from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

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
    border-right: 2px solid;
    border-image: linear-gradient(to ${props => props.position}, #eee, rgba(0, 0, 0, 0)) 1 100%;
`;

const Indicator = styled.div`
    width: 10px;
    height: 10px;
    background: #333;
    border-radius: 50%;
    margin: 5px;
`;

const TunerSpacer = styled.div`
    width: 80px;
    background: linear-gradient(to ${props => props.position}, #eee, rgba(0, 0, 0, 0));
    display: flex;
    align-items: center;
    justify-content: center;
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
    static propTypes = {
        children: PropTypes.node,
        position: PropTypes.string,
    };

    render() {
        return (
            <Container>
                <TunerSpacer position={this.props.position}>
                    {this.props.children}
                </TunerSpacer>
                {indicatorFormat.map((amount, indicatorIndex) => {
                    const indicators = [];
                    for (let index = 0; index < amount; index++) {
                        indicators.push(<Indicator key={index} />);
                    }

                    return <Fret position={this.props.position} key={indicatorIndex}>{indicators}</Fret>;
                })}
            </Container>
        );
    }
}
