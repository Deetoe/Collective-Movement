import express from 'express';
import axios from 'axios';

const router = express.Router();

const {
  STRAVA_CLIENT_ID,
  STRAVA_CLIENT_SECRET,
  STRAVA_REDIRECT_URI,
} = process.env;

router.get('/login', (req, res) => {
    const authURL = `https://www.strava.com/oauth/authorize?client_id=${STRAVA_CLIENT_ID}&response_type=code&redirect_uri=${STRAVA_REDIRECT_URI}&approval_prompt=force&scope=read,activity:read_all`;

  res.redirect(authURL);
});

router.get('/callback', async (req, res) => {
  const code = req.query.code as string;

  try {
    const response = await axios.post('https://www.strava.com/oauth/token', {
      client_id: STRAVA_CLIENT_ID,
      client_secret: STRAVA_CLIENT_SECRET,
      code,
      grant_type: 'authorization_code',
    });

    const accessToken = response.data.access_token;
    res.json({ accessToken, athlete: response.data.athlete });
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to exchange token');
  }
});

export default router;
