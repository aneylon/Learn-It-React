import { useEffect, useState } from "react";
const ToDo = () => {
  const [toDos, setToDos] = useState([]);
  function GetToDos() {
    fetch("http://localhost:3737/todos")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setToDos(data);
      })
      .catch((error) => console.error("Error fetching todos : ", error));
  }
  async function AddToDo(data) {
    const response = await fetch("Http://localhost:3737/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response.json();
  }
  useEffect(() => {
    GetToDos();
  }, []);
  return (
    <div>
      <form>
        <input type={"text"} placeholder="new todo" />
        <input type="submit" value="add" />
      </form>
      Todos :
      {toDos.length >= 0 && (
        <ul>
          {toDos.map((toDo) => {
            return <li key={toDo.id}>{toDo.text} </li>;
          })}
        </ul>
      )}
    </div>
  );
};
export default ToDo;
