import * as React from "react";
import Box from "@mui/material/Box";
import { Link, useNavigate, useParams } from "react-router-dom";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function Doc() {
  const navigate = useNavigate();
  const { title } = useParams();

  const [content, setContent] = React.useState([]);
  React.useEffect(() => {}, []);

  return (
    <Box>
      <ButtonGroup
        variant="contained"
        color="secondary"
        aria-label="primary button group"
        sx={{ float: "right" }}
      >
        <Button
          onClick={() => {
            navigate("/edit/" + title);
          }}
        >
          편집
        </Button>
        <Button>역사</Button>
      </ButtonGroup>

      <Typography variant="h2" gutterBottom>
        {title}
      </Typography>
    </Box>
  );
}

export default Doc;
