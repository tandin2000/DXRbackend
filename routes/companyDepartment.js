import express from 'express';
import companyDepartmentController from '../controllers/companyDepartment.js';

const router = express.Router();

router.post('/', companyDepartmentController.createCompanyDepartment);
router.put('/:id', companyDepartmentController.updateCompanyDepartment);
router.get('/:id', companyDepartmentController.getDepartmentById);
router.get('/companyId/:id',  companyDepartmentController.getCompanyDepartment);
router.delete('/:id', companyDepartmentController.deleteCompanyDepartment);


export default router;