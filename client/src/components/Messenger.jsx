import { useContext, useEffect } from "react";
import ChatDialog from "./chat/ChatDialog";
import { AccountContext } from "./context/Account";
import { currentUser } from "./service/api";

const Messenger = () => {
  
  return <ChatDialog></ChatDialog>;
};

export default Messenger;
