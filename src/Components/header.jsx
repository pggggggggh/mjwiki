import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AdbIcon from "@mui/icons-material/Adb";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Autocomplete,
  Button,
  ListItemButton,
  createFilterOptions,
} from "@mui/material";
import axios from "axios";
import { API_URL } from "../config/constants";

const LogoWrapper = styled("div")(({ theme }) => ({
  flexGrow: 1,
  display: { xs: "none", sm: "block" },
  display: "flex",
  alignItems: "center",
}));

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  marginRight: theme.spacing(1),
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "25ch",
      // "&:focus": {
      //   width: "20ch",
      // },
    },
  },
}));

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = React.useState("");
  const [docList, setDocList] = React.useState([]);
  React.useEffect(() => {
    axios
      .get(`${API_URL}/alldocs`)
      .then((result) => {
        setDocList(result.data);
      })
      .catch((error) => {});
  }, [location]);

  const onChange = (e) => {
    setSearch(e.target.value);
  };
  const filterOptions = createFilterOptions({
    matchFrom: "start",
    stringify: (option) => option.title,
  });
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <LogoWrapper>
            <a href="/">
              <Box
                component="img"
                alt="문정위키"
                src="/images/logo.png"
                sx={{ height: 30, mr: 2 }}
              />
            </a>
          </LogoWrapper>

          <Box>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <Autocomplete
                open={search.length >= 1}
                disableClearable
                clearOnEscape
                noOptionsText=""
                options={docList}
                onChange={(e, value) => {
                  navigate(`w/${value.title}`);
                }}
                getOptionLabel={(option) => option.title}
                isOptionEqualToValue={(option, value) => {
                  return true;
                }}
                renderInput={(params) => (
                  <StyledInputBase
                    ref={params.InputProps.ref}
                    inputProps={params.inputProps}
                    placeholder="검색"
                    onChange={onChange}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        if (search) navigate(`/w/${search}`);
                      }
                    }}
                  />
                )}
              />
            </Search>
          </Box>

          <Button color="inherit" onClick={() => navigate("/login/")}>
            로그인
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
