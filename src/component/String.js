import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { String as StringModel } from 'store/String';

export default class String extends Component {
    static propTypes = {
        string: PropTypes.instanceOf(StringModel).isRequired,
    };

    render() {
        return (
            <div>
                {this.props.string.tuning}
                {this.props.string.cid}
            </div>
        );
    }
}
