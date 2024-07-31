import express from 'express';
import companyContactDetails from '../controllers/companyContactDetails.js';
const router = express.Router();

router.post('/', companyContactDetails.createCompanyContactDetails);
router.put('/:id', companyContactDetails.updateCompanyContactDetails);
router.get('/:id', companyContactDetails.getCompanyContactDetailsById);
router.get('/companyId/:id',  companyContactDetails.getCompanyContactDetails);
router.delete('/:id', companyContactDetails.deleteCompanyContactDetails);

export default router;