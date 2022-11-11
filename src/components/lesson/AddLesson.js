import { Autocomplete, Button, FormGroup, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { request } from "../../api/apiUtilities";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
const apiUrl = process.env.REACT_APP_API;
const AddLesson = () => {
  const [subjectList, setSubjectList] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });
  function AddNewLesson(data) {
    console.log(data);
    data = { subjectId: data.subject.value, ...data };
    console.log(data);
    request("post", `${apiUrl}/lesson`, data)
      .then((response) => {
        if (response.ok === true && response.status === 200) {
          toast.success("Lesson Added.");
          reset();
          // ToDo: re fetch and render list?
        } else {
          toast.error("Error Adding Lesson.");
        }
      })
      .catch((error) => console.error(error));
  }
  const GetSubjectList = () => {
    request("get", `${apiUrl}/subject`, {})
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let subjects = data.subjects.map((item) => {
          return { label: item.title, value: item._id };
        });
        setSubjectList(subjects);
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
          <Controller
            control={control}
            name="subject"
            rules={{ required: "Lessons are required to have a Subject." }}
            render={({ field: { onChange, value, ref } }) => (
              <Autocomplete
                // disablePortal
                onChange={(event, item) => {
                  onChange(item);
                }}
                // value={value}
                options={subjectList}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    margin="dense"
                    label="Subject"
                    placeholder="Subject"
                    error={!!errors.subject}
                    helperText={errors.subject ? errors.subject.message : ""}
                  />
                )}
              />
            )}
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
