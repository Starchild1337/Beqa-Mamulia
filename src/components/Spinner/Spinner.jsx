import React, { Component } from 'react';
import './Spinner.css'
import BeatLoader from "react-spinners/BeatLoader";

class Spinner extends Component {
    render() {
        return (
            <div className='Spinner'>
                <BeatLoader color={'#9B9B9B'} loading={this.props.loading} size={12} />
            </div>
        );
    }
}

export default Spinner;