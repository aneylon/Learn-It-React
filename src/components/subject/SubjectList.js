import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { request } from "../../api/apiUtilities";
import { useForm } from "react-hook-form";
const apiUrl = process.env.REACT_APP_API;
const SubjectList = () => {
  const [itemToDelete, setItemToDelete] = useState(null);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [titleToEdit, setTitleToEdit] = useState("");
  const [subTitleToEdit, setSubTitleToEdit] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const { register } = useForm();
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
  const DeleteItem = (id) => {
    console.log(`delete ${id}`);
    console.log("show confirm dialog");
    setShowDeleteDialog(true);
    setItemToDelete(id);
  };
  const ConfirmDelete = () => {
    request("delete", `${apiUrl}/subject/${itemToDelete}`, {})
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        GetSubjects();
        setItemToDelete(null);
      })
      .catch((error) => {
        console.error(error);
      });
    setShowDeleteDialog(false);
  };
  const CancelDelete = () => {
    setShowDeleteDialog(false);
    setItemToDelete(null);
  };
  const EditItem = (id) => {
    setItemToEdit(id);
    let item = subjects.find((subject) => subject._id === id);
    setTitleToEdit(item.title);
    setSubTitleToEdit(item.subTitle);
    setShowEditDialog(true);
  };
  const ConfirmEdit = () => {
    // http call to route
    setShowEditDialog(false);
  };
  const CancelEdit = () => {
    setItemToEdit(null);
    setShowEditDialog(false);
  };
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
                          EditItem(subject._id);
                        }}
                      >
                        Edit
                      </Button>
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        onClick={() => {
                          DeleteItem(subject._id);
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
      <Dialog open={showEditDialog} onClose={CancelEdit}>
        <DialogTitle>Edit Item</DialogTitle>
        <DialogContent>
          <form>
            <TextField
              autoFocus
              margin="dense"
              placeholder="updated title"
              label="Title"
              fullWidth
              value={titleToEdit}
              onChange={(event) => {
                setTitleToEdit(event.target.value);
              }}
              // error={}
              // helperText={}
              // {...register("title", { required: "Title is required" })}
            />
            <TextField
              margin="dense"
              placeholder="updated subtitle"
              label="SubTitle"
              fullWidth
              value={subTitleToEdit}
              onChange={(event) => {
                setSubTitleToEdit(event.target.value);
              }}
              // error={}
              // helperText={}
              // {...register("subTitle", { required: "SubTitle is required" })}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={CancelEdit}>Cancel</Button>
          <Button onClick={ConfirmEdit}>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default SubjectList;
