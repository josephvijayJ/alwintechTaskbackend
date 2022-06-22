import express from 'express';
import cors from 'cors';
import path from 'path';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

//to coonect Mongo db
connectDB();
app.get('/', (req, res) => {
  res.send('Api is running');
});

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('api/upload', uploadRoutes);

//?CUSTOM ERROR HANDLING
app.use(notFound);
app.use(errorHandler);

app.listen(5000, () => {
  console.log('server running');
});
