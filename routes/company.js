import express from 'express';
const router = express.Router();

import companyController from '../controllers/company.js';
import authMiddleware from '../middlewares/auth.js';

router.post('/', companyController.createCompany);
// router.get('/id', [authMiddleware.verifyToken], companyController.getCompany);
router.get('/search', companyController.searchCompanies);
router.get('/',  companyController.getCompanies);
router.get('/:id',  companyController.getCompany);
router.put('/:id', companyController.updateCompany);
// router.patch('/status', companyController.updateCompanyStatus);

export default router;