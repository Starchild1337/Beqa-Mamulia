import React, { Component } from 'react';
import {connect} from 'react-redux'
import left from '../images/arrow-left.svg'
import right from '../images/arrow-right.svg'

class CartItem extends Component {
    state = {
        ...this.props,
        imgCount: 0
    }

        handleItemAttributes() {
        const attributes = this.props.product.attributes
        const mini = this.props.isMiniCartOpen ? "mini" : ''
        if(attributes.length === 1) {
            return (
                    <div className={`PDP__description-size ${mini}`}>
                        <h5>Size:</h5>
                        <div className={`PDP__description-sizes ${mini}`}>
                            {attributes.map(att => {
                                return att.items.map(item => {
                                    return <span key={item.id} className={this.state.selectedSize === item.id ? `PDP__size-box ${mini} selected` : `PDP__size-box ${mini}`} onClick={() => this.setState({selectedSize: item.id})}>{item.value}</span>
                                })
                            })}
                        </div>
                        </div>
            )
        } else if (attributes.length === 2) {
            const swatch = attributes.find(attr => attr.type === "swatch")
            const text = attributes.find(attr => attr.type === "text")
            return (
                <>
                <div className={`PDP__description-colors ${mini}`}>
                    <h5>Color:</h5>
                    <div className={`PDP__color-boxes ${mini}`}>
                        {swatch.items.map(item => {
                                return <span key={item.id} className={this.state.selectedColor === item.id ? `PDP__color-box ${mini} selected` : `PDP__color-box ${mini}`} style={{backgroundColor: item.value}} onClick={() => this.setState({selectedColor: item.id})}></span>
                        })}
                    </div>
                </div>
                <div className={`PDP__description-capacity ${mini}`}>
                        <h5>Capacity: </h5>
                        <div className={`PDP__capacity-boxes ${mini}`}>
                        {text.items.map(item => {
                            return <span key={item.id} className={this.state.selectedCapacity === item.id ? `PDP__capacity-box ${mini} selected` : `PDP__capacity-box ${mini}`} onClick={() => this.setState({selectedCapacity: item.id})}>{item.value}</span>
                        })}
                        </div>
                </div>
                </>
            )
        } else if(attributes.length === 3) {
            return (
                <>
                <div className={`PDP__description-capacity ${mini}`}>
                        <h5>Capacity: </h5>
                        <div className={`PDP__capacity-boxes ${mini}`}>
                        {attributes[0].items.map(item => {
                            return <span key={item.id} className={this.state.selectedCapacity === item.id ? `PDP__capacity-box ${mini} selected` : `PDP__capacity-box ${mini}`} onClick={() => this.setState({selectedCapacity: item.id})}>{item.value}</span>
                        })}
                        </div>
                </div>
                <div className={`PDP__description-capacity ${mini}`}>
                        <h5>With usb 3 ports: </h5>
                        <div className={`PDP__capacity-boxes ${mini}`}>
                        {attributes[1].items.map(item => {
                            return <span key={item.id} className={this.state.withUsb3Ports === item.id ? `PDP__capacity-box ${mini} selected` : `PDP__capacity-box ${mini}`} onClick={() => this.setState({withUsb3Ports: item.id})}>{item.value}</span>
                        })}
                        </div>
                </div>
                <div className={`PDP__description-capacity ${mini}`}>
                        <h5>Touch id in keyboard: </h5>
                        <div className={`PDP__capacity-boxes ${mini}`}>
                        {attributes[2].items.map(item => {
                            return <span key={item.id} className={this.state.touchId === item.id ? `PDP__capacity-box ${mini} selected` : `PDP__capacity-box ${mini}`} onClick={() => this.setState({touchId: item.id})}>{item.value}</span>
                        })}
                        </div>
                </div>
                </>
            )
        } else {
            return null
        }
    }

    handleImage(type) {
        if(type === 'INCREMENT') {
            this.setState({imgCount: this.state.imgCount + 1})
            if(this.state.imgCount === this.props.product.gallery.length - 1) {
                this.setState({imgCount: 0})
            }
        }
        if(type === 'DECREMENT') {
            this.setState({imgCount: this.state.imgCount - 1})
            if(this.state.imgCount === 0) {
                this.setState({imgCount: this.props.product.gallery.length - 1})
            }
        }
    }

    render() {
        const {quantity, currency, prices} = this.props
        const {brand, name, gallery, id} = this.props.product
        const mini = this.props.isMiniCartOpen ? "mini" : ''
        const price = prices.find(p => p.currency.label === currency)

        return (
                <div className={`cart__item ${mini}`}>
                    <div className={`cart__item-description ${mini}`}>
                    <div className={`cart__item-name ${mini}`}>
                        <h2>{brand}</h2>
                        <h3>{name}</h3>
                    </div>
                    <div className={`cart__item-price ${mini}`}>
                        <h4>{price.currency.symbol + " " + price.amount}</h4>
                    </div>
                    {this.handleItemAttributes()}
                    </div>
                    <div className={`cart__item-buttons ${mini}`}>
                        <button className={`button-increment ${mini}`} onClick={() => this.props.onIncreaseQuantity(id)}>+</button>
                        <h3 className='item-quantity'>{quantity}</h3>
                        <button className={`button-decrement ${mini}`} onClick={() => this.props.onDecreaseQuantity({id, price: price.amount})}>-</button>
                    </div>
                    <div className={`cart__item-image ${mini}`}>
                        {gallery.length > 1 && <div className="image-buttons">
                            <button className="image-button" onClick={() => this.handleImage('DECREMENT')}>
                                <img src={left} alt="left" />
                            </button>
                            <button className="image-button" onClick={() => this.handleImage('INCREMENT')}>
                                <img src={right} alt="right" />
                            </button>
                        </div>}
                        <img src={gallery[this.state.imgCount]} alt="shirt" />
                    </div>
                </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        currency: state.currency,
        isMiniCartOpen: state.isMiniCartOpen
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIncreaseQuantity: (id) => dispatch({type: "INCREASE_QUANTITY", payload: id}),
        onDecreaseQuantity: (payload) => dispatch({type: "DECREASE_QUANTITY", payload: payload})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartItem);