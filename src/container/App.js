import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import Fretboard from './Fretboard';
import ScaleSelector from './ScaleSelector';
import tonal from 'tonal';

@observer
export default class App extends Component {
    @observable scale = tonal.scale.get('major', 'a');

    setScale = (scale, tonic) => {
        this.scale = tonal.scale.get(scale, tonic);
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
