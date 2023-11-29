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

  const getUser = async () => {
    setPerson(user);
    await setConversation({ senderId: account._id, receiverId: user._id });
  };

  const handleCompClick = async () => {
    await getUser();
    // Any other synchronous logic you want to execute after getUser
  };

  useEffect(() => {
    const getConversationDetails = async () => {
      try {
        const data = await getConversation({
          senderId: account._id,
          receiverId: user._id,
        });

        // Check if data is not null and has the expected properties
        if (data && data.message && data.updatedAt) {
          setMess({ text: data.message, timestamp: data.updatedAt });
        } else {
          // Handle the case when the data is null or missing expected properties
          console.error("Invalid data received from getConversation:", data);
        }
      } catch (error) {
        // Handle errors during the API call
        console.error("Error fetching conversation details:", error);
      }
    };

    getConversationDetails();
  }, [newMessageFlag]);

  return (
    <Comp onClick={handleCompClick}>
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
