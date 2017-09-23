import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { String as StringModel } from 'store/String';
import teoria from 'teoria';
import { intervalFromSemitones } from '../helpers';

export default class String extends Component {
    static propTypes = {
        string: PropTypes.instanceOf(StringModel).isRequired,
    };

    renderNote = (semitones) => {
        const interval = teoria.interval(intervalFromSemitones(semitones));
        const note = teoria.note(
                this.props.string.tuning.toString()
            ).transpose(interval);

        return (
            <div key={semitones}>
                {note.toString(true)}
            </div>
        );
    }

    renderNotes = () => {
        const notes = Array.apply(null, Array(22)).map((value, index) => index);

        return notes.map((semitones) => this.renderNote(semitones));
    }

    render() {
        return (
            <div>
                {this.renderNotes()}
            </div>
        );
    }
}
