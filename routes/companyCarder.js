import express from 'express';
import companyCarderController from '../controllers/companyCarder.js';
const router = express.Router();

router.post('/', companyCarderController.createCompanyCarder);
router.put('/:id', companyCarderController.updateCompanyCarder);
router.get('/:id', companyCarderController.getCarderById);
router.get('/companyId/:id',  companyCarderController.getCompanyCarder);
router.delete('/:id', companyCarderController.deleteCompanyCarder);


export default router;