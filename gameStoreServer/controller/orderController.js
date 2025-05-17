import orderData from '../schema/orderSchema.js'

export default {

    getAll: (req, res) => {
        orderData.find()
            .then((orders) => {
                res.status(200).send(orders)
            })
            .catch((err) => {
                res.status(404).send(err.message)
            })
    },

    getByOrder: (req, res) => {
        orderData.find({ id_order: req.params.id })
            .then((item) => {
                res.status(200).send(item)
            })
            .catch((err) => {
                res.status(404).send(err.message)
            })
    },

    getByUser: (req, res) => {
        orderData.find({ id_customer: req.params.id })
        .populate('orderGames._id') // אכלוס מידע של המשחקים

            .then((item) => {
                res.status(200).send(item)
            })
            .catch((err) => {
                res.status(404).send(err.message)
            })
    },

    createOrder: (req, res) => {
        const { id_customer, orderGames, sum } = req.body;

        const newOrder = new orderData({
            id_customer,
            dateOrder: new Date(),
            sum,
            orderGames 
        });

        newOrder.save()
            .then((savedOrder) => {
                res.status(201).send(savedOrder); 
            })
            .catch((err) => {
                console.log(err.message)
                res.status(500).send(err.message); 
            });
    },

    delete: (req, res) => {
            console.log("delete")
            orderData.findByIdAndDelete(req.params.id)
                .then(() => {
                    res.status(200).send(true)
                })
                .catch(() => {
                    res.status(404).send(false)
                })
        },

}


