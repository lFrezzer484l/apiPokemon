const { findPokemonByName } = require("../model/pokemonModel");

async function getPokemon(name, res) {
    try {
        const pokemon = await findPokemonByName(name);

        if (!pokemon) {
            res.writeHead(404);
            return res.end(JSON.stringify({ error: "Pokemon no encontrado" }));
        }

        res.writeHead(200);
        res.end(JSON.stringify(pokemon));

    } catch (error) {
        console.error(error);
        res.writeHead(500);
        res.end(JSON.stringify({ error: "Error del servidor" }));
    }
}

module.exports = { getPokemon };