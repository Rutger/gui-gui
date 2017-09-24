import React, { Component } from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { String as StringModel } from 'store/String';
import teoria from 'teoria';
import styled from 'styled-components';

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
    };

    render() {
        const note = teoria.note.fromKey(this.props.string.tuningKey);

        return (
            <Container>
                <button type="button" onClick={this.props.onDelete}>×</button>
                <Tuning>
                    <button type="button" onClick={() => this.props.string.transpose(1)}>▲</button>
                    <div>{note.toString(true)}</div>
                    <button type="button" onClick={() => this.props.string.transpose(-1)}>▼</button>
                </Tuning>
            </Container>
        );
    }
}
