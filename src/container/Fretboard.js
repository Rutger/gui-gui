import React, { Component } from 'react';
import String from '../component/String';
import { String as StringModel, StringStore } from '../store/String';
import tonal from 'tonal';
import teoria from 'teoria';

export default class Fretboard extends Component {
    componentWillMount() {
        this.stringStore = new StringStore();
    }

    addString = () => {
        const string = new StringModel({
            tuning: teoria.note.fromKey(1),
        });
        this.stringStore.add(string.toJS());

        // TODO: Find out why this doesn't work otherwise.
        this.forceUpdate();
    }

    render() {
        return (
            <div>
                <button onClick={this.addString} type="button">+</button>
                <div>
                    {this.stringStore.map(string =>
                        <String key={string.cid} string={string} />
                    )}
                </div>
            </div>
        );
    }
}
