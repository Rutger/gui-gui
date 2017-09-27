import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import Fretboard from './Fretboard';
import ScaleSelector from './ScaleSelector';
import { note, scale } from 'tonal';
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
    @observable scale = [];

    setScale = (tonic, name) => {
        this.scale = scale.notes(tonic, name)
            // Simplify scale.
            .map(scaleNote => note.pc(
                note.fromMidi(note.midi(`${scaleNote}4`), true)
            ));
    }

    componentWillMount() {
        this.setScale('A', 'major');
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
