import React, { Component } from 'react';
import { observer } from 'mobx-react';
import String from '../component/String';
import { String as StringModel, StringStore } from '../store/String';

@observer
export default class Fretboard extends Component {
    componentWillMount() {
        this.stringStore = new StringStore();

        const strings = [8, 3, 11, 6, 1, 8];
        strings.forEach(this.addString);
    }

    addString = (tuningKey) => {
        const string = new StringModel({
            tuningKey: tuningKey || null,
        });

        this.stringStore.add(string.toJS());
    }

    render() {
        return (
            <div>
                <button onClick={() => this.addString()} type="button">+</button>
                <div>
                    {this.stringStore.map(string =>
                        <String key={string.cid} string={string} />
                    )}
                </div>
            </div>
        );
    }
}
