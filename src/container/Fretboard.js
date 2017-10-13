import React, { Component } from 'react';
import { PropTypes as MobXTypes } from 'mobx-react';
import { observer } from 'mobx-react';
import String from '../component/String';
import Inlay from '../component/Inlay';
import Button from '../component/Button';
import { String as StringModel } from '../store/String';
import styled from 'styled-components';

const Container = styled.div`
    overflow-x: auto;
    padding: 20px 0;
`;

const Board = styled.div`
    display: inline-block;
`;

@observer
export default class Fretboard extends Component {
    static propTypes = {
        scale: MobXTypes.arrayOrObservableArray.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            strings: [],
        };
    }

    componentWillMount() {
        const strings = [8, 3, 11, 6, 1, 8];
        strings.forEach(string => {
            this.addString({
                tuningKey: string
            });
        });
    }

    addString = ({tuningKey, position}) => {
        const string = new StringModel({
            tuningKey: tuningKey || 1,
        });
        const strings = this.state.strings;

        switch (position) {
            case 'first':
                strings.unshift(string);
                break;
            case 'last':
            default:
                strings.push(string);
                break;
        }

        this.setState({ strings });
    }

    render() {
        return (
            <Container>
                <Board>
                    <Inlay position="top">
                        <Button bold onClick={() => this.addString({ position: 'first' })} type="button">+</Button>
                    </Inlay>
                    {this.state.strings.map(string =>
                        <String key={string.cid} string={string} strings={this.state.strings} scale={this.props.scale} />
                    )}
                    <Inlay position="bottom">
                        <Button bold onClick={() => this.addString({ position: 'last' })} type="button">+</Button>
                    </Inlay>
                </Board>
            </Container>
        );
    }
}
