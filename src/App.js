import "./App.css";
import AddSubject from "./components/subject/AddSubject";
import SubjectList from "./components/subject/SubjectList";
import Todo from "./components/todo/todo";

function App() {
  return (
    <div className="App">
      <AddSubject />
      <SubjectList />
      {/* <Todo /> */}
    </div>
  );
}

export default App;
