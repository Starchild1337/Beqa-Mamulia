import React, { Component } from 'react';
import './Cart.css'
import { connect } from 'react-redux'
import { compose } from 'redux';
import { Link, withRouter } from 'react-router-dom';
import CartItem from '../components/CartItem';

class Cart extends Component {
    state = {
        
    }

    componentDidMount() {   
        this.props.onCalcTotal()
    }

    componentDidUpdate() {
        this.props.onCalcTotal()
    }

    render() {
        const products = this.props.products
        const prices = products.length > 0 && products.map(item => {
            const price = item.prices.find(p => p.currency.label === this.props.currency)
            return price
        })
        const isMiniCartOpen = this.props.isMiniCartOpen
        const mini = isMiniCartOpen ? 'mini': ''
        const symbol = products.length > 0 && prices[0].currency.symbol

        return (
            <>
            {!isMiniCartOpen && <h2 className='PLP__category'>Cart</h2>}
            <section className='cart'>
                {products.map(product => {
                    return <CartItem key={product.product.id} {...product} />
                })}
            {this.props.products.length > 0 && <div className={`total ${mini}`}>
                <h4>Tax 21%: <span>{this.props.tax + (" ") + symbol}</span></h4>
                <h4>Quantity: <span>{this.props.totalQuantity}</span></h4>
                <h4>Total: <span>{this.props.totalPrice + (" ") + symbol}</span></h4>
                {!isMiniCartOpen && 
                <Link to='/' className='mini_cart_link'>
                    <button className="btn btn-order" onClick={() => this.props.onOrderProducts()}>order</button>
                </Link>}
                {isMiniCartOpen &&
                <div className="mini_cart_buttons">
                <Link to='/cart' className='mini_cart_link'>
                    <button className="btn btn-view_bag" onClick={() => this.props.onToggleMiniCart()}>view bag</button>
                </Link>
                <Link to='/' className='mini_cart_link'>
                    <button className="btn btn-order mini" onClick={() => this.props.onOrderProducts()}>check out</button>
                </Link>
                </div>
                }
            </div>}
            </section>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        products: state.products,
        currency: state.currency,
        totalPrice: state.totalPrice,
        totalQuantity: state.totalQuantity,
        tax: state.tax,
        isMiniCartOpen: state.isMiniCartOpen
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCalcTotal: () => dispatch({type: "GET_TOTAL"}),
        onToggleMiniCart: () => dispatch({type: "TOGGLE_MINI_CART"}),
        onOrderProducts: () => dispatch({type: "ORDER_PRODUCTS"})
    }
}

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withRouter
    )(Cart);