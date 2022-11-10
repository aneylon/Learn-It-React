import { Button, FormGroup, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { request } from "../../api/apiUtilities";
import { toast } from "react-toastify";
const apiUrl = process.env.REACT_APP_API;
const AddCardSet = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const AddNewCardSet = (data) => {
    request("post", `${apiUrl}/cardSet`, data)
      .then((response) => {
        if (response.ok === true && response.status === 200) {
          toast.success("Card Set added.");
          reset();
        } else {
          toast.error("Error Adding Card Set");
        }
        return response.json();
      })
      .then((data) => {
        reset();
      })
      .catch((error) => console.error(error));
  };
  return (
    <div>
      Add Card Set
      <form onSubmit={handleSubmit(AddNewCardSet)}>
        <FormGroup>
          <TextField
            label="Name"
            required
            autoFocus
            error={!!errors.name}
            helperText={errors.name ? errors.name.message : ""}
            margin="dense"
            {...register("name", { required: "Name is required" })}
          />
          <TextField
            label="SubTitle"
            required
            autoFocus
            error={!!errors.subTitle}
            helperText={errors.subTitle ? errors.subTitle.message : ""}
            margin="dense"
            {...register("subTitle", { required: "SubTitle is required" })}
          />
        </FormGroup>
        <Button type="submit" variant="contained">
          Add
        </Button>
      </form>
    </div>
  );
};

export default AddCardSet;
