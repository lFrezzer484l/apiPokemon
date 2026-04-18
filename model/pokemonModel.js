const db = require("../database/connection");

async function findPokemonByName(name) {
    try {
        const result = await db.query(
            "SELECT * FROM pokemon WHERE nombre = $1",
            [name]
        );

        return result.rows[0]; // PostgreSQL usa rows
    } catch (error) {
        console.error("Error SQL:", error);
        throw error;
    }
}

module.exports = { findPokemonByName };