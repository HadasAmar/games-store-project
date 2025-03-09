import axios from "axios"


const url="http://localhost:8080/customers"

export const getAllCustomers=()=>{

    return axios.get(`${url}`)
}

export const addCustomer=(item)=>{

    return axios.post(`${url}/`,item)
}