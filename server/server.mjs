import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import connectDB from './configs/db.mjs'

import participantsRoutes from './routes/participantsRoutes.mjs'
import jwtRoutes from './routes/jwtRoutes.mjs'
// import registrationsRoutes from './routes/registrationsRoutes.mjs';
// import eventsRoutes from './routes/eventsRoutes.mjs';
// import logsRoutes from './routes/logsRoutes.mjs';
import adminsRoutes from './routes/adminsRoutes.mjs';

dotenv.config()

const app = express()
const PORT = process.env.PORT

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


app.use('/participants', participantsRoutes)
app.use('/auth', jwtRoutes)
// app.use('/registrations', registrationsRoutes);
// app.use('/events', eventsRoutes);
// app.use('/logs', logsRoutes);
app.use('/admin', adminsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
