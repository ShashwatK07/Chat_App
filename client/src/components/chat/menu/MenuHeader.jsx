import { Box, styled } from "@mui/material";
import { Chat as MessageIcon, GroupAdd } from "@mui/icons-material";
import GroupDrawer from "../../drawer/GroupDrawer";
import { useContext, useState } from "react";
import { AccountContext } from "../../context/Account";
// import DropMenu from "./DropMenu";

const Comp = styled(Box)`
  height: 44px;
  background: #ededed;
  padding: 8px 16px;
  display: flex;
  align-items: center;
`;

const Wrapper = styled(Box)`
  margin-left: auto;
  & > * {
    margin-left: 4px;
    padding: 4px;
    color: #000;
  }
`;

const MenuHeader = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const { account } = useContext(AccountContext);

  const toggleDrawer = () => {
    setOpenDrawer(true);
  };

  return (
    <>
      <Comp>
        <Box>{account.name}</Box>
        <Wrapper>
          <MessageIcon />
          <GroupAdd onClick={toggleDrawer} />
          {/* <DropMenu /> */}
        </Wrapper>
      </Comp>
      <GroupDrawer open={openDrawer} setOpen={setOpenDrawer} />
    </>
  );
};
export default MenuHeader;
