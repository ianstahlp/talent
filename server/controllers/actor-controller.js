const Actor = require('../models/actor-model');

createActor = (req, res) => {
    const body = req.body;

    if(!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide an actor',
        });
    };

    const actor = new Actor(body);

    if(!actor) {
        return res.status(400).json({success: false, error: err});
    };

    actor
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: actor._id,
                message: 'Actor added.',
            });
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Actor not created!',
            });
        });
};

updateActor = async (req, res) => {
    const body = req.body;

    if(!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        });
    }

    Actor.findOne({_id: req.params.id}, (err, actor) => {
        if(err) {
            return res.status(404).json({
                err,
                message: 'Actor not found.',
            });
        };
        actor.first_name = body.first_name;
        actor.last_name = body.last_name;
        actor.middle_name = body.middle_name;
        actor.headshot = body.headshot;
        actor
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: actor._id,
                    message: 'Actor information updated.',
                });
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Actor information not updated!',
                });
            });
    });
};

deleteActor = async (req, res) => {
    await Actor.findOneAndDelete({_id: req.params.id}, (err, actor) => {
        if(err) {
            return res.status(400).json({success: false, error: err});
        };

        if(!actor) {
            return res
                .status(404)
                .json({success: false, error: 'Actor not found'});
        };

        return res.status(200).json({success: true, data: actor})
    }).catch(err => console.log(err));
};
getActorById = async (req, res) => {
    await Actor.findOne({_id: req.params.id}, (err, actor) => {
        if(err) {
            return res.status(400).json({success: false, error: err});
        };

        if(!actor) {
            return res
                .status(404)
                .json({success: false, error: 'Actor not found'});
        }
        return res.status(200).json({success: true, data: actor});
    }).catch(err => console.log(err));
};

getAllActors = async (req, res) => {
    await Actor.find({}, (err, actors) => {
        if(err) {
            return res.status(400).json({success: false, error: err});
        };
        if(!actors.length) {
            return res
                .status(404)
                .json({success: false, error: 'Actors not found'});
        };
        return res.status(200).json({success: true, data: actors});
    }).catch(err => console.log(err));
};

module.exports = {
    createActor,
    updateActor,
    deleteActor,
    getActorById,
    getAllActors,
};