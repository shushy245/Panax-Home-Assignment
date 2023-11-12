import express from 'express';
import cors from 'cors';
import path from 'path';
import bodyParser from 'body-parser';

import apiRoute from '../api';

export default () => {
    const app = express();

    app.use(cors())
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use('/api', apiRoute);
    app.use(express.static(path.join(__dirname, '../../client')));

    app.listen(9000, () => console.log('Listening!'));
}