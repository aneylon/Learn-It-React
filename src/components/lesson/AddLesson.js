import { useForm } from "react-hook-form";
const apiUrl = process.env.REACT_APP_API;
const AddLesson = () => {
  const { register, handleSubmit } = useForm();
  function AddNewLesson(data) {
    fetch(`${apiUrl}/lessons`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {})
      .catch((error) => console.error(error));
  }
  return (
    <div>
      Add Lesson
      <form onSubmit={handleSubmit(AddNewLesson)}>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="title"
          {...register("title", { required: true })}
        />
        <input
          type="text"
          name="subTitle"
          id="subTitle"
          placeholder="subTitle"
          {...register("subTitle", { required: true })}
        />
        <input
          type="number"
          name="id"
          id="id"
          placeholder="id"
          {...register("id", { required: true })}
        />
        <input
          type="number"
          name="subjectId"
          id="subjectId"
          placeholder="subjectId"
          {...register("subjectId", { required: true })}
        />
        <input type="submit" value="Add" />
      </form>
    </div>
  );
};
export default AddLesson;
