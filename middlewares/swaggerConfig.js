const swaggerJSDoc = require('swagger-jsdoc');
const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Express API for Infra Backend',
        version: '1.0.0',
        description:
            'This is a REST API application made with Express. It retrieves data from Infra Backend.',

    },
    servers: [
        {
            url: 'http://localhost:9000',
            description: 'Development server',
        },
    ],
    components: {
        securitySchemes: {
            jwt: {
                type: "http",
                scheme: "bearer",
                in: "header",
                bearerFormat: "JWT"
            },
        }
    },
    tags: [
        {
          name: 'User operations'
        },
        {
          name: 'Bank operations'
        },
        {
          name: 'Role operations'
        },
        {
            name: 'Scope operations'
        },
        {
            name: 'Resourse operations'
        },
        {
            name: 'Policy operations'
        },
        {
            name: 'Permission operations'
        },
    ],
    security: [{
        jwt: []
    }]


};

const options = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    apis: ['./routes/*.js','./routes/keyclockRoutes/*.js'],

};
module.exports.swaggerSpec  = ()=> {
    return swaggerJSDoc(options)
}


