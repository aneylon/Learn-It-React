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
const apiUrl = process.env.REACT_APP_API;
const SubjectList = () => {
  const [itemToDelete, setItemToDelete] = useState(null);
  const [titleToEdit, setTitleToEdit] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [subTitleError, setSubTitleError] = useState(false);
  const [subTitleToEdit, setSubTitleToEdit] = useState("");
  const [itemToEdit, setItemToEdit] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
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
  const DeleteItem = (id) => {
    setShowDeleteDialog(true);
    setItemToDelete(id);
  };
  const ConfirmDelete = () => {
    request("delete", `${apiUrl}/subject/${itemToDelete}`, {})
      .then((response) => {
        return response.json();
      })
      .then((data) => {
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
    let item = subjects.find((subject) => subject._id === id);
    setItemToEdit(id);
    setTitleToEdit(item.title);
    setSubTitleToEdit(item.subTitle);
    setShowEditDialog(true);
  };
  const ConfirmEdit = () => {
    request("patch", `${apiUrl}/subject/${itemToEdit}`, {
      title: titleToEdit,
      subTitle: subTitleToEdit,
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        GetSubjects();
      })
      .catch((error) => {
        console.error(error);
      });
    setShowEditDialog(false);
  };
  const CancelEdit = () => {
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
          <TextField
            autoFocus
            margin="dense"
            placeholder="updated title"
            label="Title"
            type="text"
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
            error={titleError}
            helperText={titleError ? "Title Required." : ""}
            onChange={(event) => {
              let val = event.target.value;
              setTitleToEdit(val);
              if (val.length <= 0) {
                setTitleError(true);
              } else {
                setTitleError(false);
              }
            }}
            value={titleToEdit}
          />
          <TextField
            margin="dense"
            placeholder="updated subtitle"
            label="SubTitle"
            name="subTitle"
            type="text"
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
            error={subTitleError}
            helperText={subTitleError ? "SubTitle Required." : ""}
            onChange={(event) => {
              let val = event.target.value;
              setSubTitleToEdit(val);
              if (val.length <= 0) {
                setSubTitleError(true);
              } else {
                setSubTitleError(false);
              }
            }}
            value={subTitleToEdit}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={CancelEdit}>Cancel</Button>
          <Button
            onClick={ConfirmEdit}
            disabled={titleError === true || subTitleError === true}
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default SubjectList;
