import { List, ListItem } from "@mui/material";
import { useState, useEffect } from "react";
import { request } from "../../api/apiUtilities";
import Loading from "../loading/Loading";
import SubjectItem from "./SubjectItem";
const apiUrl = process.env.REACT_APP_API;
const SubjectNavigation = () => {
  const [subjects, setSubjects] = useState([]);
  function GetSubjects() {
    request("get", `${apiUrl}/subject`, {})
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setSubjects(data.subjects);
      })
      .catch((error) => console.error("subject test error", error));
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
              <ListItem key={subject._id} disablePadding>
                <SubjectItem subject={subject} />
              </ListItem>
            );
          })}
        </List>
      )}
      {subjects.length === 0 && <Loading />}
    </div>
  );
};

export default SubjectNavigation;
