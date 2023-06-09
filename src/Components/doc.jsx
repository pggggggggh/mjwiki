import * as React from "react";
import Box from "@mui/material/Box";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";
import { API_URL } from "../config/constants";
import { Divider, Paper } from "@mui/material";
import ReactHtmlParser from "react-html-parser";
//import ReactHtmlParser from "react-html-parser";

function Doc() {
  const navigate = useNavigate();
  const location = useLocation();
  let redirect;
  let { "*": title } = useParams();
  if (title === undefined) title = "문정위키";
  const [content, setContent] = React.useState([]);
  React.useEffect(() => {
    axios
      .get(`${API_URL}/w/${title}`)
      .then((result) => {
        //console.log(result);
        if (result.data.content.startsWith("<p>{{redirect:")) {
          redirect = result.data.content.split(":")[1].split("}")[0];
          navigate("/w/" + redirect);
        }
        setContent(result.data.content);
      })
      .catch((error) => {
        setContent("");
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
        <Button onClick={() => navigate(`/history/${title}`)}>역사</Button>
      </ButtonGroup>
      <Typography variant="h3">
        {title + (!content ? " : 없는 문서" : "")}
      </Typography>
      <Divider sx={{ mt: 2, mb: 2 }} />
      <div>{ReactHtmlParser(content)}</div>
    </Paper>
  );
}

export default Doc;
