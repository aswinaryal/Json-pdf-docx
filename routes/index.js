import express from 'express';
import path from 'path';
import fs from 'fs';
import data from '../models/data';
import controller from '../controller/converter';
let router = express.Router();


router.get('/', (req, res, next) => {
    res.render('home');
});

router.get('/pdf',controller.getPdf);

router.get('/docx',controller.getDocx);

export default router;
