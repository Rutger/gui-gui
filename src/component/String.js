import React, { Component } from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { PropTypes as MobXTypes } from 'mobx-react';
import { String as StringModel } from 'store/String';
import { note } from 'tonal';
import styled from 'styled-components';
import Tuner from './Tuner';
import Note from './Note';
import indicatorFormat from 'helper/indicatorFormat';

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: stretch;
`;

const Fret = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border-right: 2px solid #eee;

    ${props => !props.hasInlay ? null : `
        background: #f3f3f3;
    `}
`;

@observer
export default class String extends Component {
    static propTypes = {
        string: PropTypes.instanceOf(StringModel).isRequired,
        strings: PropTypes.array.isRequired,
        scale: MobXTypes.arrayOrObservableArray.isRequired,
        onRemoveString: PropTypes.func.isRequired,
    };

    renderFret = (semitones, index) => {
        const key = this.props.string.tuningKey + semitones + 8;
        const scaleNote = note.pc(note.fromMidi(key, true));
        const hasInlay = !!indicatorFormat[index % 12];

        return (
            <Fret
                key={semitones}
                hasInlay={hasInlay}
            >
                <Note
                    note={scaleNote}
                    scale={this.props.scale}
                />
            </Fret>
        );
    }

    renderFrets = () => {
        const notes = Array.apply(null, Array(22)).map((value, index) => index + 1);
        return notes.map((semitones, index) => this.renderFret(semitones, index));
    }

    handleDelete = () => {
        const key = this.props.string.tuningKey + 8;
        const scaleNote = note.pc(note.fromMidi(key, true));

        if (window.confirm(`Are you sure you want to remove the ${scaleNote} string?`)) {

            const stringIndex = this.props.strings.findIndex(string => string.cid === this.props.string.cid);
            this.props.onRemoveString(stringIndex);
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
                {this.renderFrets()}
            </Container>
        );
    }
}
