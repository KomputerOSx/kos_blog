import express from "express";
import path from "path";
import { fileURLToPath } from 'url';
import expressLayouts from 'express-ejs-layouts';
import routes from './src/routes/blogsRouter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


app.use(expressLayouts);

// Use routes
app.use('/', routes);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
});
