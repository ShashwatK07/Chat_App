import Conversation from "../models/conversation.js";

export const newConversation = async (req, res, next) => {
  try {
    const senderId = req.body.senderId;
    const receiverId = req.body.receiverId;

    let defId;

    if (senderId < receiverId) {
      defId = senderId + receiverId;
    } else {
      defId = receiverId + senderId;
    }

    console.log(defId);

    const exist = await Conversation.findOne({
      defId: defId,
    });

    if (exist) {
      return res.status(200).json({ message: "Conversation already exists" });
    }

    const newConversation = new Conversation({
      receiverId: receiverId,
      senderId: senderId,
      defId: defId,
    });

    await newConversation.save();

    return res.status(201).json({ message: "Conversation saved successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getConversation = async (req, res) => {
  try {
    const senderId = req.body.senderId;
    const receiverId = req.body.receiverId;

    let defId;

    if (senderId < receiverId) {
      defId = senderId + receiverId;
    } else {
      defId = receiverId + senderId;
    }

    const convo = await Conversation.findOne({
      defId: defId,
    });

    return res.status(200).json(convo);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
