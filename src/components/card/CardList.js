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
const CardList = () => {
  const [itemToDelete, setItemToDelete] = useState(null);
  const [itemToEdit, setItemToEdit] = useState(null);
  const [questionToEdit, setQuestionToEdit] = useState("");
  const [answerToEdit, setAnswerToEdit] = useState("");
  const [explainToEdit, setExplainToEdit] = useState("");
  const [questionError, setQuestionError] = useState(false);
  const [answerError, setAnswerError] = useState(false);
  const [explainError, setExplainError] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [cards, setCards] = useState([]);
  const GetAllCards = () => {
    request("get", `${apiUrl}/card`, {})
      .then((response) => response.json())
      .then((data) => {
        setCards(data.cards);
      });
  };
  const ConfirmEdit = () => {
    console.log("change it up");
  };
  const ConfirmDelete = () => {
    request("delete", `${apiUrl}/card/${itemToDelete}`, {})
      .then((response) => {
        if (response.ok === true && response.status === 200) {
          toast.success("Deleted item.");
        } else {
          toast.error("Unable to delete item.");
        }
        GetAllCards();
        setItemToDelete(null);
      })
      .catch(console.error);
    setShowDeleteDialog(false);
  };
  const EditItem = (id) => {
    console.log("edit", id);
    let item = cards.find((card) => card._id === id);
    setItemToEdit(id);
    setQuestionToEdit(item.question);
    setAnswerToEdit(item.answer);
    setExplainToEdit(item.explain);
    setShowEditDialog(true);
  };
  const DeleteItem = (id) => {
    console.log("delete", id);
    setShowDeleteDialog(true);
    setItemToDelete(id);
  };
  const CancelDelete = () => {
    setShowDeleteDialog(false);
    setItemToDelete(null);
  };
  const CancelEdit = () => {
    setShowEditDialog(false);
    setItemToEdit(null);
  };
  useEffect(() => {
    GetAllCards();
  }, []);
  return (
    <div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Question</TableCell>
              <TableCell>Answer</TableCell>
              <TableCell>Explanation</TableCell>
              <TableCell align="center">Edit</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          {cards.length > 0 && (
            <TableBody>
              {cards.map((card) => {
                return (
                  <TableRow key={card._id}>
                    <TableCell>{card.question}</TableCell>
                    <TableCell>{card.answer}</TableCell>
                    <TableCell>{card.explain}</TableCell>
                    <TableCell align="center">
                      <Button
                        onClick={() => {
                          EditItem(card._id);
                        }}
                      >
                        Edit
                      </Button>
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        onClick={() => {
                          DeleteItem(card._id);
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
            placeholder="Updated Question"
            label="Question"
            type="text"
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
            error={questionError}
            helperText={questionError ? "Question Required." : ""}
            onChange={(event) => {
              let val = event.target.value;
              setQuestionToEdit(val);
              if (val.length <= 0) {
                setQuestionError(true);
              } else {
                setQuestionError(false);
              }
            }}
            value={questionToEdit}
          />
          <TextField
            margin="dense"
            placeholder="Updated Answer"
            label="Answer"
            name="answer"
            type="text"
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
            error={answerError}
            helperText={answerError ? "Answer Required." : ""}
            onChange={(event) => {
              let val = event.target.value;
              setAnswerToEdit(val);
              if (val.length <= 0) {
                setAnswerError(true);
              } else {
                setAnswerError(false);
              }
            }}
            value={answerToEdit}
          />
          <TextField
            margin="dense"
            placeholder="Updated Explanation"
            label="Explanation"
            name="explain"
            type="text"
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
            error={explainError}
            helperText={explainError ? "Explanation Required." : ""}
            onChange={(event) => {
              let val = event.target.value;
              setExplainToEdit(val);
              if (val.length <= 0) {
                setExplainError(true);
              } else {
                setExplainError(false);
              }
            }}
            value={explainToEdit}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={CancelEdit}>Cancel</Button>
          <Button
            onClick={ConfirmEdit}
            disabled={
              explainError === true ||
              answerError === true ||
              questionError === true
            }
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default CardList;
