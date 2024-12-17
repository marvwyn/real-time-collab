import express from 'express';
import {
  createDocument,
  getDocument,
  updateDocument,
  deleteDocument,
} from '../controllers/DocumentController.js';
import { authenticate } from '../middleware/authenticate.js';

const router = express.Router();

router.post('/create', authenticate, createDocument);

router.get('/:documentId', authenticate, getDocument);

router.put('/:documentId', authenticate, updateDocument);

router.delete('/:documentId', authenticate, deleteDocument);

export default router;
