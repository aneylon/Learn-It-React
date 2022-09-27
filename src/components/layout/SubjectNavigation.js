import { useState, useEffect } from "react";
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
        <ul>
          {subjects.map((subject) => {
            return (
              <li key={subject.id}>
                <SubjectItem subject={subject} />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default SubjectNavigation;
