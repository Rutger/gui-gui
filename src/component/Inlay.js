import React, { Component } from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import indicatorFormat from 'helper/indicatorFormat';

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
    width: 42px;
    border-right: 2px solid;
    border-left: 0;
    border-image: linear-gradient(to ${props => props.position}, #eee, #fff) 1 100%;
`;

const Circle = styled.div`
    width: 10px;
    height: 10px;
    background: #333;
    border-radius: 50%;
    margin: 5px;
`;

const Number = styled.div`
`;

const TunerSpacer = styled.div`
    width: 100px;
    background: linear-gradient(to ${props => props.position}, #eee, #fff);
    display: flex;
    align-items: center;
    justify-content: center;
`;

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
                    let Indicator = null;

                    if (amount) {
                        if (this.props.position === 'top') {
                            Indicator = <Number>{indicatorIndex + 1}</Number>;
                        } else {
                            Indicator = [];
                            for (let index = 0; index < amount; index++) {
                                Indicator.push(<Circle key={index} />);
                            }
                        }
                    }

                    return <Fret position={this.props.position} key={indicatorIndex}>{Indicator}</Fret>;
                })}
            </Container>
        );
    }
}
