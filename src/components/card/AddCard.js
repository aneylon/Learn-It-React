import { useForm } from "react-hook-form";
import { Button, FormGroup, TextField } from "@mui/material";
import { request } from "../../api/apiUtilities";
import { toast } from "react-toastify";
const apiUrl = process.env.REACT_APP_API;
const AddCard = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });
  function AddNewCard(data) {
    request("post", `${apiUrl}/card`, data)
      .then((response) => {
        if (response.ok === true && response.status === 200) {
          toast.success("Card added.");
          reset();
        } else {
          toast.error("Error Adding Card");
        }
        return response.json();
      })
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
        <FormGroup>
          <TextField
            label="Question"
            error={!!errors.question}
            helperText={errors.question ? errors.question.message : ""}
            required
            autoFocus
            margin="dense"
            {...register("question", {
              required: "Question is required.",
            })}
          />
          <TextField
            label="Answer"
            error={!!errors.answer}
            helperText={errors.answer ? errors.answer.message : ""}
            required
            autoFocus
            margin="dense"
            {...register("answer", {
              required: "Answer is required.",
            })}
          />
          <TextField
            label="Explain"
            error={!!errors.explain}
            helperText={errors.explain ? errors.explain.message : ""}
            required
            autoFocus
            margin="dense"
            {...register("explain", {
              required: "Explaination is required.",
            })}
          />
        </FormGroup>
        <Button type="submit" variant="contained">
          Add
        </Button>
      </form>
    </div>
  );
};
export default AddCard;
