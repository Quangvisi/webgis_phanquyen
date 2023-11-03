import 'dotenv/config';
import express from "express";
import configviewEngine from "./config/viewEngine";
import bodyParser from "body-parser";
import initWebRoutes from "./routes/web";
import { join } from 'mysql2/lib/constants/charset_encodings';
import ejs from 'ejs';

const app = express();
const port = process.env.PORT || 8888;


// config view engine
configviewEngine(app);

//config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//init all web routes
initWebRoutes(app);


app.listen(port, () => {
   console.log(`App is running at the ${port}`);
});
