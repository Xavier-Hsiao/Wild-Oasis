import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin, updateCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

function CreateCabinForm({ cabinToEdit = {} }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: isEditSession ? updateCabin : createCabin,
    onSuccess: (data) => {
      console.log(data);
      toast.success(
        isEditSession
          ? "Cabin updated successfully"
          : "New cabin created successfully!"
      );
      // So new cabin appears in UI without manual refresh
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset(data);
    },
    // Error threw by createCabin api
    onError: (err) => {
      toast.error(err.message);
    },
  });
  // Errors threw by form
  const { errors } = formState;

  function onSubmit(data) {
    // Pass image to databases
    mutate(
      isEditSession
        ? // data.image is string
          { ...data, image: data.image, id: editId }
        : // data.image[0] is object
          { ...data, image: data.image[0] }
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isLoading}
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.max_capacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isLoading}
          {...register("max_capacity", {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regular_price?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isLoading}
          {...register("regular_price", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          disabled={isLoading}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              +value <= +getValues("regular_price") ||
              "Discount should be less than regular price",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          disabled={isLoading}
          {...register("description", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          accept="image/*"
          disabled={isLoading}
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isLoading}>
          {isEditSession ? "Edit cabin" : "Add cabin"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
