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

const Info = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;

    @media (max-width: 600px) {
        display: none;
    }
`;

const AuthorLink = styled.a`
    color: #fff;
    text-decoration: none;
`;

const App = () => {
  useEffect(() => {
      setScale('A', 'major');
  });

  const [scale, setScale] = useState([]);

  const setScale = (tonic, name) => {
      scale = scale.notes(tonic, name)
          // Simplify scale.
          .map(scaleNote => note.pc(
              note.fromMidi(note.midi(`${scaleNote}4`), true)
          ));
  };

  return (
    <Container>
        <Header>
            <ScaleSelector scale={scale} setScale={setScale} />
            <Info>
                <AuthorLink href="https://rutgerschimmel.nl">Rutger Schimmel</AuthorLink>
                <GitHub />
            </Info>
        </Header>
        <Content>
            <Fretboard scale={scale} />
        </Content>
    </Container>
  );
};
