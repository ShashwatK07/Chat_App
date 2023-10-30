import mongoose from "mongoose";

const ConversationSchema = new mongoose.Schema(
  {
    receiverId: {
      type: String,
      required: true,
    },
    senderId: {
      type: String,
      required: true,
    },
    defId: {
      type: String,
      unique: true,
    },
    message: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Conversation", ConversationSchema);
