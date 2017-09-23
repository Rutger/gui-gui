import { observable } from 'mobx';
import { Model, Store } from 'mobx-spine';
import { omit } from 'lodash';

export class String extends Model {
    @observable tuning = null;
}

export class StringStore extends Store {
    Model = String;
}
