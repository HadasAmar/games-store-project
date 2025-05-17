import {model, Schema } from 'mongoose';

const categoryData=Schema({
    name: String
})

export default model ('categoryData', categoryData)