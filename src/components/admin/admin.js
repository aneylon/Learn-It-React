import AddSubject from "../subject/AddSubject";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Toolbar,
  Typography,
} from "@mui/material";
import SubjectList from "../subject/SubjectList";
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
            <AccordionSummary>List</AccordionSummary>
            <AccordionDetails>
              <SubjectList />
            </AccordionDetails>
          </Accordion>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};
export default Admin;
