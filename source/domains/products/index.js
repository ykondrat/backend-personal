// Core
import express from 'express';

// Instruments
import { get, post } from './route';
import { getByHash, updateByHash, removeByHash } from './hash/route';
import { limiter, validator, authenticate } from '../../helpers';

// Schema
import { product } from '../../schemas';

export const router = express.Router();

router.get('/', [ authenticate, limiter(5, 60 * 1000) ], get);
router.post('/', [ validator(product) ], post);

router.get('/:productHash', [ authenticate ], getByHash);
router.put('/:productHash', [ authenticate, validator(product) ], updateByHash);
router.delete('/:productHash', [ authenticate ], removeByHash);

export { router as products };
