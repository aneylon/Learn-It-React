import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { request } from "../../api/apiUtilities";

let apiUrl = process.env.REACT_APP_API;
const LessonList = ({ subjectId }) => {
  const [lessons, setLessons] = useState([]);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const ConfirmDelete = () => {
    request("delete", `${apiUrl}/lesson/${itemToDelete}`, {})
      .then((response) => {
        if (response.ok === true && response.status === 200) {
          toast.success("Deleted item");
        } else {
          toast.error("Unable to delete item");
        }
        return response.json();
      })
      .then((data) => {
        // do something with data?
        GetAllLessons();
        setItemToDelete(null);
      })
      .catch(console.error);
    setShowDeleteDialog(false);
  };
  const CancelDelete = () => {
    setShowDeleteDialog(false);
    setItemToDelete(null);
  };
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
    setItemToDelete(id);
    setShowDeleteDialog(true);
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
      <Dialog open={showDeleteDialog} onClose={CancelDelete}>
        <DialogTitle>Delete Item?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you to delete this item?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={CancelDelete}>Cancel</Button>
          <Button onClick={ConfirmDelete}>Ok</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default LessonList;
