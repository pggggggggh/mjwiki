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
  toolbar: ["bold", "italic", "strikeThrough"],
};
function Editor() {
  React.useEffect(() => {}, []);

  const navigate = useNavigate();

  const [content, setContent] = React.useState([]);

  const { title } = useParams();

  function write() {
    console.log(data);
    axios.post(`${API_URL}/edit`, {
      title,
      content,
      by: "김경탁",
    });
    navigate("/w/" + title);
  }

  return (
    <Box>
      <Typography variant="h2" gutterBottom>
        {title}
      </Typography>
      <CKEditor
        editor={CustomEditor}
        data="<p>Hello from CKEditor 5!</p>"
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
          console.log("Editor is ready to use!", editor);
        }}
        onChange={(event, editor) => {
          setContent(editor.getData());
        }}
        onBlur={(event, editor) => {
          console.log("Blur.", editor);
        }}
        onFocus={(event, editor) => {
          console.log("Focus.", editor);
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
