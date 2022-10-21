import AddSubject from "../subject/AddSubject";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  FormGroup,
  Toolbar,
  Typography,
} from "@mui/material";
const Admin = () => {
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 5, marginLeft: 15 }}>
      <Toolbar />
      <Typography>Admin</Typography>
      <Accordion>
        <AccordionSummary>Subject</AccordionSummary>
        <AccordionDetails>
          <Accordion>
            <AccordionSummary>Add</AccordionSummary>
            <AccordionDetails>
              <AddSubject />
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary>Edit</AccordionSummary>
            <AccordionDetails>Change it up</AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary>List</AccordionSummary>
            <AccordionDetails>List it out</AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary>Delete</AccordionSummary>
            <AccordionDetails>Remove it</AccordionDetails>
          </Accordion>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};
export default Admin;
