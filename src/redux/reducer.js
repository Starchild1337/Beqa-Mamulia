const initialState = {
    category: "all",
    currency: "USD",
    products: [],
    totalPrice: 0,
    totalQuantity: 0,
    tax: 0,
    isMiniCartOpen: false
}

const reducer = (state = initialState, action) => {
    const calcTotal = () => {
        const prices = state.products.map(product => {
            return product.prices.find(p => p.currency.label === state.currency)
        })

        const totalPrice = prices.reduce((total, item) => {
            total += item.amount
            return total
        }, 0)

        const tax = totalPrice * 21 / 100
        const taxedPrice = totalPrice + tax

        const totalQuantity = state.products.reduce((total, item) => {
            total += item.quantity
            return total
        }, 0)

        return {
            totalPrice: parseFloat(taxedPrice.toFixed(2)),
            totalQuantity: totalQuantity,
            tax: parseFloat(tax.toFixed(2))
        }
    }


    const {type, payload} = action
    switch (type) {
        case "SWITCH_CATEGORY":
            return {
                ...state,
                category: payload
            }
        case "SWITCH_CURRENCY":
            return {
                ...state,
                currency: payload
            }
        case "ADD_TO_CART":
            return {
                ...state,
                products: [...state.products, payload]
            }
        case "INCREASE_QUANTITY":
            return {
                ...state,
                products: state.products.map(product => {
                    if(product.product.id === payload) {      
                        const originalPrices = product.product.prices.map(p => p)
                            const prices = product.prices.map((p,i) => {
                                let amount = p.amount + originalPrices[i].amount
                                amount = parseFloat(amount.toFixed(2))
                                const newPrice = {...p, amount}
                                return newPrice
                            })
                        return {...product, quantity: product.quantity + 1, prices}
                    } else {
                        return product
                    }
                })
            }
        case "DECREASE_QUANTITY":
            return {
                ...state,
                products: state.products.map(product => {
                    if(product.product.id === payload.id && product.quantity > 1) {   
                        const originalPrices = product.product.prices.map(p => p)
                        const prices = product.prices.map((p,i) => {
                                let amount = p.amount - originalPrices[i].amount
                                amount = parseFloat(amount.toFixed(2))
                                const newPrice = {...p, amount}
                                return newPrice
                            })
                        return {...product, quantity: product.quantity - 1, prices}
                    } else {
                        return product
                    }
                })
            }
            case "GET_TOTAL":
                return {
                    ...state,
                    totalPrice: calcTotal().totalPrice,
                    totalQuantity: calcTotal().totalQuantity,
                    tax: calcTotal().tax
                }
            case "ORDER_PRODUCTS":
                return {
                    ...state,
                    products: [],
                    totalPrice: 0,
                    totalQuantity: 0,
                    tax: 0,
                    isMiniCartOpen: false
                }
            case "TOGGLE_MINI_CART":
                return {
                    ...state,
                    isMiniCartOpen: !state.isMiniCartOpen
                }
            case "CLOSE_MINI_CART":
                return {
                    ...state,
                    isMiniCartOpen: false
                }
        default:
            return state
    }
}

export default reducer