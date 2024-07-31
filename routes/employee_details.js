import express from 'express';
const router = express.Router();

import employee_detailsController from '../controllers/employee_details.js';

router.post('/', employee_detailsController.createEmployeeDetails);
router.get('/:id',  employee_detailsController.getEmployeeDetails);
router.put('/:id', employee_detailsController.updateEmployeeDetails);

export default router;