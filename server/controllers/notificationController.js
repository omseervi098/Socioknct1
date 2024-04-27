import User from '../models/User.js';
import NotificationRoom from '../models/NotificationRoom.js';
export const joinNotificationRoom = async (req, res) => {
    try{
        const {roomName} = req.body;
        //splt the room name to get the user id
        const userId = roomName.split('-')[1];
        //check if the user Exists
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        //check if the room already exists
        const room = await NotificationRoom.findOne({name:roomName});
        //if room exists return the room
        if(room){
            return res.status(200).json({data:room, message:"Room already exists"});
        }
        //if room does not exist create a new room
        const newRoom = new NotificationRoom({name:roomName, user:userId});
        await newRoom.save();
        return res.status(200).json({data:newRoom, message:"Room created successfully"});

    }catch(err){
        console.log(err);
        return res.status(500).json({message:err.message});
    }
};