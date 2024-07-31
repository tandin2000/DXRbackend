import express from 'express';
import dataMappingController from '../controllers/dataMapping.js';
const router = express.Router();

router.post('/', dataMappingController.createDataMapping);
router.put('/:id', dataMappingController.updateDataMapping);
router.get('/:id', dataMappingController.getDataMappingById);
router.get('/companyId/:id',  dataMappingController.getDataMapping);
router.delete('/:id', dataMappingController.deleteDataMapping);


export default router;