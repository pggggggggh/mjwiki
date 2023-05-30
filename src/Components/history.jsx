import { Button, ButtonGroup, Divider, Paper, Typography } from "@mui/material";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import * as React from "react";
import axios from "axios";
import { API_URL } from "../config/constants";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import dayjs from "dayjs";

function History() {
  const navigate = useNavigate();
  const location = useLocation();
  const { "*": title } = useParams();
  const [content, setContent] = React.useState([]);
  const [history, setHistory] = React.useState([]);
  React.useEffect(() => {
    axios
      .get(`${API_URL}/w/${title}`)
      .then((result) => {
        setContent(result.data.content);
      })
      .catch((error) => {
        setContent("");
      });

    axios
      .get(`${API_URL}/history/${title}`)
      .then((result) => {
        console.log(result.data);
        setHistory(result.data);
      })
      .catch((error) => {
        setHistory("");
      });
  }, [location]);
  return (
    <Paper sx={{ padding: 3 }}>
      <ButtonGroup
        variant="contained"
        color="secondary"
        aria-label="primary button group"
        sx={{ float: "right" }}
      >
        <Button onClick={() => navigate(`/edit/${title}`)}>
          {!content ? "생성" : "편집"}
        </Button>
        <Button onClick={() => navigate(`/w/${title}`)}>문서</Button>
      </ButtonGroup>
      <Typography variant="h2">{title}</Typography>
      <Divider sx={{ mt: 2, mb: 2 }} />
      {history.map((item) => (
        <div align="center">
          <Link to={`/view/${item.id}`}>
            {item.id} {dayjs(item.at).format("YYYY-MM-DD HH:mm:ss")} 글쓴이:
            {item.author}
          </Link>
        </div>
      ))}
    </Paper>
  );
}
export default History;
