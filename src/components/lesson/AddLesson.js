import { Button, FormGroup, TextField } from "@mui/material";
import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";
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
    // use api utils
    fetch(`${apiUrl}/lesson`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => {
        return response.json();
      })
      .then((responseData) => {
        console.log(responseData);
        // clear form data.
        reset();
      })
      .catch((error) => console.error(error));
  }
  const GetSubjectList = () => {
    console.log("getting subjects");
    // use api util to get
    setSubjectList([]);
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
    </div>
  );
};
export default AddLesson;
