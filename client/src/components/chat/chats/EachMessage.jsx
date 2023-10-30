import { Box, Typography, styled } from "@mui/material";
import { useContext } from "react";
import { AccountContext } from "../../context/Account";
import GetAppIcon from "@mui/icons-material/GetApp";

const Sent = styled(Box)`
  background: #b66adc;
  max-width: 60%;
  margin-left: auto;
  padding: 5px;
  width: fit-content;
  display: flex;
  border-radius: 10px;
  word-break: break-word;
`;
const Received = styled(Box)`
  background: #623ecf;
  max-width: 60%;
  margin-right: auto;
  padding: 5px;
  width: fit-content;
  display: flex;
  border-radius: 10px;
  word-break: break-word;
`;

const Text = styled(Typography)`
  font-size: 14px;
  padding: 0 25px 0 5px;
`;

const Time = styled(Typography)`
  font-size: 10px;
  color: #2b0449;
  margin-top: auto;
  word-break: keep-all;
`;

const formatDate = (date) => {
  const hours = new Date(date).getHours();
  const minutes = new Date(date).getMinutes();
  return `${hours < 10 ? "0" + hours : hours}:${
    minutes < 10 ? "0" + minutes : minutes
  }`;
};

const EachMessage = ({ mess }) => {
  const { account } = useContext(AccountContext);

  return (
    <>
      {account._id === mess.senderId ? (
        <Sent>
          {/* {mess.type === "file" ? (
            <ImageMessage mess={mess} />
          ) : (
            <TextMessage mess={mess} />
          )} */}
          <TextMessage mess={mess} />
        </Sent>
      ) : (
        <Received>
          <Text>{mess.text}</Text>
          <Time>{formatDate(mess.createdAt)}</Time>
        </Received>
      )}
    </>
  );
};

const ImageMessage = ({ mess }) => {
  return (
    <Box>
      {mess?.text?.includes(".pdf") ? (
        <Box>{mess.text}</Box>
      ) : (
        <img
          style={{ width: 300, height: "100%", objectFit: "cover" }}
          src={mess.text}
          alt={mess.text}
        />
      )}
      <Time>
        <GetAppIcon />
        {formatDate(mess.createdAt)}
      </Time>
    </Box>
  );
};
const TextMessage = ({ mess }) => {
  return (
    <>
      <Text>{mess.text}</Text>
      <Time>{formatDate(mess.createdAt)}</Time>
    </>
  );
};

export default EachMessage;
