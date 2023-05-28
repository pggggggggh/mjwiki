import { Routes, Route, Link, useNavigate } from "react-router-dom";
import React from "react";
import HeaderComponent from "./Components/header";
import DocComponent from "./Components/doc";
import SideComponent from "./Components/side";
import LoginPage from "./Pages/login";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import CssBaseline from "@mui/material/CssBaseline";
import "./App.css";

function App() {
  const navigate = useNavigate();
  const theme = createTheme({
    palette: {
      primary: {
        main: "#00ADB5",
        contrastText: "#fff", //button text white instead of black
      },
      secondary: {
        // This is green.A700 as hex.
        main: "#393E46",
      },
    },
    typography: {
      fontFamily: "'Noto Sans KR', sans-serif",
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box>
        <HeaderComponent />
        <Box
          component="main"
          sx={{
            padding: 3,
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Routes>
            <Route exact={true} path={"/login"} element={<LoginPage />} />
            <Route
              exact={true}
              path={"/"}
              element={
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={8}>
                    <DocComponent />
                  </Grid>
                  <Grid
                    item
                    xs={4}
                    sm={0}
                    sx={{
                      display: { xs: "none", sm: "block" },
                    }}
                  >
                    <SideComponent />
                  </Grid>
                </Grid>
              }
            />
          </Routes>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
