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

const Fretboard = props => {
  const [strings, setStrings] = useState([]);

  useEffect(() => {
      const strings = [8, 3, 11, 6, 1, 8];
      strings.forEach(string => {
          handleAddString({
              tuningKey: string
          });
      });
  });

  const handleAddString = ({tuningKey, position}) => {
      const string = new StringModel({
          tuningKey: tuningKey || 1,
      });
      const strings = strings;

      switch (position) {
          case 'first':
              strings.unshift(string);
              break;
          case 'last':
          default:
              strings.push(string);
              break;
      }

      setStrings(strings);
  };

  const handleRemoveString = index => {
      const strings = strings;
      strings.splice(index, 1);
      setStrings(strings);
  };

  return (
    <Container>
        <Board>
            <Inlay position="top">
                <Button bold onClick={() => handleAddString({ position: 'first' })} type="button">+</Button>
            </Inlay>
            {strings.map(string =>
                <String
                    key={string.cid}
                    string={string}
                    strings={strings}
                    scale={props.scale}
                    onRemoveString={handleRemoveString}
                />
            )}
            <Inlay position="bottom">
                <Button bold onClick={() => handleAddString({ position: 'last' })} type="button">+</Button>
            </Inlay>
        </Board>
    </Container>
  );
};

Fretboard.propTypes = {
    scale: MobXTypes.arrayOrObservableArray.isRequired,
};
