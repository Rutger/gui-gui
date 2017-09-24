import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Fretboard from './Fretboard';

@observer
export default class App extends Component {
    render() {
        return (
            <div>
                <Fretboard />
            </div>
        );
    }
}
