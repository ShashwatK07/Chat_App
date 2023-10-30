import { Box, Typography, styled } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AccountContext } from "../../context/Account";
import { setConversation, getConversation } from "../../service/api";

const Comp = styled(Box)`
  display: flex;
  height: 45px;
  padding: 13px 0;
  cursor: pointer;
`;

const Image = styled("img")({
  width: 50,
  height: 50,
  borderRadius: "50%",
  padding: "0 14px",
  objectFit: "cover",
});

const Container = styled(Box)`
  display: flex;
`;

const Timestamp = styled(Typography)`
  font-size: 12px;
  margin-left: auto;
  color: #919191;
  padding: 0 10px;
`;

const Text = styled(Typography)`
  font-size: 14px;
  color: #919191;
`;

const formatDate = (date) => {
  const hours = new Date(date).getHours();
  const minutes = new Date(date).getMinutes();
  return `${hours < 10 ? "0" + hours : hours}:${
    minutes < 10 ? "0" + minutes : minutes
  }`;
};

const Convo = ({ user }) => {
  const { setPerson, account, newMessageFlag } = useContext(AccountContext);
  const [mess, setMess] = useState({});

  useEffect(() => {
    const getConversationDetails = async () => {
      const data = await getConversation({
        senderId: account._id,
        receiverId: user._id,
      });
      setMess({ text: data.message, timestamp: data.updatedAt });
    };
    getConversationDetails();
  }, [newMessageFlag]);

  const getUser = async () => {
    setPerson(user);
    await setConversation({ senderId: account._id, receiverId: user._id });
  };

  return (
    <Comp onClick={() => getUser()}>
      <Box>
        <Image src={user.pic} alt="dp" />
      </Box>
      <Box style={{ width: "100%" }}>
        <Container>
          <Typography>{user.name}</Typography>
          {mess.text && <Timestamp>{formatDate(mess.timestamp)}</Timestamp>}
        </Container>
        <Box>
          <Text>
            {mess?.text?.includes("localhost") ? "Media file" : mess.text}
          </Text>
        </Box>
      </Box>
    </Comp>
  );
};

export default Convo;
