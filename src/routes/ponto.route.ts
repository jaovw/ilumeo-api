import { Router } from 'express';
import { PontoController } from '../controller/ponto.controller';

const router = Router();

router.post('/',    PontoController.create);
router.get('/',     PontoController.list);
router.get('/:id',  PontoController.get);
router.put('/:id',  PontoController.update);
router.delete('/:id', PontoController.delete);

export default router;
