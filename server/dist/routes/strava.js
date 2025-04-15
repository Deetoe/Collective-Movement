"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const router = express_1.default.Router();
// Retrieve environment variables
const { STRAVA_CLIENT_ID, STRAVA_CLIENT_SECRET, STRAVA_REDIRECT_URI, } = process.env;
// Route to initiate OAuth login
router.get('/login', (req, res) => {
    const authURL = `https://www.strava.com/oauth/authorize?client_id=${STRAVA_CLIENT_ID}&response_type=code&redirect_uri=${STRAVA_REDIRECT_URI}&approval_prompt=force&scope=read,activity:read_all`;
    res.redirect(authURL);
});
// Callback route after authorization
router.get('/callback', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const code = req.query.code; // Get authorization code from query
    try {
        // Step 1: Exchange the authorization code for an access token
        const response = yield axios_1.default.post('https://www.strava.com/oauth/token', {
            client_id: STRAVA_CLIENT_ID,
            client_secret: STRAVA_CLIENT_SECRET,
            code,
            grant_type: 'authorization_code',
        });
        const accessToken = response.data.access_token;
        const athlete = response.data.athlete;
        // You can store the access token in a session or database for later use
        // For now, I'll return it in the response as part of the JSON
        res.json({
            accessToken,
            athlete,
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Failed to exchange token');
    }
}));
// Route to fetch activities of the authenticated athlete
router.get('/activities', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const accessToken = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1]; // Get the Bearer token from Authorization header
    if (!accessToken) {
        res.status(400).send('Authorization token is required');
        return;
    }
    try {
        // Step 2: Fetch activities using the access token
        const activitiesResponse = yield axios_1.default.get('https://www.strava.com/api/v3/athlete/activities', {
            headers: {
                Authorization: `Bearer ${accessToken}`, // Pass the access token in Authorization header
            },
        });
        res.json({
            activities: activitiesResponse.data, // Return the activities data in JSON format
        });
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Failed to fetch activities');
    }
}));
exports.default = router;
