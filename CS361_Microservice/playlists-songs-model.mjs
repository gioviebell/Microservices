import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
);
const db = mongoose.connection;

db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

// Creates schemas for songs and playlists 
const songsSchema = mongoose.Schema({
    title: {type: String, required: true},
    artist: {type: String, required: true},
    album: {type: String, required: true},
    mood: {type: String, required: true,
        enum: ['Happy', 'Sad', 'Angry', 'Relaxed', 'Nostalgic']
    }
});
const playlistsSchema = mongoose.Schema({
    name: {type: String, required: true},
    songs: [{type: mongoose.Schema.Types.ObjectId, ref: 'Songs'}]
});

// Create model
const Playlists = mongoose.model("Playlists", playlistsSchema);
const Songs = mongoose.model("Songs", songsSchema);

// Create song and add to library asynchronously
const createSong = async (title, artist, album, mood) => {
    const song = new Songs({title, artist, album, mood});
    return await song.save();
};
// retrieve all songs in entire library 
const retrieveAllSongs = async() => {
    const query = Songs.find(); // retrieves all songs from each playlist
    return query.exec();
};
// Retrieve songs by ID
const  retrieveSongByID = async (_id) => {
    if (!_id || !mongoose.Types.ObjectId.isValid(_id)) {
        throw new Error('Invalid ObjectId');
    }
    const query = Songs.findById({_id:_id});
    return query.exec();
};
// Delete songs by ID by finding song in library and playlist, and updating both
const deleteSongId = async (_id) => {
    const result = await Songs.deleteOne({_id:_id});
    return result.deletedCount;
};
// Update the library 
const updateSong = async (_id, title, artist, album, mood) => {
    const result = await Songs.updateOne({_id: _id}, {
        title: title,
        artist:artist,
        album: album,
        mood: mood
    });
    return result.modifiedCount;
};
export {Playlists, Songs, createSong, retrieveAllSongs, retrieveSongByID, deleteSongId, updateSong}
