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
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
  });
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
    setValue("title", item.title);
    setValue("subTitle", item.subTitle);
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
        <form
          onSubmit={handleSubmit((data) => {
            console.log(data);
          })}
        >
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
              error={!!errors.title}
              helperText={errors.title ? errors.title.message : ""}
              {...register("title", {
                required: "Title is required",
                onChange: (e) => {
                  console.log(e);
                  setError("title", { type: "stuff", message: "things" });
                },
              })}
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
              error={!!errors.subTitle}
              helperText={errors.subTitle ? errors.subTitle.message : ""}
              {...register("subTitle", { required: "SubTitle is required" })}
            />
            <>{console.log(errors)}</>
          </DialogContent>
          <DialogActions>
            <Button onClick={CancelEdit}>Cancel</Button>
            <Button onClick={ConfirmEdit}>Update</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};
export default SubjectList;
