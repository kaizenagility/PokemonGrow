const Pokemon = require('../models/pokemon');

const pokemonsController = {};

pokemonsController.index = (req, res) => {
    Pokemon.findAll()
        .then(pokemons => {
            res.status(200).render('pokemons/pokemons-index', {
                pokemons: pokemons,
            });
        }).catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
};

pokemonsController.show = (req, res) => {
    Pokemon.findById(req.params.id)
        .then(pokemon => {
            res.status(200).render('pokemons/pokemons-show', {
                pokemon: pokemon,
            });
        }).catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
};

pokemonsController.create = (req, res) => {
    Pokemon.create({
        name: req.body.name,
        skill: req.body.skill,
    }).then(pokemon => {
        res.redirect(`/pokemons/${pokemon.id}`)
    }).catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
    });
};

pokemonsController.edit = (req, res) => {
    Pokemon.findById(req.params.id)
        .then(pokemon => {
            res.status(200).render('pokemons/pokemons-edit', {
                pokemon: pokemon,
            });
        }).catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
};

pokemonsController.update = (req, res) => {
    Pokemon.update({
            name: req.body.name,
            skill: req.body.skill,
        }, req.params.id)
        .then(pokemon => {
            res.redirect(`/pokemons/${pokemon.id}`)
        }).catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
};

pokemonsController.delete = (req, res) => {
    Pokemon.destroy(req.params.id)
        .then(() => {
            res.redirect('/pokemons');
        }).catch(err => {
            res.status(500).json({
                err,
            });
        });
};

module.exports = pokemonsController;