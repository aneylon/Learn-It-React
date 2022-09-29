import { useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../loading/Loading";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

let apiUrl = process.env.REACT_APP_API;

const SubjectItem = ({ subject }) => {
  const [displayLessons, setDisplayLessons] = useState(false);
  const [lessons, setLessons] = useState([]);
  function LoadLessons(subjectId) {
    fetch(`${apiUrl}/lessons?subjectId=${subjectId}`)
      .then((response) => response.json())
      .then((data) => setLessons(data))
      .catch((error) => console.error(error));
  }
  function ToggleLessons(subjectId) {
    // don't load multiple times?
    setDisplayLessons(!displayLessons);
    LoadLessons(subjectId);
  }
  return (
    <div>
      <ListItemButton
        onClick={() => {
          ToggleLessons(subject.id);
        }}
      >
        <ListItemText primary={subject.title} title={subject.subTitle} />
        {displayLessons ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      {displayLessons && (
        <List component="div" disablePadding>
          {!lessons.length && <Loading />}
          {lessons.map((lesson) => {
            return (
              // <ListItem key={lesson.id}>
              <ListItemButton sx={{ pl: 4 }} key={lesson.id}>
                <Link to={`/flashCards/${lesson.id}`} title={lesson.subTitle}>
                  <ListItemText
                    primary={lesson.title}
                    title={lesson.subTitle}
                  />
                </Link>
              </ListItemButton>
              // </ListItem>
            );
          })}
        </List>
      )}
    </div>
  );
};
export default SubjectItem;
