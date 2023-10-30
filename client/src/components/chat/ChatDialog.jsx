import React, { useContext } from "react";
import { Box, styled } from "@mui/material";
import Menu from "./menu/Menu";
import EmptyChat from "./chats/EmptyChat";
import ChatBox from "./chats/ChatBox";
import { AccountContext } from "../context/Account";

const Comp = styled(Box)`
  display: flex;
`;

const LeftPart = styled(Box)`
  min-width: 400px;
`;

const RightPart = styled(Box)`
  min-width: 300px;
  width: 73%;
  height: 100%;
  border-left: 1px solid rgba(0, 0, 0, 0.14);
`;

const ChatDialog = () => {
  const { person } = useContext(AccountContext);

  return (
    <Comp>
      <LeftPart>
        <Menu />
      </LeftPart>
      <RightPart>
        {Object.keys(person).length ? <ChatBox /> : <EmptyChat />}
      </RightPart>
    </Comp>
  );
};

export default ChatDialog;
