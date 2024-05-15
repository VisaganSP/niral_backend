import express from "express";
import dotenv from "dotenv";

import connectDB from "./configs/db.mjs";

import participantsRoutes from "./routes/participantsRoutes.mjs";
import jwtRoutes from "./jwtRoutes.mjs";
// import registrationsRoutes from './routes/registrationsRoutes.mjs';
// import eventsRoutes from './routes/eventsRoutes.mjs';
// import logsRoutes from './routes/logsRoutes.mjs';
// import adminsRoutes from './routes/adminsRoutes.mjs';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Connect to MongoDB
connectDB();

app.use(express.json());

app.use("/participants", participantsRoutes);
app.use("/auth", jwtRoutes);
// app.use('/registrations', registrationsRoutes);
// app.use('/events', eventsRoutes);
// app.use('/logs', logsRoutes);
// app.use('/admins', adminsRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
