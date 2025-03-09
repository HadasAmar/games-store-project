import customerData from "../schema/customerSchema.js"

export default {

    getAll: (req, res) => {
        customerData.find()
            .then((item) => {
                res.status(200).send(item)
            })
            .catch((err) => {
                res.status(404).send(err.message)
            })
    },

    add: (req, res) => {
        console.log("try to add")
        const item = new customerData(req.body)
        item.save()
            .then((item) => {
                res.status(200).send(item)
            })
            .catch((err) => {
                res.status(404).send(err.message)
            })
    },

    update: (req, res) => {
        customerData.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then((item) => {
                res.status(200).send(item)
            })
            .catch((err) => {
                res.status(404).send(err.message)
            })
    },

    getByNameAndPassword: (req, res) => {
        console.log("Received request with name:", req.params.name, "and password:", req.params.pass);  // הדפס את הערכים
        customerData.findOne({ name: req.params.name, password: req.params.pass })
            .then((item) => {
                console.log("found ", item)
                res.status(200).send(item)
            })
            .catch((err) => {
                res.status(404).send(err.message)
            })
    }
    
}