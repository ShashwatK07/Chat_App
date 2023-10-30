import { Box, InputBase, styled } from "@mui/material";
import { EmojiEmotionsOutlined, AttachFileOutlined } from "@mui/icons-material";
import { useEffect } from "react";
import { uploadFile } from "../../service/api";

const Container = styled(Box)`
  height: 55px;
  background: #ededed;
  display: flex;
  width: 95%;
  align-items: center;
  padding: 0 15px;
  & > * {
    margin: 5px;
    color: #919191;
  }
`;

const InputBox = styled(Box)`
  background-color: #ffffff;
  border-radius: 10px;
  width: 94%;
`;

const InputField = styled(InputBase)`
  width: 100%;
  padding: 20px;
  height: 20px;
  padding-left: 25px;
  font-size: 14px;
`;

const Footer = ({
  sendText,
  messageText,
  setMessageText,
  file,
  setFile,
  setImage,
}) => {
  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        let res = await uploadFile(data);
        setImage(res);
      }
    };
    getImage();
  }, [file]);

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessageText(e.target.files[0].name);
  };

  return (
    <Container>
      <EmojiEmotionsOutlined />
      <label htmlFor="fileInput">
        <AttachFileOutlined />
      </label>
      <input
        type="file"
        id="fileInput"
        style={{ display: "none" }}
        onChange={(e) => onFileChange(e)}
      />
      <InputBox>
        <InputField
          placeholder="Type a message"
          onChange={(e) => setMessageText(e.target.value)}
          onKeyDown={(e) => sendText(e)}
          value={messageText}
        />
      </InputBox>
    </Container>
  );
};

export default Footer;
