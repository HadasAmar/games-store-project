import gameData from '../schema/gameSchema.js'

export default {

    getAll: (req, res) => {
        gameData.find()
            .then((games) => {
                res.status(200).send(games)
            })
            .catch((err) => {
                res.status(404).send(err.message)
            })
    },

    add: (req, res) => {
        const item = new gameData(req.body)
        item.save()
            .then((item) => {
                res.status(200).send(item)
            })
            .catch((err) => {
                res.status(404).send(err.message)
            })
    },

    update: (req, res) => {
        gameData.findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then((item) => {
                res.status(200).send(item)
            })
            .catch((err) => {
                res.status(404).send(err.message)
            })
    },

    delete: (req, res) => {
        console.log("delete")
        gameData.findByIdAndDelete(req.params.id)
            .then(() => {
                res.status(200).send(true)
            })
            .catch(() => {
                res.status(404).send(false)
            })
    },

    getByCategory: (req, res) => {
        gameData.find({id_category:req.params.id})
            .then((item) => {
                res.status(200).send(item)
            })
            .catch((err) => {
                res.status(404).send(err.message)
            })
    }


}


