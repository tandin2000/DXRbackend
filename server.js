import express from "express";
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import routes from './routes/index.js';
import loggerUtil from './utils/logger.js';
import fs from 'fs';
import path from 'path';

import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get("/", (req, res) => {
  res.send("Salcash server running");
});

const swaggerDocument = JSON.parse(fs.readFileSync(path.resolve('./swagger_output.json'), 'utf8'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use('/api', routes);

app.listen(PORT, () => {
  loggerUtil.info(`Server: running on port ${PORT}`);
});
