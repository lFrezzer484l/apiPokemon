const http = require("http");
require("dotenv").config();

const express = require("express");
const swaggerUi = require("swagger-ui-express");

const { handlePokemonRoutes } = require("./routes/pokemon");

const app = express();
const swaggerDocument = {
    openapi: "3.0.0",
    info: {
        title: "Pokemon API",
        version: "1.0.0",
        description: "Microservicio de Pokemon en Node.js"
    },
    servers: [
        {
            url: "http://localhost:4000"
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
                        schema: {
                            type: "string"
                        }
                    }
                ],
                responses: {
                    200: {
                        description: "Pokemon encontrado",
                        content: {
                            "application/json": {
                                example: {
                                    id: 1,
                                    nombre: "pikachu",
                                    peso: 6,
                                    altura: 0.4,
                                    tipo: "electrico"
                                }
                            }
                        }
                    },
                    404: {
                        description: "No encontrado"
                    }
                }
            }
        }
    }
};

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const server = http.createServer((req, res) => {

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");

    if (req.url.startsWith("/pokemon")) {
        handlePokemonRoutes(req, res);
    } else {
        res.writeHead(404);
        res.end(JSON.stringify({ error: "Ruta no encontrada" }));
    }
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
    console.log(`API corriendo en http://localhost:${PORT}`);
});

app.listen(4001, () => {
    console.log("Swagger disponible en http://localhost:4001/docs");
});