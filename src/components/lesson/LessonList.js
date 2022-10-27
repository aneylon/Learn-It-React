import { useEffect, useState } from "react";
let apiUrl = process.env.REACT_APP_API;
const LessonList = ({ subjectId }) => {
  const [lessons, setLessons] = useState([]);
  function GetLessonsFor(subjectId) {
    fetch(`${apiUrl}/lessons?subjectId=${subjectId}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setLessons(data);
      })
      .catch((error) => console.error(error));
  }
  const GetAllLessons = () => {
    console.log("get all lessons");
  };
  useEffect(() => {
    // GetLessonsFor(subjectId);
    GetAllLessons();
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
