import { Button, FormGroup, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
const apiUrl = process.env.REACT_APP_API;
const AddSubject = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const AddNewSubject = async (data) => {
    console.log(errors);
    const response = await fetch(`${apiUrl}/subject`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    console.log(response);
    // do something based on response?
    // clear fields after success
    // display error message if error
  };
  return (
    <div>
      <div>{console.log(errors)}</div>
      <form onSubmit={handleSubmit(AddNewSubject)}>
        <FormGroup>
          <TextField
            label="Title"
            error={!!errors.title}
            helperText={errors.title ? errors.title.message : ""}
            required
            autoFocus
            margin="dense"
            {...register("title", {
              required: "Title is required.",
            })}
          />
          <TextField
            label="Subtitle"
            required
            margin="dense"
            error={!!errors.subTitle}
            helperText={errors.subTitle ? errors.subTitle.message : ""}
            {...register("subTitle", { required: "Subtitle is required." })}
          />
        </FormGroup>
        <Button type="submit" variant="contained">
          Add
        </Button>
      </form>
    </div>
  );
};

export default AddSubject;
