import mongoose,{model, Schema } from 'mongoose';

const orderData=Schema({
    id_customer:{
        type: mongoose.Types.ObjectId,
        ref:'customerData'
    },
    dateOrder: String,
    sum: Number,
    orderGames: [
        {
            _id: {
                type: mongoose.Types.ObjectId,
                ref: 'gameData' 

            },
            amount: Number
        }
    ]
})

export default model ('orderData', orderData)