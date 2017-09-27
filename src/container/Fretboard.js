import React, { Component } from 'react';
import { PropTypes as MobXTypes } from 'mobx-react';
import { observer } from 'mobx-react';
import String from '../component/String';
import Inlay from '../component/Inlay';
import Button from '../component/Button';
import { String as StringModel, StringStore } from '../store/String';
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

    componentWillMount() {
        this.stringStore = new StringStore();

        const strings = [8, 3, 11, 6, 1, 8];
        strings.forEach(this.addString);
    }

    addString = (tuningKey) => {
        const string = new StringModel({
            tuningKey: tuningKey || 1,
        });

        this.stringStore.add(string.toJS());
    }

    render() {
        return (
            <Container>
                <Board>
                    <Inlay position="top" />
                    {this.stringStore.map(string =>
                        <String key={string.cid} string={string} stringStore={this.stringStore} scale={this.props.scale} />
                    )}
                    <Inlay position="bottom">
                        <Button onClick={() => this.addString()} type="button">+</Button>
                    </Inlay>
                </Board>
            </Container>
        );
    }
}
