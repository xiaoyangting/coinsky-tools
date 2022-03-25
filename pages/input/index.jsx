import React, { Component, createRef } from 'react';
import PropTypes from 'prop-types';

export default class InputDemo extends Component {

    inputRef = createRef();

    isOnComposition = false;

    componentDidMount() {
        this.setInputValue();
    }

    componentDidUpdate() {
        this.setInputValue();
    }

    setInputValue = () => {
        this.inputRef.current.value = this.props.value || ''
    };

    handleComposition = evt => {
        if (evt.type === 'compositionend') {
            this.isOnComposition = false;
            return;
        }

        this.isOnComposition = true;
    };

    onChange = evt => {
        if (!this.isOnComposition) {
            this.props.onChange(evt);
        }
    };

    render() {
        const commonProps = {
            onChange: this.onChange,
            onCompositionStart: this.handleComposition,
            onCompositionUpdate: this.handleComposition,
            onCompositionEnd: this.handleComposition,
        };
        return <input
            ref={this.inputRef}
            type="text"
            {...commonProps}
        />
    }
}