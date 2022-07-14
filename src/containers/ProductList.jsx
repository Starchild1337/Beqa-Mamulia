import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import './PLP.css'
import { graphql } from '@apollo/client/react/hoc';
import {getProductList} from '../queries/queries'
import Product from '../components/Product/Product';
import Overlay from '../components/Overlay/Overlay';
import Spinner from '../components/Spinner/Spinner';

class ProductList extends Component {

    handleLink(e, inStock) {
        if(!inStock) {
            e.preventDefault()
        }
    }
    
    render() {
            const data = this.props.data.category && this.props.data.category.products;
            const products = data && data.map(item => {
                const price = item.prices.find(p => p.currency.label === this.props.currency)
                return {...item, price: price}
            })

            if(this.props.data.loading) {
                return <Spinner loading={this.props.data.loading}/>
            }

            if(this.props.data.category.products) {
                return (
                    <section className='PLP'>
                        <Overlay />
                        <h2 className='PLP__category'>{this.props.category}</h2>
                        <div className="PLP__items">
                            {products.map(product => {
                                return (
                                    <Link className={!product.inStock ? 'PLP__items-link disabled' : 'PLP__items-link'} onClick={(e) => this.handleLink(e, product.inStock)} to={{
                                        pathname: '/' + product.id,
                                    }}key={product.id}>
                                        <Product {...product}/>
                                    </Link>
                                )
                            })}
                        </div>
                    </section>
                );
            }

    }
}

export default graphql(getProductList, {
        options: props => ({
            variables: {
                input: {
                    title: props.category
                }
            }
            })
        })(ProductList)