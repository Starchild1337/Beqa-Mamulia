import React, { Component } from 'react';
import './Product.css'
import cart from '../../images/cart-circle.svg'

class Product extends Component {
    state = {
        hoverState: false
    }

    render() {
        const {gallery, inStock, name, price} = this.props

        return (
                <div className="PLP__items-item" onMouseEnter={() => this.setState({hoverState: true})} onMouseLeave={() => this.setState({hoverState: false})} >
                    {<img src={gallery[0]} alt="shirt" className="PLP__item-img"/>}
                        {this.state.hoverState && 
                            <img src={cart} alt="cart" className='PLP__item-cart_btn'/>
                        }
                    {!inStock && <span className='PLP__item-sold-out'>Out of stock</span>}
                    <div className="PLP__item-desc">
                        <p className="PLP__item-name">{name}</p>
                        <span className='PLP__item-price'>{price.currency.symbol + " " + price.amount}</span>
                    </div>
                </div>
        );
    }
}

export default Product;