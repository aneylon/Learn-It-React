import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
const apiUrl = process.env.REACT_APP_API;
const SubjectList = () => {
  const [subjects, setSubjects] = useState([]);
  function GetSubjects() {
    fetch(`${apiUrl}/subject`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setSubjects(data.subjects);
      })
      .catch((error) => console.error("Error fetching subjects : ", error));
  }
  useEffect(() => {
    GetSubjects();
  }, []);
  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>SubTitle</TableCell>
              <TableCell align="center">Edit</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          {subjects.length > 0 && (
            <TableBody>
              {subjects.map((subject) => {
                return (
                  <TableRow key={subject._id}>
                    <TableCell>{subject.title}</TableCell>
                    <TableCell>{subject.subTitle}</TableCell>
                    <TableCell align="center">
                      <Button
                        onClick={() => {
                          console.log(`edit: ${subject._id}`);
                        }}
                      >
                        Edit
                      </Button>
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        onClick={() => {
                          console.log(`delete: ${subject._id}`);
                        }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </div>
  );
};
export default SubjectList;
