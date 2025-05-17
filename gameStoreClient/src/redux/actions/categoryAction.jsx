export const load_categories=(item)=>{
    return {type:"LOAD_CATEGORIES",payload:item}
}

export const delete_category=(id)=>{
    return {type:"DELETE_CATEGORY",payload:id}
}

export const update_category=(item)=>{
    return {type:"UPDATE_CATEGORY",payload:item}
}

export const add_category=(item)=>{
    return {type:"ADD_CATEGORY",payload:item}
}