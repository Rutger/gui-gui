import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import Fretboard from './Fretboard';
import ScaleSelector from './ScaleSelector';
import tonal from 'tonal';
import styled from 'styled-components';
import 'react-select/dist/react-select.css';

const Container = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`;

const Content = styled.div`
    flex: 1;
    overflow-y: scroll;
`;

@observer
export default class App extends Component {
    @observable scale = tonal.scale.get('major', 'a');

    setScale = (scale, tonic) => {
        this.scale = tonal.scale.get(scale, tonic)
            // Simplify scale.
            .map(note => tonal.note.pc(tonal.note.simplify(note)));
    }

    render() {
        return (
            <Container>
                <ScaleSelector scale={this.scale} setScale={this.setScale} />
                <Content>
                    <Fretboard scale={this.scale} />
                </Content>
            </Container>
        );
    }
}
