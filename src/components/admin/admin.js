import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Toolbar,
  Typography,
} from "@mui/material";
import AddSubject from "../subject/AddSubject";
import SubjectList from "../subject/SubjectList";
import AddLesson from "../lesson/AddLesson";
import LessonList from "../lesson/LessonList";
import AddCard from "../card/AddCard";
import CardList from "../card/CardList";
import AddCardSet from "../cardSet/AddCardSet";
import CardSetList from "../cardSet/CardSetList";
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
      <Accordion>
        <AccordionSummary>Lesson</AccordionSummary>
        <AccordionDetails>
          <Accordion>
            <AccordionSummary>Add</AccordionSummary>
            <AccordionDetails>
              <AddLesson />
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary>List</AccordionSummary>
            <AccordionDetails>
              <LessonList />
            </AccordionDetails>
          </Accordion>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>Cards</AccordionSummary>
        <AccordionDetails>
          <Accordion>
            <AccordionSummary>Add</AccordionSummary>
            <AccordionDetails>
              <AddCard />
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary>List</AccordionSummary>
            <AccordionDetails>
              <CardList />
            </AccordionDetails>
          </Accordion>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary>Card Set</AccordionSummary>
        <AccordionDetails>
          <Accordion>
            <AccordionSummary>Add</AccordionSummary>
            <AccordionDetails>
              <AddCardSet />
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary>List</AccordionSummary>
            <AccordionDetails>
              <CardSetList />
            </AccordionDetails>
          </Accordion>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};
export default Admin;
