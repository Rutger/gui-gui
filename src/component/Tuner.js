import React, { Component } from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { String as StringModel } from 'store/String';
import tonal from 'tonal';
import styled from 'styled-components';
import Note from './Note';

const Container = styled.div`
    background: #eee;
    width: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;
`;

const Tuning = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;

@observer
export default class Tuner extends Component {
    static propTypes = {
        string: PropTypes.instanceOf(StringModel).isRequired,
        onDelete: PropTypes.func.isRequired,
        scale: PropTypes.instanceOf(tonal.Scale).isRequired,
    };

    render() {
        const note = tonal.note.pc(
            tonal.note.simplify(
                tonal.note.fromMidi(this.props.string.tuningKey + 8)
            )
        );;

        return (
            <Container>
                <button type="button" onClick={this.props.onDelete}>×</button>
                <Tuning>
                    <button type="button" onClick={() => this.props.string.transpose(1)}>▲</button>
                    <Note
                        note={note}
                        scale={this.props.scale}
                    />
                    <button type="button" onClick={() => this.props.string.transpose(-1)}>▼</button>
                </Tuning>
            </Container>
        );
    }
}
