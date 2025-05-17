import { Schema , model} from "mongoose";

const customerData=Schema({
    name: String,
    password: String,
    cardNumber: String,
    cardExpiration: String,
    cardCVV: String,
    cardHolder: String
})

export default model ('customerData', customerData)