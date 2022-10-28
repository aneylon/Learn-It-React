import { Button, FormGroup, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { request } from "../../api/apiUtilities";
import { toast } from "react-toastify";
const apiUrl = process.env.REACT_APP_API;
const AddSubject = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const AddNewSubject = (data) => {
    request("post", `${apiUrl}/subject`, data)
      .then((response) => {
        if (response.ok === true && response.status === 200) {
          toast.success("Subject Added.");
          reset();
        } else {
          toast.error("Error Adding Subject");
        }
      })
      .catch((error) => console.error);
  };
  return (
    <div>
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
