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
    width: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
`;

const TransposeContainer = styled.div`
    display: flex;
    align-items: stretch;
    justify-content: center;
    flex-direction: column;
    width: 24px;
    border-radius: 12px;
    overflow: hidden;
`;

const TransposeButton = styled(Button)`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: #fff;
    border-bottom: 1px solid #eee;
    background: #fff;
    font-size: 12px;

    &:last-child {
        border-bottom: 0;
    }

    &:active {
        background: #ddd;
    }
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
                <Button bold type="button" onClick={this.props.onDelete}>
                    ×
                </Button>
                <TransposeContainer>
                    <TransposeButton type="button" onClick={() => this.props.string.transpose(1)}>
                        ♯
                    </TransposeButton>
                    <TransposeButton type="button" onClick={() => this.props.string.transpose(-1)}>
                        ♭
                    </TransposeButton>
                </TransposeContainer>
                <Note
                    note={scaleNote}
                    scale={this.props.scale}
                />
            </Container>
        );
    }
}
