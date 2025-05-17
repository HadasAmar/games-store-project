import { produce } from 'immer'

export const customers = {
    listCustomers: [
       
    ],

    currentUser: { name: "לא מחובר" }
}

export const dataCustomerReducer = produce((state, action) => {
    switch (action.type) {
        case "ADD_CUSTOMER":
            state.listCustomers.push(action.payload);
            return; 

        case "UPDATE_USER":
            state.currentUser = action.payload;
            return; 

        case "LOAD_CUSTOMERS":
            state.listCustomers = action.payload

        default:
            break;
    }
}, customers);
