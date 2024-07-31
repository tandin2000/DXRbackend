import express from 'express';
const router = express.Router();

import advance_requestController from '../controllers/advance_request.js';

router.post('/', advance_requestController.createAdvanceRequest);
router.get('/:id',  advance_requestController.getAdvanceRequest);
router.get('/company/:company_id',  advance_requestController.getAdvanceRequestByCompanyId);
router.get('/employeeId/:employee_id/companyId/:company_id',  advance_requestController.getAdvanceRequestsForCurrentMonth);
router.put('/:id', advance_requestController.updateAdvanceRequest);

export default router;