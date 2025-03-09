import { produce } from 'immer'

export const catgories = {
    listCategories: [
        // { id: 10, name: "משחקי חצר" },
        // { id: 11, name: "לתינוקים" },
        // { id: 12, name: "מכוניות צעצוע" },
    ]
}

export const dataCategoryReducer = produce((state, action) => {
    switch (action.type) {
        case "ADD_CATEGORY":
            state.listCategories.push(action.payload); break;

        case "UPDATE_CATEGORY": {
            const index = state.listCategories.findIndex(category => category._id == action.payload._id);
                state.listCategories[index] = { ...state.listCategories[index], ...action.payload };
            console.log("name",state.listCategories[index].name);
            break;
        }

        case "DELETE_CATEGORY": {
            const index = state.listCategories.findIndex(category => category._id === action.payload);
            state.listCategories.splice(index, 1);

            break;
        }

        case "LOAD_CATEGORIES":
            state.listCategories = action.payload
        default:
            break;
    }
}, catgories)