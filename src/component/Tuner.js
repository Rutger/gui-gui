import React, { Component } from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { PropTypes as MobXTypes } from 'mobx-react';
import { String as StringModel } from 'store/String';
import { note } from 'tonal';
import styled from 'styled-components';
import Note from './Note';
import Button from './Button';

const Container = styled.div`
    background: #eee;
    width: 90px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
`;

const Actions = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-right: 5px;
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
                <Button type="button" onClick={this.props.onDelete}>
                    ×
                </Button>
                <Actions>
                    <Button type="button" onClick={() => this.props.string.transpose(1)}>
                        ▲
                    </Button>
                    <Button type="button" onClick={() => this.props.string.transpose(-1)}>
                        ▼
                    </Button>
                </Actions>
                <Note
                    note={scaleNote}
                    scale={this.props.scale}
                />
            </Container>
        );
    }
}
