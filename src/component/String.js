import React, { Component } from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { String as StringModel } from 'store/String';
import teoria from 'teoria';
import { intervalFromSemitones } from '../helpers';
import styled from 'styled-components';
import Tuner from './Tuner';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: stretch;
    height: 60px;
`;

const Note = styled.div`
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-right: 1px solid black;
`;

@observer
export default class String extends Component {
    static propTypes = {
        string: PropTypes.instanceOf(StringModel).isRequired,
    };

    renderNote = (semitones) => {
        const key = this.props.string.tuningKey + semitones;
        const note = teoria.note.fromKey(key);

        return (
            <Note key={semitones}>
                {note.toString(true)}
            </Note>
        );
    }

    renderNotes = () => {
        const notes = Array.apply(null, Array(22)).map((value, index) => index + 1);

        return notes.map((semitones) => this.renderNote(semitones));
    }

    handleDelete = () => {
        this.props.stringStore.remove(this.props.string);
    }

    render() {
        return (
            <Container>
                <Tuner string={this.props.string} onDelete={this.handleDelete} />
                {this.renderNotes()}
            </Container>
        );
    }
}
