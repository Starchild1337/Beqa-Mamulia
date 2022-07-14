import React, { Component } from 'react';
import './Overlay.css'
import {connect} from 'react-redux'

class Overlay extends Component {
    render() {
        if(this.props.isMiniCartOpen) {
            return (
                <div className='Overlay' onClick={() => this.props.onCloseMiniCart()}></div>
            );
        } else {
            return null
        }
    }
}

const mapStateToProps = state => {
    return {
        isMiniCartOpen: state.isMiniCartOpen
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCloseMiniCart: () => dispatch({type: "CLOSE_MINI_CART"})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Overlay);