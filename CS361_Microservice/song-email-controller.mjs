
// imports the nodemailer function that emails the message to user (stays the same)
import { sendEmail } from "./email-sender.mjs";
import mongoose from "mongoose";
import { Songs } from "./playlists-songs-model.mjs";

// retrieves the entity in the collection and sends via email 
// function name retrieveEventAndSend; songIds = eventIds
const retrieveSongAndSend = async (req, res) => {
    const {songIds, email} = req.body;

    if (!Array.isArray(songIds) || !songIds.every(id => mongoose.Types.ObjectId.isValid(id))) {
        return res.status(400).json({ error: 'One or more song IDs are invalid.' });
    };
    try {
        const songs = await Songs.find({'_id': {$in: songIds} });
        if (!songs) {
            return res.status(404).json({error:'Song not found.'});
        }
    
    const subject = 'Music you may like :)' ;
    // replace song attributes with event attributes
    const emailBody = songs.map(song => 
        `Title: ${song.title},
        Artist: ${song.artist},
        Album: ${song.album},
        Mood: ${song.mood}`).join('\n\n');
    
    await sendEmail(email, subject, emailBody);

    res.status(200).json({message: `Email successfully sent to ${email}!`});
    } catch(error){
        console.error(error);
        res.status(500).json({error:'Unable to process request'});
    }
};
export {retrieveSongAndSend};