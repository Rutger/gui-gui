import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import Fretboard from './Fretboard';
import ScaleSelector from './ScaleSelector';
import GitHub from 'component/GitHub';
import { note, scale } from 'tonal';
import styled from 'styled-components';
import 'react-select/dist/react-select.css';

const Container = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const Header = styled.div`
    height: 60px;
    background: #333;
    display: flex;
    align-items: center;
`;

const Content = styled.div`
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: center;
`;

const AuthorLink = styled.a`
    color: #fff;
    text-decoration: none;
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
                <Header>
                    <ScaleSelector scale={this.scale} setScale={this.setScale} />
                    <AuthorLink href="https://rutgerschimmel.nl">Rutger Schimmel</AuthorLink>
                    <GitHub />
                </Header>
                <Content>
                    <Fretboard scale={this.scale} />
                </Content>
            </Container>
        );
    }
}
