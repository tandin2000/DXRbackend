import express from 'express';
import companyLocationConfigurationController from '../controllers/companyLocationConfiguration.js';
const router = express.Router();

router.post('/', companyLocationConfigurationController.createCompanyLocationConfiguration);
router.post('/user', companyLocationConfigurationController.createCompanyLocationConfigurationUser);
router.put('/:id', companyLocationConfigurationController.updateCompanyLocationConfiguration);
router.get('/:id', companyLocationConfigurationController.getCompanyLocationConfigurationById);
router.get('/companyId/:id',  companyLocationConfigurationController.getCompanyLocationConfiguration);
router.delete('/:id', companyLocationConfigurationController.deleteCompanyLocationConfiguration);


export default router;