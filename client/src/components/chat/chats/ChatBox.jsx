import { Box, Typography, styled } from "@mui/material";
import ChatHeader from "./ChatHeader";
import Messages from "./Messages";
import { AccountContext } from "../../context/Account";
import { useContext, useEffect, useState } from "react";
import { getConversation } from "../../service/api";

const ChatBox = () => {
  const { account, person } = useContext(AccountContext);

  const [conversation, setCoversation] = useState({});

  useEffect(() => {
    const getConversationDetails = async () => {
      let data = await getConversation({
        senderId: account._id,
        receiverId: person._id,
      });
      setCoversation(data);
    };
    getConversationDetails();
  }, [person._id]);

  return (
    <Box style={{ height: "75%" }}>
      <ChatHeader person={person} />
      <Messages person={person} conversation={conversation} />
    </Box>
  );
};

export default ChatBox;
