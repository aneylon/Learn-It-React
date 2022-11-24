import { Autocomplete, Button, FormGroup, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { request } from "../../api/apiUtilities";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
const apiUrl = process.env.REACT_APP_API;
const AddLesson = () => {
  const [subjectList, setSubjectList] = useState([]);
  const [cardSetList, setCardSetList] = useState([]);

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
    data = {
      subjectId: data.subject.value,
      cardSetId: data.cardSetId.value,
      title: data.title,
      subTitle: data.subTitle,
    };
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
  const GetCardSetList = () => {
    request("get", `${apiUrl}/cardSet`, {})
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        let cardSets = data.cardSets.map((item) => {
          return { label: item.name, value: item._id };
        });
        setCardSetList(cardSets);
      })
      .catch(console.error);
  };
  useEffect(() => {
    GetSubjectList();
    GetCardSetList();
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
                onChange={(event, item) => {
                  onChange(item);
                }}
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
          <Controller
            control={control}
            name="cardSetId"
            rules={{ required: "A Card Set is required for a lesson." }}
            render={({ field: { onChange } }) => (
              <Autocomplete
                onChange={(event, item) => {
                  onChange(item);
                }}
                options={cardSetList}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    margin="dense"
                    label="Card Set"
                    placeholder="Card Set"
                    error={!!errors.cardSetId}
                    helperText={
                      errors.cardSetId ? errors.cardSetId.message : ""
                    }
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
