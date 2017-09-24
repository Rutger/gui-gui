import { observable, action } from 'mobx';
import { Model, Store } from 'mobx-spine';
import { intervalFromSemitones } from '../helpers';

export class String extends Model {
    @observable tuningKey = null;

    @action
    transpose = semitones => {
        this.tuningKey += semitones;
    };
}

export class StringStore extends Store {
    Model = String;
}
