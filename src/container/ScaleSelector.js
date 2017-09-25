import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import tonal from 'tonal';
import { String as StringModel, StringStore } from '../store/String';

const tonics = [
    'A',
    'A#',
    'B',
    'C',
    'C#',
    'D',
    'D#',
    'E',
    'F',
    'F#',
    'G',
    'G#',
];

const scales = [
    'major',
    'minor',
    'ionian',
    'dorian',
    'phrygian',
    'lydian',
    'mixolydian',
    'aeolian',
    'locrian',
    'majorpentatonic',
    'minorpentatonic',
    'chromatic',
    'harmonicchromatic',
    'blues',
    'doubleharmonic',
    'flamenco',
    'harmonicminor',
    'melodicminor',
    'wholetone',
];

@observer
export default class Fretboard extends Component {
    @observable tonic = 'A';
    @observable scale = 'major';

    static propTypes = {
        setScale: PropTypes.func.isRequired,
        scale: PropTypes.instanceOf(tonal.Scale).isRequired,
    };

    setTonic = event => {
        this.tonic = event.target.value;
        this.updateScale();
    }

    setScale = event => {
        this.scale = event.target.value;
        this.updateScale();
    }

    updateScale = () => {
        this.props.setScale(this.scale, this.tonic);
    }

    render() {
        return (
            <div>
                <select onChange={this.setTonic} value={this.tonic}>
                    {tonics.map(tonic => (
                        <option key={tonic} value={tonic}>{tonic}</option>
                    ))}
                </select>
                <select onChange={this.setScale} value={this.scale}>
                    {tonal.scale.names().map(scale => (
                        <option key={scale} value={scale}>{scale}</option>
                    ))}
                </select>
            </div>
        );
    }
}
