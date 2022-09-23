import { useEffect, useState } from "react";

const SubjectList = () => {
  const [subjects, setSubjects] = useState([]);
  function GetSubjects() {
    console.log("getting subjects");
    fetch("http://localhost:3737/subjects")
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data);
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
