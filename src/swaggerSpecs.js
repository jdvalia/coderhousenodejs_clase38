import swaggerJsdoc from "swagger-jsdoc";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Ecommerce",
            description: "Documentación de las APIS realizadas para el proyecto Ecommerce",
        },
    },
    apis: [ './src/docs/**/*.yaml' ],
};

const swaggerSpecs = swaggerJsdoc(options);

export default swaggerSpecs