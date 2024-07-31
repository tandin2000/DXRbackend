import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        title: 'Salcash',
        description: 'API documentation',
    },
    host: 'localhost:5000',
    basePath: "/api",
    schemes: ['http', 'https'],
    
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
            "name": "Company",
            "description": "Endpoints for company data management"
        },
        {
            "name": "CompanyLocation",
            "description": "Endpoints for company Location data management"
        },
        {
            "name": "CompanyDepartment",
            "description": "Endpoints for company Department data management"
        },
        {
            "name": "CompanyCarder",
            "description": "Endpoints for company Carder data management"
        },
        {
            "name": "CompanyLocationConfiguration",
            "description": "Endpoints for company configuration (parent)  data management"
        },
        {
            "name": "CompanyConfiguration",
            "description": "Endpoints for company configuration (child)  data management"
        },
    ],
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen({openapi: '3.0.0'})(outputFile, endpointsFiles, doc);


