import express from 'express';
import {Songs, Playlists, createSong, retrieveAllSongs, retrieveSongByID, deleteSongId, updateSong} from './playlists-songs-model.mjs';

import cors from 'cors';
import router from './songsRoutes.mjs';


const PORT = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cors());
app.use('/api', router);


// Create the song and add it to the library 
app.post ('/songs', (req,res) => {
    const {title, artist, album, mood} = req.body;
    createSong(
        title, 
        artist, 
        album,
        mood
    )
    // catch any errors, and throw successful message and status code when added to playlist 
    .then(song => {
        console.log(`"${song.title}" was added to the playlist.`);
        res.status(201).json(song);
    })
    .catch(error => {
        console.log(error);
        res.status(400).json({Error: 'Unable to add song to playlist.' })
    });
});
// Create the song and add it to playlist 
// Retrieve the controller 
app.get ('/songs', (req,res) => {
   retrieveAllSongs()
        .then(songs => {
            if (songs != null){
                console.log(`All songs were retrieved from the library`);
                res.json(songs);
            } else {
                res.status(404).json({Error: 'No songs found'})
            }
        })
        .catch(error => {
            console.log(error);
            res.status(400).json({Error:'Unable to retrieve songs from library'})
        });
});

// Retrieve by ID 
app.get('/songs/:id', (req,res) => {
    const songId = req.params.id;
    retrieveSongByID(songId)
    .then(song => {
        if(song !== null) {
            console.log(`"${song.title}" was retrieved, based on the ID`)
            res.json(song);
        } else {
            res.status(404).json({Error: 'No songs found in library'})
        }
    })
    .catch(error => {
        console.log(error);
        res.status(400).json({Error: 'Unable to retrieve song by ID.'})
    });
});
// Filter songs by attribute
app.get('/songs/filter', (req,res) => {
    let filter = {};
    if (req.query.title !== undefined) {
        filter = {title: req.query.title};
    } else if (req.query.artist !== undefined) {
        filter = {artist: req.query.artist};
    } else if (req.query.album !== undefined) {
        filter = {album: req.query.album};
    } else if (req.query.mood !== undefined) {
        filter = {mood: req.query.mood};
    } else {
        filter = {}; // returns all songs if there is no filter
    }
    Songs.find(filter, '', 0)
        .then(song => {
            res.json(song);
        })
        .catch(error => {
            console.error(error);
            res.status(400).json({Error: 'No songs with matching criteria'})
        });
});
// Update controller
app.put('/songs/:_id', (req,res) => {
 
    const {title, artist, album, mood} = req.body;
    if (!title || !artist || !album || !mood) {
        return res.status(400).json({ Error: 'Missing song details' });
    }
    updateSong(req.params._id, title,artist,album,mood)
    .then(numUpdated => {
        if (numUpdated === 1) {
            res.json({_id: req.params._id, title: req.body.title, artist: req.body.artist, album: req.body.album, mood: req.body.mood})
        } else {
            res.status(404).json({Error: 'Unable to update song'});
        }
    })
    .catch(error => {
        console.error(error);
        res.status(400).json({Error: 'Invalid song ID'});
    });
});
// Deletes songs
app.delete('/songs/:_id', (req,res) => {
    deleteSongId(req.params._id)
    .then(deletedCount => {
        if (deletedCount === 1) {
            res.status(204).send();
        } else {
            res.status(404).json({Error: 'No song found'})
        }
    })
    .catch(error => {
        console.log(error);
        res.status(400).json({Error: 'Unable to delete song'});
    });
});

// Delete Controller
app.delete('/playlists/:_id', (req,res) => {
    deleteOne(req.params._id)
        .then(deletedCount => {
            if (deletedCount === 1) {
                res.status(204).send();
            } else {
                res.status(404).json({Error: 'No playlist found'});
            }
        })
        .catch(error => {
            console.error(error);
            res.send({error: 'Unable to delete playlist'});
        });
});

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});