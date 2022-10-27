import { Button, FormGroup, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { request } from "../../api/apiUtilities";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const apiUrl = process.env.REACT_APP_API;
const AddLesson = () => {
  const [subjectList, setSubjectList] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onChange",
  });
  function AddNewLesson(data) {
    request("post", `${apiUrl}/lesson`, data)
      .then((response) => {
        if (response.ok === true && response.status === 200) {
          toast.success("Lesson Added.");
          reset();
          // re fetch and render list?
        } else {
          toast.error("Error Adding Lesson.");
        }
      })
      .catch((error) => console.error(error));
  }
  const GetSubjectList = () => {
    request("get", `${apiUrl}/subject`, {})
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data.subjects);
        setSubjectList(data.subjects);
      })
      .catch(console.error);
  };
  useEffect(() => {
    GetSubjectList();
  }, []);
  return (
    <div>
      <form onSubmit={handleSubmit(AddNewLesson)}>
        <FormGroup>
          <TextField
            label="Title"
            error={!!errors.title}
            helperText={errors.title ? errors.title.message : ""}
            required
            autoFocus
            margin="dense"
            {...register("title", { required: "Title is required." })}
          />
          <TextField
            label="SubTitle"
            error={!!errors.subTitle}
            helperText={errors.subTitle ? errors.subTitle.message : ""}
            required
            autoFocus
            margin="dense"
            {...register("subTitle", { required: "SubTitle is required." })}
          />
          <TextField
            label="SubjectId"
            error={!!errors.subjectId}
            helperText={errors.subjectId ? errors.subjectId.message : ""}
            required
            autoFocus
            margin="dense"
            {...register("subjectId", { required: "SubjectId is required." })}
          />
        </FormGroup>
        <Button type="submit" variant="contained">
          Add
        </Button>
      </form>
      <ToastContainer />
    </div>
  );
};
export default AddLesson;
