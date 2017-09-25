import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import teoria from 'teoria';
import { String as StringModel, StringStore } from '../store/String';

const tonics = [
    'A',
    'Bb',
    'B',
    'C',
    'Db',
    'D',
    'Eb',
    'E',
    'F',
    'Gb',
    'G',
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
        scale: PropTypes.instanceOf(teoria.Scale).isRequired,
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
        this.props.setScale(this.tonic, this.scale)
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
                    {scales.map(scale => (
                        <option key={scale} value={scale}>{scale}</option>
                    ))}
                </select>
            </div>
        );
    }
}
