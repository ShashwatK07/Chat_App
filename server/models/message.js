import mongoose from "mongoose";

const MessageSchema = mongoose.Schema(
  {
    conversationId: String,
    senderId: String,
    receiverId: String,
    text: String,
    type: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Message", MessageSchema);
