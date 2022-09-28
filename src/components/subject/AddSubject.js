import { useForm } from "react-hook-form";
const apiUrl = process.env.REACT_APP_API;
const AddSubject = () => {
  const { register, handleSubmit } = useForm();
  const AddNewSubject = async (data) => {
    // const response =
    await fetch(`${apiUrl}/subjects`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    // do something based on response?
  };
  return (
    <div>
      Add Subject
      <form onSubmit={handleSubmit(AddNewSubject)}>
        <input
          type="text"
          name="title"
          id="title"
          {...register("title", { required: true })}
        />
        <input
          type="text"
          name="subTitle"
          id="subTitle"
          {...register("subTitle", { required: true })}
        />
        <input
          type="number"
          name="id"
          id="id"
          {...register("id", { required: true })}
        />
        <input type="submit" value="Add" />
      </form>
    </div>
  );
};

export default AddSubject;
