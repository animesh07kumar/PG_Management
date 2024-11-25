import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import stuff_router from './routes/stuff_routes.js';



dotenv.config();

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cookieParser());

// Routes
app.use('/api', stuff_router);


app.get('/', (req, res) => {
  res.send('Pg Managment');
});


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
