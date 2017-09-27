import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import tonal from 'tonal';
import { String as StringModel, StringStore } from '../store/String';
import styled from 'styled-components';
import Select from 'react-select';

const TonicSelect = styled(Select)`
    width: 110px;

    & .Select-value,
    & .Select-option {
        text-align: center;
    }
`;

const tonics = [
    { value: 'A', label: 'A' },
    { value: 'A#', label: 'A# / Bb' },
    { value: 'B', label: 'B' },
    { value: 'C', label: 'C' },
    { value: 'C#', label: 'C# / Db' },
    { value: 'D', label: 'D' },
    { value: 'D#', label: 'D# / Eb' },
    { value: 'E', label: 'E' },
    { value: 'F', label: 'F' },
    { value: 'F#', label: 'F# / Gb' },
    { value: 'G', label: 'G' },
    { value: 'G#', label: 'G# / Ab' },
];


const Container = styled.div`
    height: 60px;
    background: #333;
    display: flex;
    align-items: center;
    justify-content: center;
`;

@observer
export default class Fretboard extends Component {
    @observable tonic = 'A';
    @observable scale = 'major';

    static propTypes = {
        setScale: PropTypes.func.isRequired,
        scale: PropTypes.instanceOf(tonal.Scale).isRequired,
    };

    setTonic = option => {
        this.tonic = option.value;
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
            <Container>
                <TonicSelect
                    options={tonics}
                    value={this.tonic}
                    onChange={this.setTonic}
                    clearable={false}
                    searchable={false}
                    backspaceRemoves={false}
                    autosize={false}
                    closeOnSelect={false}
                />
                <select onChange={this.setScale} value={this.scale}>
                    {tonal.scale.names().map(scale => (
                        <option key={scale} value={scale}>{scale}</option>
                    ))}
                </select>
            </Container>
        );
    }
}
