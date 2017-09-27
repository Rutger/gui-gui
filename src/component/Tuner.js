import React, { Component } from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { PropTypes as MobXTypes } from 'mobx-react';
import { String as StringModel } from 'store/String';
import { note } from 'tonal';
import styled from 'styled-components';
import Note from './Note';

const Container = styled.div`
    background: #eee;
    width: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
`;

const Tuning = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

@observer
export default class Tuner extends Component {
    static propTypes = {
        string: PropTypes.instanceOf(StringModel).isRequired,
        onDelete: PropTypes.func.isRequired,
        scale: MobXTypes.arrayOrObservableArray.isRequired,
    };

    render() {
        const key = this.props.string.tuningKey + 8;
        const scaleNote = note.pc(note.fromMidi(key, true));

        return (
            <Container>
                <button type="button" onClick={this.props.onDelete}>×</button>
                <Tuning>
                    <button type="button" onClick={() => this.props.string.transpose(1)}>▲</button>
                    <Note
                        note={scaleNote}
                        scale={this.props.scale}
                    />
                    <button type="button" onClick={() => this.props.string.transpose(-1)}>▼</button>
                </Tuning>
            </Container>
        );
    }
}
