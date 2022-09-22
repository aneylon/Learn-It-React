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
  useEffect(() => {
    GetSubjects();
  }, []);
  return (
    <div>
      {subjects.length && (
        <ul>
          {subjects.map((subject) => {
            return (
              <li key={subject.id}>
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
