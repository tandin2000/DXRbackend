import express from 'express';
import companyLocationController from '../controllers/companyLocation.js';
const router = express.Router();

router.post('/', companyLocationController.createCompanyLocation);
router.put('/:id', companyLocationController.updateCompanyLocation);
router.get('/:id', companyLocationController.getLocationById);
router.get('/companyId/:id',  companyLocationController.getCompanyLocation);
router.delete('/:id',  companyLocationController.deleteCompanyLocation);


export default router;