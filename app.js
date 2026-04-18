require("dotenv").config();

const express = require("express");
const swaggerUi = require("swagger-ui-express");

const { handlePokemonRoutes } = require("./routes/pokemon");

const app = express();

// CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Content-Type", "application/json");
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
                        description: "OK"
                    },
                    404: {
                        description: "No encontrado"
                    }
                }
            }
        }
    }
};

// Swagger
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Endpoint
app.get("/pokemon/:nombre", (req, res) => {
    handlePokemonRoutes(req, res);
});

// 404
app.use((req, res) => {
    res.status(404).json({ error: "Ruta no encontrada" });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
