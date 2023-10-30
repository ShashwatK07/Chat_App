import { Box, Typography, styled } from "@mui/material";

const Comp = styled(Box)`
  background: #f8f9fa;
  padding: 30px 0;
  text-algin: center;
  height = 100%;
  justify-content:center;
`;

const EmptyChat = () => {
  return (
    <Box>
      <Comp>
        <Typography>Send and Recieve messages in a secure way</Typography>
      </Comp>
    </Box>
  );
};

export default EmptyChat;
