import { produce } from 'immer'

export const cart = {
    cartItems: [],
    orders: []
}

export const dataCartReducer = produce((state, action) => {
    switch (action.type) {
        case "ADD_ITEM":
            const index = state.cartItems.findIndex((x) => x._id == action.payload._id)
            if (index != -1)
                state.cartItems[index].amount++
            else
                state.cartItems.push(action.payload);
            break;

        case "REMOVE_ITEM":
            state.cartItems = state.cartItems.filter(x => x._id != action.payload);

        case "CLEAR_CART":
            state.cartItems = [];

        case "ADD_ORDER":
            state.orders.push(action.payload);
            break;

        case "LOAD_ORDERS":
            state.orders = action.payload

        case "SET_AMOUNT":
            const i = state.cartItems.findIndex((x) => x._id == action.payload.id)
            if (action.payload.amount > 0)
                state.cartItems[i].amount = action.payload.amount
            else
                state.cartItems = state.cartItems.filter(x => x._id != action.payload.id);
            break;

        default:
            break;
    }
}, cart)
