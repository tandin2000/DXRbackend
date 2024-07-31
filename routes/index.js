import express from 'express';
const router = express.Router();

import companyRoute from './company.js';
import companyLocationRoute from './companyLocation.js';
import companyDepartmentRoute from './companyDepartment.js';
import companyCarderRoute from './companyCarder.js';
import companyLocationConfigurationRoute from './companyLocationConfiguration.js';
import companyConfigurationRoute from './companyConfiguration.js';

import employeeRoute from './employee.js';
import employee_detailsRoute from './employee_details.js';
import employee_summaryRoute from './employee_summary.js';
import advance_requestRoute from './advance_request.js';
import company_approvalRoute from './company_approval.js';
import dataMappingRoute from './dataMapping.js';
import authRoute from './auth.js';
import companyContactDetailsRoute from './companyContactDetials.js';
import salcashConfigRoute from './salcashConfig.js'


// Route definitions

router.use('/company', companyRoute);
router.use('/companyLocation', companyLocationRoute);
router.use('/companyDepartment', companyDepartmentRoute);
router.use('/companyCarder', companyCarderRoute);
router.use('/companyLocationConfiguration', companyLocationConfigurationRoute);
router.use('/companyConfiguration', companyConfigurationRoute);
router.use('/companyContactDetails', companyContactDetailsRoute);
router.use('/employee', employeeRoute);
router.use('/employee_details', employee_detailsRoute);
router.use('/employee_summary', employee_summaryRoute);
router.use('/advance_request', advance_requestRoute);
router.use('/company_approval', company_approvalRoute);
router.use('/data_mapping', dataMappingRoute);
router.use('/auth', authRoute);
router.use('/salcash_fee', salcashConfigRoute);




export default router;
