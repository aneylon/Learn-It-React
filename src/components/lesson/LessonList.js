import { useEffect, useState } from "react";
let apiUrl = process.env.REACT_APP_API;
const LessonList = ({ subjectId }) => {
  const [lessons, setLessons] = useState([]);
  function GetLessonsFor(subjectId) {
    console.log("get lessons for subject id : ", subjectId);
    fetch(`${apiUrl}/lessons?subjectId=${subjectId}`)
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setLessons(data);
      })
      .catch((error) => console.error(error));
  }
  useEffect(() => {
    GetLessonsFor(subjectId);
  }, []);
  return (
    <div>
      Lesson List : {subjectId}
      {lessons.length > 0 && (
        <ul>
          {lessons.map((lesson) => {
            return (
              <li key={lesson.id}>
                <span title={lesson.subTitle}>{lesson.title}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
export default LessonList;
