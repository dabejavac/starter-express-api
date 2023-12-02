// server.js or server.mjs
import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
const port = 3000;

app.use(cors());

app.get('/api', async (req, res) => {
  try {
    const { origin, destination, mode, key } = req.query;

    if (!origin || !destination || !key) {
      throw new Error("Missing required parameters");
    }

    const apiUrl = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&mode=${mode || 'driving'}&key=${key}`;
    const response = await axios.get(apiUrl);

    res.json(response.data);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(400).json({ error: "Bad Request", details: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
