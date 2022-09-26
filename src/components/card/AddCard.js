import { useForm } from "react-hook-form";
const apiUrl = process.env.REACT_APP_API;
const AddCard = () => {
  const { register, handleSubmit, reset } = useForm();
  function AddNewCard(data) {
    fetch(`${apiUrl}/cards`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("added : ", data);
        reset();
      })
      .catch((error) => console.error(error));
  }
  return (
    <div>
      Add Card
      <form onSubmit={handleSubmit(AddNewCard)}>
        <input
          type="text"
          placeholder="question"
          {...register("question", { required: true })}
        />
        <input
          type="text"
          placeholder="answer"
          {...register("answer", { required: true })}
        />
        <input
          type="text"
          placeholder="explain"
          {...register("explain", { required: true })}
        />
        {/* <input type="number" {...register("id", { required: true })} /> */}
        <input type="submit" value="Add Card" />
      </form>
    </div>
  );
};
export default AddCard;
