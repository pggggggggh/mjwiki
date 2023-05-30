import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React from "react";
import { API_URL } from "../config/constants";
import axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import relativeTime from "dayjs/plugin/relativeTime";
import { Link, useLocation } from "react-router-dom";

dayjs.extend(relativeTime);
dayjs.locale("ko");

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
    fontSize: 18,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function Side() {
  const [recents, setRecents] = React.useState([]);
  const location = useLocation();
  React.useEffect(() => {
    axios
      .get(`${API_URL}/recents`)
      .then((result) => {
        setRecents(result.data);
      })
      .catch((error) => {});
  }, [location]);

  return (
    <TableContainer
      component={Paper}
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>최근 편집</StyledTableCell>
            <StyledTableCell></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {recents.map((recent) => (
            <StyledTableRow key={recent.title}>
              <StyledTableCell component="th" scope="row">
                <Link to={`/w/${recent.title}`}>{recent.title}</Link>
              </StyledTableCell>
              <StyledTableCell align="right">
                {dayjs(recent.at).fromNow()}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default Side;
