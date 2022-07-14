import React, { Component } from 'react';
import './Navigation.css'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { getCategories, getCurrencies } from '../../queries/queries'
import { graphql } from '@apollo/client/react/hoc';
import logo from '../../images/logo.svg'
import cart from '../../images/cart.svg'
import { Link, withRouter } from 'react-router-dom';
import Cart from '../../containers/Cart';

class Navigation extends Component {

    render() {
        const categories = this.props.getCategories.categories
        const currencies = this.props.getCurrencies.currencies;

        const items = this.props.products.length < 2 ? 'item' : 'items'
        const path = this.props.location.pathname === '/cart' ? true : false;

        return (
            <nav className='nav'>
                {this.props.isMiniCartOpen && <div className="mini-cart">
                    <p>My bag: <span>{this.props.quantity} {items}</span></p>
                    <Cart />
                </div>}
                <ul className="nav__links">
                    {categories && categories.map(cat => {
                        return <li className={cat.name === this.props.category ? 'nav__links-link active' : 'nav__links-link'} key={cat.name} onClick={() => this.props.onSwitchCategory(cat.name)}>{cat.name}</li>
                    })}
                </ul>
                <div className="logo">
                    <Link to={'/'}>
                    <img src={logo} alt="logo" />
                    </Link>
                </div>
                <div className="nav__icons">
                    <div className="nav__icons-select">
                        <select onChange={(e) => this.props.onSwitchCurrency(e.target.value)} className="nav__select">
                            {currencies && currencies.map(cur => {
                                return <option key={cur.label} value={cur.label}>{cur.symbol + (" ") + cur.label}</option>
                            })}
                        </select>
                    </div>
                    {!path && <div className="nav__icons-cart" onClick={() => this.props.onToggleMiniCart()}>
                        <img src={cart} alt="cart" />
                        {this.props.quantity > 0 && <div className="cart-quantity">
                            <span>{this.props.quantity}</span>
                        </div>}
                    </div>}
                </div>
            </nav>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSwitchCategory: (name) => dispatch({type: "SWITCH_CATEGORY", payload: name}),
        onSwitchCurrency: (currency) => dispatch({type: "SWITCH_CURRENCY", payload: currency}),
        onToggleMiniCart: () => dispatch({type: "TOGGLE_MINI_CART"})
    }
}

const mapStateToProps = state => {
    return {
        category: state.category,
        currency: state.currency,
        quantity: state.totalQuantity,
        products: state.products,
        isMiniCartOpen: state.isMiniCartOpen
    }
}

export default compose(
    graphql(getCategories, {
        name: 'getCategories'
    }),
    graphql(getCurrencies, {
        name: 'getCurrencies'
    }),
    connect(mapStateToProps, mapDispatchToProps),
    withRouter
)(Navigation)
