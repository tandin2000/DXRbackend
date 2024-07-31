import express from 'express';
const router = express.Router();

import employeeController from '../controllers/employee.js';

router.post('/', employeeController.createEmployee);
router.get('/:id',  employeeController.getEmployee);
router.get('/companyId/:id',  employeeController.getEmployeesByCompanyId);
router.get('/search/companyId/:id',  employeeController.getEmployeesByCompanyIdSearch);
router.put('/:id', employeeController.updateEmployee);

export default router;