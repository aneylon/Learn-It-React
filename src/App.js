import "./App.css";
import LessonList from "./components/lesson/LessonList";
import AddSubject from "./components/subject/AddSubject";
import SubjectList from "./components/subject/SubjectList";
import Todo from "./components/todo/todo";

function App() {
  return (
    <div className="App">
      <SubjectList />
      <LessonList subjectId={2} />
      {/*
      <AddSubject />
      <Todo />
      */}
    </div>
  );
}

export default App;
