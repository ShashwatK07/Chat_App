import { Box, Drawer, Typography, styled } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Group from "./Group";

const Header = styled(Box)`
  background: #8a25be;
  height: 100px;
  color: #ffffff;
  display: flex;
  & > svg,
  & > p {
    margin-top: auto;
    padding: 15px;
    font-weight: 500;
  }
`;

const Comp = styled(Box)`
  background: #ededed;
  height: 85%;
`;

const drawerStyle = {
  width: 400, // Set your desired width here
};

const GroupDrawer = ({ open, setOpen }) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Drawer open={open} onClose={handleClose} PaperProps={{ sx: drawerStyle }}>
      <Header>
        <ArrowBackIosIcon onClick={handleClose} />
        <Typography>New Group</Typography>
      </Header>
      <Comp>
        <Group />
      </Comp>
    </Drawer>
  );
};

export default GroupDrawer;
