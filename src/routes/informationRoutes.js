import express from 'express';
import { getAllInformation, createInformation, updateInformation, deleteInformationById } from '../controllers/informationController.js';

const router = express.Router();

router.get('/', getAllInformation);
router.post('/', createInformation);
router.put('/:id', updateInformation);
router.delete('/code/:information_code', deleteInformationById);

export default router;
