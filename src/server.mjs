// src/app.mjs

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import participantsRoutes from "./routes/participantsRoutes.mjs";

dotenv.config();

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

// Routes
app.use("/participants", participantsRoutes);


app.post('/api/postData', (req, res) => {
  console.log('Received POST request with body:', req.body);
  res.send('Data received successfully');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
