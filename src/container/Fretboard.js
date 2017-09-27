import React, { Component } from 'react';
import { PropTypes as MobXTypes } from 'mobx-react';
import { observer } from 'mobx-react';
import String from '../component/String';
import Inlay from '../component/Inlay';
import { String as StringModel, StringStore } from '../store/String';
import styled from 'styled-components';

const Container = styled.div`
    overflow-x: auto;
`;

@observer
export default class Fretboard extends Component {
    static propTypes = {
        scale: MobXTypes.arrayOrObservableArray.isRequired,
    };

    componentWillMount() {
        this.stringStore = new StringStore();

        const strings = [8, 3, 11, 6, 1, 8];
        strings.forEach(this.addString);
    }

    addString = (tuningKey) => {
        const string = new StringModel({
            tuningKey: tuningKey || 1,
        });

        this.stringStore.add(string.toJS());
    }

    render() {
        return (
            <Container>
                <div>
                    <Inlay />
                    {this.stringStore.map(string =>
                        <String key={string.cid} string={string} stringStore={this.stringStore} scale={this.props.scale} />
                    )}
                    <Inlay>
                        <button onClick={() => this.addString()} type="button">+</button>
                    </Inlay>
                </div>
            </Container>
        );
    }
}
