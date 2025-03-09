export const load_games=(item)=>{
    return {type:"LOAD_GAMES",payload:item}
}

export const add_game=(item)=>{
    return {type:"ADD_GAME",payload:item}
}

export const delete_game=(id)=>{
    return {type:"DELETE_GAME",payload:id}
}

export const update_game=(item)=>{
    return {type:"UPDATE_GAME",payload:item}
}
