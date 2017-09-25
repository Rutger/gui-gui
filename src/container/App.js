import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import Fretboard from './Fretboard';
import ScaleSelector from './ScaleSelector';
import teoria from 'teoria';

@observer
export default class App extends Component {
    @observable scale = teoria.scale(
        teoria.note('a'),
        'major',
    );

    setScale = (tonic, scale) => {
        this.scale = teoria.scale(tonic, scale);
    }

    render() {
        return (
            <div>
                <ScaleSelector scale={this.scale} setScale={this.setScale} />
                <Fretboard scale={this.scale} />
            </div>
        );
    }
}
