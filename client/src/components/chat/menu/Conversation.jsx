import { useContext, useEffect, useState } from "react";
import { getUserFriends } from "../../service/api";
import { Box, styled, Divider } from "@mui/material";
import Convo from "./Convo";
import { AccountContext } from "../../context/Account";

const Comp = styled(Box)`
  height: 81vh;
  overflow: overlay;
`;

const StyledDivider = styled(Divider)`
  margin: 0 0 0 70px;
  background: #e9edef;
  opacity: 0.6;
`;

const Coversation = ({ text }) => {
  const [users, setUsers] = useState([]);
  const { account, socket, setActiveUsers } = useContext(AccountContext);

  useEffect(() => {
    const fetchData = async () => {
      let res = await getUserFriends(account);
      const filterUser = res.filter((user) =>
        user.name.toLowerCase().includes(text.toLowerCase())
      );
      setUsers(filterUser);
    };
    fetchData();
  }, [text]);

  useEffect(() => {
    socket.current.emit("addUser", account);
    socket.current.on("getUsers", (users) => {
      setActiveUsers(users);
    });
  }, [account]);

  return (
    <Comp>
      {users.map((user) => (
        <>
          <Convo user={user} key={user._id} />
          <StyledDivider />
        </>
      ))}
    </Comp>
  );
};

export default Coversation;
