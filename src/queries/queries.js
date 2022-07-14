import {gql} from '@apollo/client'

const getCategories = gql`
    {
        categories {
            name
        }
    }
`

const getCurrencies = gql`
    {
      currencies{
        label
        symbol
      }
    }
`

const getProductList = gql`
  query($input:CategoryInput){
    category(input:$input){
      products{
        name
        id
        inStock
        gallery
        prices {
          currency{
            label
            symbol
          }
          amount
        }
        brand
      }
    }
  }
`

const getProduct = gql`
  query($id: String!){
    product(id: $id){
      id
      name
      gallery
      description
      category
      attributes{
        id
        name
        type
        items{
          displayValue
          value
          id
        }
      }
      prices{
        currency{
          label
          symbol
        }
        amount
      }
      brand
    }
  }
`

export {getCategories, getProductList, getCurrencies, getProduct}