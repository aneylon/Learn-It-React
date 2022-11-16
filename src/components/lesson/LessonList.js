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
  TextField,
  Autocomplete,
} from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { request } from "../../api/apiUtilities";

let apiUrl = process.env.REACT_APP_API;
const LessonList = () => {
  const [lessons, setLessons] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [subjectsDropDownList, setSubjectsDropDownList] = useState([]);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [subTitleError, setSubTitleError] = useState(false);
  const [titleToEdit, setTitleToEdit] = useState(null);
  const [subTitleToEdit, setSubTitleToEdit] = useState(null);
  const [subjectToEdit, setSubjectToEdit] = useState(null);

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
  const ConfirmEdit = () => {
    request("patch", `${apiUrl}/lesson/${itemToEdit}`, {
      title: titleToEdit,
      subTitle: subTitleToEdit,
      subjectId: subjectToEdit.value,
    })
      .then((response) => {
        if (response.ok === true && response.status === 200) {
          toast.success("Item updated.");
          GetAllLessons();
        } else {
          toast.error("Unable to update item.");
        }
        return response.json();
      })
      .catch(console.error);
    setShowEditDialog(false);
  };
  const CancelDelete = () => {
    setShowDeleteDialog(false);
    setItemToDelete(null);
  };
  const CancelEdit = () => {
    setShowEditDialog(false);
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
  const GetAllSubjects = () => {
    request("get", `${apiUrl}/subject`, {})
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setSubjects(data.subjects);
        setSubjectsDropDownList(
          data.subjects.map((item) => {
            return { label: item.title, value: item._id };
          })
        );
      })
      .catch(console.error);
  };
  const EditItem = (id) => {
    let item = lessons.find((lesson) => lesson._id === id);
    setItemToEdit(id);
    setTitleToEdit(item.title);
    setSubTitleToEdit(item.subTitle);
    setSubjectToEdit(
      subjectsDropDownList.find((subject) => subject.value === item.subjectId)
    );
    setShowEditDialog(true);
  };
  const DeleteItem = (id) => {
    setItemToDelete(id);
    setShowDeleteDialog(true);
  };
  useEffect(() => {
    GetAllLessons();
    GetAllSubjects();
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
                let subject = subjects.find(
                  (item) => item._id === lesson.subjectId
                );
                return (
                  <TableRow key={lesson._id}>
                    <TableCell>{lesson.title}</TableCell>
                    <TableCell>{lesson.subTitle}</TableCell>
                    <TableCell>{subject.title ?? ""}</TableCell>
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
          <Autocomplete
            disableClearable
            onChange={(event, item) => {
              setSubjectToEdit(item);
            }}
            value={subjectToEdit}
            options={subjectsDropDownList}
            renderInput={(params) => (
              <TextField
                {...params}
                required
                margin="dense"
                label="Subject"
                placeholder="Subject"
              />
            )}
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
export default LessonList;
