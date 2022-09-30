import { List, ListItem } from "@mui/material";
import { useState, useEffect } from "react";
import Loading from "../loading/Loading";
import SubjectItem from "./SubjectItem";
const apiUrl = process.env.REACT_APP_API;
const SubjectNavigation = () => {
  const [subjects, setSubjects] = useState([]);
  function GetSubjects() {
    fetch(`${apiUrl}/subjects`)
      .then((response) => response.json())
      .then((data) => setSubjects(data))
      .catch((error) => console.error(error));
  }
  useEffect(() => {
    GetSubjects();
  }, []);

  return (
    <div>
      {subjects.length > 0 && (
        <List component="nav">
          {subjects.map((subject) => {
            return (
              <ListItem key={subject.id} disablePadding>
                <SubjectItem subject={subject} />
              </ListItem>
            );
          })}
        </List>
      )}
      {!subjects.length && <Loading />}
    </div>
  );
};

export default SubjectNavigation;
