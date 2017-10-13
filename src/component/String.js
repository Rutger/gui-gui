import React, { Component } from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { PropTypes as MobXTypes } from 'mobx-react';
import { String as StringModel, StringStore } from 'store/String';
import { note } from 'tonal';
import styled from 'styled-components';
import Tuner from './Tuner';
import Note from './Note';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: stretch;
`;

const Fret = styled.div`
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-right: 2px solid #eee;
`;

@observer
export default class String extends Component {
    static propTypes = {
        string: PropTypes.instanceOf(StringModel).isRequired,
        stringStore: PropTypes.instanceOf(StringStore).isRequired,
        scale: MobXTypes.arrayOrObservableArray.isRequired,
    };

    renderNote = (semitones) => {
        const key = this.props.string.tuningKey + semitones + 8;
        const scaleNote = note.pc(note.fromMidi(key, true));

        return (
            <Fret key={semitones}>
                <Note
                    note={scaleNote}
                    scale={this.props.scale}
                />
            </Fret>
        );
    }

    renderNotes = () => {
        const notes = Array.apply(null, Array(22)).map((value, index) => index + 1);
        return notes.map((semitones) => this.renderNote(semitones));
    }

    handleDelete = () => {
        const key = this.props.string.tuningKey + 8;
        const scaleNote = note.pc(note.fromMidi(key, true));

        if (window.confirm(`Are you sure you want to remove the ${scaleNote} string?`)) {
            this.props.stringStore.remove(this.props.string);
        }
    }

    render() {
        return (
            <Container>
                <Tuner
                    string={this.props.string}
                    onDelete={this.handleDelete}
                    scale={this.props.scale}
                />
                {this.renderNotes()}
            </Container>
        );
    }
}
