import * as React from "react";
import Box from "@mui/material/Box";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function Doc() {
  return (
    <Box>
      <ButtonGroup
        variant="contained"
        color="secondary"
        aria-label="primary button group"
        sx={{ float: "right" }}
      >
        <Button>편집</Button>
        <Button>역사</Button>
      </ButtonGroup>

      <Typography variant="h2" gutterBottom>
        김경탁/논란
      </Typography>
      <Typography variant="body1" gutterBottom>
        2023년 여름학기에 공학수학(2)를 수강하는 기행을 보여 논란이 되었다.
        <br /> 너무 잘생겨서 고려대학교 언어학과 학생들 사이에서 논란이 된 적이
        있다.
      </Typography>
    </Box>
  );
}

export default Doc;
