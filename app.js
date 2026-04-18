require("dotenv").config();

const express = require("express");
const swaggerUi = require("swagger-ui-express");

const { findPokemonByName } = require("./model/pokemonModel");

const app = express();

// CORS (sin forzar Content-Type)
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

// Swagger config
const swaggerDocument = {
    openapi: "3.0.0",
    info: {
        title: "Pokemon API",
        version: "1.0.0",
        description: "Microservicio de Pokemon en Node.js"
    },
    servers: [
        {
            url: "https://api-pokemon-n90j.onrender.com"
        }
    ],
    paths: {
        "/pokemon/{nombre}": {
            get: {
                summary: "Obtener un pokemon por nombre",
                parameters: [
                    {
                        name: "nombre",
                        in: "path",
                        required: true,
                        schema: { type: "string" }
                    }
                ],
                responses: {
                    200: {
                        description: "Pokemon encontrado"
                    },
                    404: {
                        description: "No encontrado"
                    }
                }
            }
        }
    }
};

// Swagger UI
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Endpoint REAL usando Express (IMPORTANTE)
app.get("/pokemon/:nombre", async (req, res) => {
    try {
        const nombre = req.params.nombre;

        const pokemon = await findPokemonByName(nombre);

        if (!pokemon) {
            return res.status(404).json({ error: "Pokemon no encontrado" });
        }

        res.json(pokemon);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error del servidor" });
    }
});

// 404
app.use((req, res) => {
    res.status(404).json({ error: "Ruta no encontrada" });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
