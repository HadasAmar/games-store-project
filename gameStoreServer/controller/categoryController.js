import categoryData from '../schema/categorySchema.js'

export default {
    getAll: (req, res) => {
        categoryData.find()
            .then((categories) => {
                res.status(200).send(categories)
            })
            .catch((err) => {
                res.status(404).send(err.message)
            })
    },

    add: (req, res) => {
        const item = new categoryData(req.body)
        item.save()
            .then((item) => {
                res.status(200).send(item)
            })
            .catch((err) => {
                res.status(404).send(err.message)
            })
    },

    update: (req, res) => {
        console.log("update")
        categoryData.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then((item) => {
                res.status(200).send(item)
            })
            .catch((err) => {
                res.status(404).send(err.message)
            })
    },

    delete: (req, res) => {
        console.log("delete")
        categoryData.findByIdAndDelete(req.params.id)
            .then(() => {
                res.status(200).send(true)
            })
            .catch(() => {
                res.status(404).send(false)
            })
    }
}