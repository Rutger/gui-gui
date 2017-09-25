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

const Fret = styled.div`
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-right: 1px solid black;
`;

const Note = styled.div`
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    text-transform: capitalize;

    ${props => {
        if (!props.scaleDegree) return `
            opacity: 0.3;
        `;
        if (props.scaleDegree === 1) return `
            background: red;
            color: white;
        `;
        return `
            background: black;
            color: white;
        `;
    }}
`;

@observer
export default class String extends Component {
    static propTypes = {
        string: PropTypes.instanceOf(StringModel).isRequired,
        scale: PropTypes.instanceOf(teoria.Scale).isRequired,
    };

    renderNote = (semitones) => {
        const key = this.props.string.tuningKey + semitones;
        const note = teoria.note.fromKey(key);
        const scaleDegree = note.scaleDegree(this.props.scale)
        console.log(scaleDegree);

        return (
            <Fret key={semitones}>
                <Note scaleDegree={scaleDegree}>
                    {note.toString(true)}
                </Note>
            </Fret>
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
