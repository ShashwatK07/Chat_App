import { Box, styled, InputBase } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Comp = styled(Box)`
  background: #fff;
  height: 45px;
  border-bottom: 1px solid #f2f2f2;
  display: flex;
  align-items: center;
`;

const Wrapper = styled(Box)`
  background: #f0f2f5;
  position: relative;
  margin: 0 13px;
  display: flex;
  border-radius: 10px;
  width: 100%;
`;

const Icon = styled(Box)`
  position: absolute;
  height: 100%;
  padding: 6px 10px;
  color: #919191;
`;
const InputField = styled(InputBase)`
  width: 100%;
  padding: 16px;
  padding-left: 65px;
  height: 15px;
  font-size: 14px;
`;

const Search = ({ setText }) => {
  return (
    <Comp>
      <Wrapper>
        <Icon>
          <SearchIcon fontSize="small" />
        </Icon>
        <InputField
          placeholder="Search"
          onChange={(e) => setText(e.target.value)}
        />
      </Wrapper>
    </Comp>
  );
};

export default Search;
