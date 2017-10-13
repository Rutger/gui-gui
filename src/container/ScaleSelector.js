import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PropTypes as MobXTypes } from 'mobx-react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { scale } from 'tonal';
import styled from 'styled-components';
import Select from 'react-select';

const TonicSelect = styled(Select)`
    width: 110px;
    margin: 5px;

    & .Select-value,
    & .Select-option {
        text-align: center;
    }
`;

const ScaleSelect = styled(Select)`
    width: 300px;
    margin: 5px;
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

const scales = scale.names(true).map(scaleName => ({
    value: scaleName,
    label: scaleName,
}));


const Container = styled.div`
    flex: 1;
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
        scale: MobXTypes.arrayOrObservableArray.isRequired,
    };

    setTonic = option => {
        this.tonic = option.value;
        this.updateScale();
    }

    setScale = option => {
        this.scale = option.value;
        this.updateScale();
    }

    updateScale = () => {
        this.props.setScale(this.tonic, this.scale);
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
                <ScaleSelect
                    options={scales}
                    value={this.scale}
                    onChange={this.setScale}
                    clearable={false}
                    backspaceRemoves={false}
                    autosize={false}
                    closeOnSelect={false}
                    noResultsText="No scales found"
                />
            </Container>
        );
    }
}
