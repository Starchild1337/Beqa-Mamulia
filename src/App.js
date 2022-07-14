import React, { Component } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Navigation from './components/Navigation/Navigation';
import ProductList from './containers/ProductList';
import {connect} from 'react-redux'
import ProductDescription from './components/PDP/ProductDescription';
import Cart from './containers/Cart';
import './components/MiniCart.css'

const client = new ApolloClient({
    uri: 'http://localhost:4000',
    cache: new InMemoryCache( ),
});

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <ApolloProvider client={client}>
        <Navigation />
        <Switch>
          <Route path='/cart' exact>
            <Cart />
          </Route>
          <Route exact path='/'>
            <ProductList category={this.props.category} currency={this.props.currency}/>
          </Route>
          <Route path='/:id' exact>
            <ProductDescription />
          </Route>
        </Switch>
        </ApolloProvider>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    category: state.category,
    currency: state.currency
  }
}

export default connect(mapStateToProps)(App);
