import mongoose,{model, Schema } from 'mongoose';

const gameData=Schema({
    name:String,
    id_category:{
        type: mongoose.Types.ObjectId,
        ref:'categoryData'
    },
    price: Number,
    img: String, 
    quantity: Number
})

export default model ('gameData', gameData)