import { Button, FormGroup, TextField, Autocomplete } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { request } from "../../api/apiUtilities";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
const apiUrl = process.env.REACT_APP_API;
const AddCardSet = () => {
  const [cardList, setCardList] = useState();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const AddNewCardSet = (data) => {
    data.cards = [data.card.value];
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
  const GetAllCards = () => {
    request("get", `${apiUrl}/card`, {})
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCardList(
          data.cards.map((card) => {
            return { label: card.question, value: card._id };
          })
        );
      })
      .catch(console.error);
  };
  useEffect(() => {
    GetAllCards();
  }, []);
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
          <Controller
            control={control}
            name="card"
            rules={{ required: "Card Sets are required to have a Card." }}
            render={({ field: { onChange, value, ref } }) => (
              <Autocomplete
                onChange={(event, item) => {
                  onChange(item);
                }}
                options={cardList ?? []}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    required
                    margin="dense"
                    label="Card"
                    placeholder="Card"
                    error={!!errors.card}
                    helperText={errors.card ? errors.card.message : ""}
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

export default AddCardSet;
