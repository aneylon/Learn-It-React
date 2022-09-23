import { useEffect, useState } from "react";
const apiUrl = process.env.REACT_APP_API;
const SubjectList = () => {
  const [subjects, setSubjects] = useState([]);
  function GetSubjects() {
    fetch(`${apiUrl}/subjects`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setSubjects(data);
      })
      .catch((error) => console.error("Error fetching subjects : ", error));
  }
  function SelectSubject(subjectId) {
    console.log("subject selected", subjectId);
    console.log("show or hide lessons");
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
              <li key={subject.id} onClick={() => SelectSubject(subject.id)}>
                <span title={subject.subTitle}>{subject.title}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
export default SubjectList;
