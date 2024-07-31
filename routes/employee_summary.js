import express from 'express';
const router = express.Router();

import employee_summaryController from '../controllers/employee_summary.js';

router.post('/', employee_summaryController.createEmployeeSummary);
router.get('/:id',  employee_summaryController.getEmployeeSummary);
router.put('/:id', employee_summaryController.updateEmployeeSummary);

export default router;