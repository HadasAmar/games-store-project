import axios from "axios"


const url="http://localhost:8080/games"

export const getAllGames=()=>{

    return axios.get(`${url}`)
}

export const addGame = (item) => {
    
    return axios.post(`${url}/`, item);
}

export const deleteGame = (id) => {
    
    return axios.delete(`${url}/${id}/`);
};

export const updateGame = (item, id) => {
    
    return axios.put(`${url}/${id}`, item);
};