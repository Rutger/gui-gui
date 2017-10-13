import { observable, action } from 'mobx';
import { Model } from 'mobx-spine';

export class String extends Model {
    @observable tuningKey = null;

    @action
    transpose = semitones => {
        this.tuningKey = (((this.tuningKey + semitones) % 12) + 12) % 12;
    };
}
