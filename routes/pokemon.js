const { getPokemon } = require("../controllers/pokemonController");

function handlePokemonRoutes(req, res) {

    const urlParts = req.url.split("/");
    const name = urlParts[2]; // /pokemon/pikachu

    if (req.method === "GET" && name) {
        getPokemon(name, res);
    } else {
        res.writeHead(400);
        res.end(JSON.stringify({ error: "Petición inválida" }));
    }
}

module.exports = { handlePokemonRoutes };