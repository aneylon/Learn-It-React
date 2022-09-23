import "./App.css";
import AddLesson from "./components/lesson/AddLesson";
import LessonList from "./components/lesson/LessonList";
import AddSubject from "./components/subject/AddSubject";
import SubjectList from "./components/subject/SubjectList";
import Todo from "./components/todo/todo";

function App() {
  return (
    <div className="App">
      <AddLesson />
      <LessonList subjectId={2} />
      {/*
      <SubjectList />
      <AddSubject />
      <Todo />
      */}
    </div>
  );
}

export default App;
