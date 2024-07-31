import express from 'express';
import salcashConfigController from '../controllers/salcashConfig.js'
const router = express.Router();

router.put('/', salcashConfigController.updateSalcashFee);
router.get('/', salcashConfigController.getSalcashFee);


export default router;