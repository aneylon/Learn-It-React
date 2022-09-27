import { useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../loading/Loading";
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
    <div title={subject.subTitle}>
      <p
        onClick={() => {
          ToggleLessons(subject.id);
        }}
      >
        {subject.title}
      </p>
      {displayLessons && (
        <ul>
          {!lessons.length && <Loading />}
          {lessons.map((lesson) => {
            return (
              <li key={lesson.id}>
                <Link to={`/flashCards/${lesson.id}`} title={lesson.subTitle}>
                  {lesson.title}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
export default SubjectItem;
