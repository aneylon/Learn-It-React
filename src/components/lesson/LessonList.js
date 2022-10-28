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
import { request } from "../../api/apiUtilities";

let apiUrl = process.env.REACT_APP_API;
const LessonList = ({ subjectId }) => {
  const [lessons, setLessons] = useState([]);
  const GetAllLessons = () => {
    request("get", `${apiUrl}/lesson`, {})
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setLessons(data.lessons);
      })
      .catch(console.error);
  };
  const EditItem = (id) => {
    console.log("edit ", id);
  };
  const DeleteItem = (id) => {
    console.log("delete  ", id);
  };
  useEffect(() => {
    GetAllLessons();
  }, []);
  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>SubTitle</TableCell>
              <TableCell>Subject</TableCell>
              <TableCell align="center">Edit</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          {lessons.length > 0 && (
            <TableBody>
              {lessons.map((lesson) => {
                return (
                  <TableRow key={lesson._id}>
                    <TableCell>{lesson.title}</TableCell>
                    <TableCell>{lesson.subTitle}</TableCell>
                    <TableCell>{lesson.subjectId}</TableCell>
                    <TableCell align="center">
                      <Button
                        onClick={() => {
                          EditItem(lesson._id);
                        }}
                      >
                        Edit
                      </Button>
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        onClick={() => {
                          DeleteItem(lesson._id);
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
export default LessonList;
