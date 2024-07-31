import express from 'express';
const router = express.Router();

import company_approvalController from '../controllers/company_approval.js';
router.post('/', company_approvalController.createCompanyApproval);
router.get('/:id',  company_approvalController.getCompanyApproval);
router.put('/:id', company_approvalController.updateCompanyApproval);

export default router;