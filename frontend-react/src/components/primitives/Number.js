import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {FormControl, InputLabel, Input} from '@mui/material';
import './primitives.css'

class Number extends Component {
    
    render() {
        return (
            <div className="number-width-100">
                {this.props.editMode?
                <div className="number-width-100">
                    <FormControl className="number-width-100" variant="standard">
                        <InputLabel htmlFor="component-simple">{this.props.label}</InputLabel>
                        <Input className="number-width-100" name={this.props.name?this.props.name:""} value={this.props.value} onChange={this.props.onChange} />
                    </FormControl>
                </div>
                :(`${this.props.label} : ${this.props.value}`)}
            </div>
        );
    }
}

Number.defaultProps = {
    editMode: false,
    label: "",
    value: 0
}
Number.propTypes = {
    editMode: PropTypes.bool,
    name: PropTypes.string,
    label : PropTypes.string,
    value : PropTypes.number
};


export default Number;