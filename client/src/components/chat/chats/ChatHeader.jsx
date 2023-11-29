import { Box, Typography, styled } from "@mui/material";
import { Search, MoreVert } from "@mui/icons-material";
import { AccountContext } from "../../context/Account";
import { useContext } from "react";

const Header = styled(Box)`
  height: 44px;
  background: #ededed;
  padding: 8px 16px;
  display: flex;
  align-items: center;
`;

const Image = styled("img")({
  width: 50,
  height: 50,
  borderRadius: "50%",
  padding: "0 14px",
  objectFit: "cover",
});

const Name = styled(Typography)`
  margin-left: 12px !important;
`;

const Status = styled(Typography)`
  margin-left: 12px !important;
  font-size: 12px;
  color: rgba(0, 0, 0, 0.6);
`;

const Icons = styled(Box)`
  margin-left: auto;
  &> svg (
    padding:8px;
    font-size:24px;
  )
`;

const ChatHeader = ({ person }) => {
  const { activeUsers } = useContext(AccountContext);

  return (
    <Header>
      <Image src={person.pic} alt="dp" />
      <Box>
        <Name>{person.name}</Name>
        <Status>
          {activeUsers?.find((user) => user._id === person._id)
            ? "Online"
            : "Offline"}
        </Status>
      </Box>
      <Icons>
        <Search />
        <MoreVert />
      </Icons>
    </Header>
  );
};

export default ChatHeader;
