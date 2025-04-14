import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import stravaRoutes from './routes/strava';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/strava', stravaRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
