import express from 'express';
import { retrieveSongAndSend } from './song-email-controller.mjs';
// Create router object that handles the email data being received and sent 
// replace with the function in your controller file
const router = express.Router();
router.post('/send-song', retrieveSongAndSend);

export default router;