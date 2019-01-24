const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'ece92e41d2384bc8b44eee39620eab9d'
});

const handleApiCall = (req, res) => {
    app.models
        .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
        .then(data => {
        res.json(data);
        })
        .catch(err => res.status(400).json('Unable to work with API'));
}
const handleImage = (db) => (req, res) => {
    const { id } = req.body;
    db('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
        res.json(entries[0]);
    })
    .catch(err => res.status(400).json('Unable tod get entrises'));
};

module.exports = {
    handleImage,
    handleApiCall
}