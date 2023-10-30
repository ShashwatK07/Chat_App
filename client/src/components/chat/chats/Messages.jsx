import { Box, styled } from "@mui/material";
import Footer from "./Footer";
import { useContext, useState, useEffect } from "react";
import { AccountContext } from "../../context/Account";
import { getMessage, newMessage } from "../../service/api";
import EachMessage from "./EachMessage";

const Comp = styled(Box)`
  height: 80vh;
  overflow-y: scroll;
`;

const Container = styled(Box)`
  padding: 1px 80px;
`;

const Messages = ({ conversation }) => {
  const { account, person, socket, newMessageFlag, setNewMessageFlag } =
    useContext(AccountContext);
  const [messageText, setMessageText] = useState("");
  const [message, setMessage] = useState([]);
  const [file, setFile] = useState([]);
  const [image, setImage] = useState("");

  const [incomingMessage, setIncomingMessage] = useState(null);

  useEffect(() => {
    socket.current.on("getMessage", (data) => {
      setIncomingMessage({ ...data, createdAt: Date.now() });
    });
  }, []);

  useEffect(() => {
    const getMessageDetails = async () => {
      let data = await getMessage(conversation._id);
      setMessage(data);
    };
    conversation._id && getMessageDetails();
  }, [person._id, conversation._id, newMessageFlag]);

  useEffect(() => {
    incomingMessage &&
      conversation?.defId.includes(incomingMessage.senderId) &&
      setMessage((prev) => [...prev, incomingMessage]);
  }, [incomingMessage, conversation]);

  const sendText = async (e) => {
    const code = e.keyCode || e.which;
    if (code === 13) {
      let message = {};
      // if (!file) {
      message = {
        senderId: account._id,
        receiverId: person._id,
        conversationId: conversation._id,
        type: "text",
        text: messageText,
      };
      // } else {
      //   message = {
      //     senderId: account._id,
      //     receiverId: person._id,
      //     conversationId: conversation._id,
      //     type: "file",
      //     text: image,
      //   };
      // }

      socket.current.emit("sendMessage", message);

      await newMessage(message);
      setMessageText("");
      setImage("");
      setNewMessageFlag(!newMessageFlag);
    }
  };

  return (
    <>
      <Box>
        <Comp>
          {message &&
            message.map((mess) => (
              <Container>
                <EachMessage mess={mess} key={mess._id} />
              </Container>
            ))}
        </Comp>
      </Box>
      <Footer
        sendText={sendText}
        setMessageText={setMessageText}
        messageText={messageText}
        file={file}
        setFile={setFile}
        setImage={setImage}
      />
    </>
  );
};

export default Messages;
