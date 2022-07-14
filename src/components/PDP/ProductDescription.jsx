import React, { Component } from 'react';
import { graphql } from '@apollo/client/react/hoc';
import { compose } from 'redux';
import { connect } from 'react-redux'
import {Link, withRouter} from 'react-router-dom'
import './ProductDescription.css'
import { getProduct } from '../../queries/queries'
import { Markup } from 'interweave'
import Overlay from '../Overlay/Overlay';
import Spinner from '../Spinner/Spinner';

class ProductDescription extends Component {
        state = {
            selectedSize: '',
            selectedCapacity: '',
            selectedColor: '',
            selectedImg: '',
            withUsb3Ports: '',
            touchId: '',
            quantity: 1,
            disabled: true,
        }

    componentDidUpdate() {
        if(!this.state.product) {
            this.setState({product: this.props.data.product})
        }

        if(this.state.selectedColor && this.state.selectedCapacity) {
            if(this.state.disabled) {
                this.setState({disabled: false})
            }
        }

        if(this.state.selectedCapacity && this.state.withUsb3Ports && this.state.touchId) {
            if(this.state.disabled) {
                this.setState({disabled: false})
            }
        }
    }


    handleDisableButton(att, id) {
        if(att === 'selectedSize') {
            this.setState({[att]: id, disabled: false})
        } 

        this.setState({[att]: id})

 
        if(att === 'empty') {
                this.setState({disabled: false})
        }
    }

    handleItemAttributes() {
        const attributes = this.props.data.product.attributes
        if(attributes.length === 1) {
            return (
                    <div className='PDP__description-size'>
                        <h5>Size:</h5>
                        <div className='PDP__description-sizes'>
                            {attributes.map(att => {
                                return att.items.map(item => {
                                    return <span key={item.id} className={this.state.selectedSize === item.id ? 'PDP__size-box selected' : 'PDP__size-box'} onClick={() => this.handleDisableButton('selectedSize', item.id)}>{item.value}</span>
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
                <div className="PDP__description-colors">
                    <h5>Color:</h5>
                    <div className='PDP__color-boxes'>
                        {swatch.items.map(item => {
                                return <span key={item.id} className={this.state.selectedColor === item.id ? 'PDP__color-box selected' : 'PDP__color-box'}style={{backgroundColor: item.value}} onClick={() => this.handleDisableButton('selectedColor', item.id)}></span>
                        })}
                    </div>
                </div>
                <div className="PDP__description-capacity">
                        <h5>Capacity: </h5>
                        <div className='PDP__capacity-boxes'>
                        {text.items.map(item => {
                            return <span key={item.id} className={this.state.selectedCapacity === item.id ? "PDP__capacity-box selected" : "PDP__capacity-box"} onClick={() => this.handleDisableButton('selectedCapacity', item.id)}>{item.value}</span>
                        })}
                        </div>
                </div>
                </>
            )
        } else if(attributes.length === 3) {
            return (
                <>
                <div className="PDP__description-capacity">
                        <h5>Capacity: </h5>
                        <div className='PDP__capacity-boxes'>
                        {attributes[0].items.map(item => {
                            return <span key={item.id} className={this.state.selectedCapacity === item.id ? "PDP__capacity-box selected" : "PDP__capacity-box"} onClick={() => this.handleDisableButton('selectedCapacity', item.id)}>{item.value}</span>
                        })}
                        </div>
                </div>
                <div className="PDP__description-capacity">
                        <h5>With usb 3 ports: </h5>
                        <div className='PDP__capacity-boxes'>
                        {attributes[1].items.map(item => {
                            return <span key={item.id} className={this.state.withUsb3Ports === item.id ? "PDP__capacity-box selected" : "PDP__capacity-box"} onClick={() => this.handleDisableButton('withUsb3Ports', item.id)}>{item.value}</span>
                        })}
                        </div>
                </div>
                <div className="PDP__description-capacity">
                        <h5>Touch id in keyboard: </h5>
                        <div className='PDP__capacity-boxes'>
                        {attributes[2].items.map(item => {
                            return <span key={item.id} className={this.state.touchId === item.id ? "PDP__capacity-box selected" : "PDP__capacity-box"} onClick={() => this.handleDisableButton('touchId', item.id)}>{item.value}</span>
                        })}
                        </div>
                </div>
                </>
            )
        } else {
            if(this.state.disabled) {
                return this.handleDisableButton('empty')
            }
        }
    }

    render() {
        const data = this.props.data;
        const price = data.product && data.product.prices.find(p => p.currency.label === this.props.currency)
        console.log(data);
        if(this.state.selectedImg === '') {
            data.product && this.setState({selectedImg: data.product.gallery[0]})
        }
        if(data.loading) {
            return <Spinner loading={data.loading} />
        }

        if(data.product) {
            return (
            <section className='PDP'>
                <Overlay />
                <div className='PDP__images'>
                    {data.product.gallery.map((image, index) => {
                        return <img src={image} alt='item' key={index} onClick={() => this.setState({selectedImg: image})} />
                    })}
                </div>
                
                <main className='PDP__image-main'>
                    <img src={this.state.selectedImg} alt="shirt" />
                </main>

                <aside className='PDP__description'>
                    <div className='PDP__description-name'>
                    <h2>{data.product.brand}</h2>
                    <h3>{data.product.name}</h3>
                    </div>
                    {this.handleItemAttributes()}
                    <div className="PDP__description-price">
                        <h5>Price:</h5>
                        <h4>{price.currency.symbol + " " + price.amount}</h4>
                    </div>
                    <Link to='/cart'>
                        <button className='btn btn-description' disabled={this.state.disabled} onClick={() => this.props.onHandleCart({...this.state, prices: this.state.product.prices})}>add to cart</button>
                    </Link>
                    <div className='PDP__description-description'>
                        <Markup content={data.product.description} />
                    </div>
                </aside>
            </section>
        );
        }
       
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
        onHandleCart: (product) => dispatch({type: 'ADD_TO_CART', payload: product})
    }
}

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
    graphql(getProduct, {
        options: props => ({
            variables: {
                    id: props.match.params.id
            }
        })
    }),
)(ProductDescription)