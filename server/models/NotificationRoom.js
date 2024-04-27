import mongoose from "mongoose";
const notificationRoomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    user:
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    notifications: [
      {
        type: Object,
      },
    ],
  },
  {
    timestamps: true,
  }
);
const NotificationRoom = mongoose.model(
  "NotificationRoom",
  notificationRoomSchema
);
export default NotificationRoom;
