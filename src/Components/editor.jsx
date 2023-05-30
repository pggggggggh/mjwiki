import * as React from "react";
import Box from "@mui/material/Box";
import { useNavigate, useParams } from "react-router-dom";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CustomEditor from "ckeditor5-custom-build/build/ckeditor";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { API_URL } from "../config/constants";
import axios from "axios";

const editorConfiguration = {
  toolbar: [
    "heading",
    "|",
    "bold",
    "italic",
    "strikeThrough",
    "|",
    "link",
    "uploadImage",
    "blockQuote",
    "|",
    "undo",
    "redo",
  ],
};
function Editor() {
  React.useEffect(() => {}, []);

  const navigate = useNavigate();

  const { "*": title } = useParams();
  const [content, setContent] = React.useState([]);
  const [origContent, setOrigContent] = React.useState([]);
  const [changed, setChanged] = React.useState(0);
  const [IP, setIP] = React.useState("");

  React.useEffect(() => {
    axios
      .get(`${API_URL}/w/${title}`)
      .then((result) => {
        console.log(result);
        setContent(result.data === "" ? "" : result.data.content);
        setOrigContent(result.data === "" ? "" : result.data.content);
      })
      .catch((error) => {});

    axios
      .get("https://api.ipify.org?format=json")
      .then((result) => {
        setIP(result.data.ip);
      })
      .catch((error) => {});
  }, []);

  function write() {
    if (origContent === content) {
      navigate("/w/" + title);
      return;
    }
    axios
      .post(`${API_URL}/edit`, {
        title,
        content,
        author: IP,
        at: new Date(),
      })
      .then((result) => {
        console.log("asdf");
        navigate("/w/" + title);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <Box>
      <Typography variant="h2" gutterBottom>
        {title}
      </Typography>
      <CKEditor
        config={editorConfiguration}
        editor={CustomEditor}
        data={content}
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          console.log("Editor is ready to use!", changed);
          setChanged(0);
        }}
        onChange={(event, editor) => {
          console.log("!!");
          setContent(editor.getData());
          setChanged(changed + 1);
        }}
      />

      <Box sx={{ mt: 1, textAlign: "center" }}>
        <Button onClick={write} variant="contained">
          작성
        </Button>
      </Box>
    </Box>
  );
}

export default Editor;
