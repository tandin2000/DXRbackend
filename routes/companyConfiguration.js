import express from 'express';
import companyConfiguration from '../controllers/companyConfiguration.js';
const router = express.Router();

router.post('/', companyConfiguration.createCompanyConfiguration);
router.put('/:id', companyConfiguration.updateCompanyConfiguration);

export default router;