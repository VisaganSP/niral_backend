import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import path from 'path';
import { fileURLToPath } from 'url';

import connectDB from './configs/db.mjs'

dotenv.config()

const app = express()
const PORT = process.env.PORT ||3000

import participantsRoutes from './routes/participantsRoutes.mjs'
import jwtRoutes from './routes/jwtRoutes.mjs'
// import registrationsRoutes from './routes/registrationsRoutes.mjs';
// import eventsRoutes from './routes/eventsRoutes.mjs';
// import logsRoutes from './routes/logsRoutes.mjs';
import adminsRoutes from './routes/adminsRoutes.mjs';
import contactFormController from './controllers/contactFormController.mjs';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'dist')));

// Catch-all route to serve index.html for any request




// Connect to MongoDB
connectDB()

app.use(express.json())
app.use(cors())
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   next();
// });

app.use('/contact-form', contactFormController);
app.use('/participants', participantsRoutes)
app.use('/auth', jwtRoutes)
// app.use('/registrations', registrationsRoutes);
// app.use('/events', eventsRoutes);
// app.use('/logs', logsRoutes);
app.use('/admin', adminsRoutes);


app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
