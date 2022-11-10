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
  const GetAllCardSets = () => {
    console.log("get em");
    request("get", `${apiUrl}/cardSet`, {})
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setCardSets(data.cardSets);
      })
      .catch(console.error);
  };
  const EditItem = (id) => {
    console.log("editing", id);
  };
  const DeleteItem = (id) => {
    console.log("deleting", id);
  };
  useEffect(() => {
    GetAllCardSets();
  }, []);
  return (
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
  );
};

export default CardSetList;
