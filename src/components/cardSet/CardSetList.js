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
import { toast } from "react-toastify";
import { request } from "../../api/apiUtilities";
let apiUrl = process.env.REACT_APP_API;
const CardSetList = () => {
  const [cardSets, setCardSets] = useState([]);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const ConfirmDelete = () => {
    request("delete", `${apiUrl}/cardSet/${itemToDelete}`, {})
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
        GetAllCardSets();
        setItemToDelete(null);
      })
      .catch(console.error);
    setShowDeleteDialog(false);
  };
  const EditItem = (id) => {
    console.log("editing", id);
    setItemToEdit(id);
    setShowEditDialog(true);
  };
  const CancelEdit = () => {
    setShowEditDialog(false);
    setItemToEdit(null);
  };
  const DeleteItem = (id) => {
    setItemToDelete(id);
    setShowDeleteDialog(true);
  };
  const CancelDelete = () => {
    setShowDeleteDialog(false);
    setItemToDelete(null);
  };
  const GetAllCardSets = () => {
    request("get", `${apiUrl}/cardSet`, {})
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCardSets(data.cardSets);
      })
      .catch(console.error);
  };
  useEffect(() => {
    GetAllCardSets();
  }, []);
  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>SubTitle</TableCell>
              <TableCell align="center">Edit</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cardSets.map((cardSet) => {
              return (
                <TableRow key={cardSet._id}>
                  <TableCell>{cardSet.name}</TableCell>
                  <TableCell>{cardSet.subTitle}</TableCell>
                  <TableCell align="center">
                    <Button
                      onClick={() => {
                        EditItem(cardSet._id);
                      }}
                    >
                      Edit
                    </Button>
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      onClick={() => {
                        DeleteItem(cardSet._id);
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
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

export default CardSetList;
