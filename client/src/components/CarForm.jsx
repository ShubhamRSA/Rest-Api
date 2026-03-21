import { useFormik } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { TextField, Button, Box } from "@mui/material";

const carValidationSchema = z.object({
  make: z.string().min(1, "Make is required"),
  model: z.string().min(1, "Model is required"),
  price: z.coerce.number().positive("Price must be greater than 0"),
});

export const CarForm = ({
  onSubmit,
  initialData = null,
  isLoading = false,
}) => {
  const formik = useFormik({
    initialValues: {
      make: initialData?.make || "",
      model: initialData?.model || "",
      price: initialData?.price || "",
    },
    validationSchema: toFormikValidationSchema(carValidationSchema),
    enableReinitialize: true,
    onSubmit: (values) => {
      onSubmit({
        ...values,
        price: parseFloat(values.price),
      });
    },
  });

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <TextField
        label="Make"
        name="make"
        value={formik.values.make}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.make && !!formik.errors.make}
        helperText={formik.touched.make && formik.errors.make}
        required
      />
      <TextField
        label="Model"
        name="model"
        value={formik.values.model}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.model && !!formik.errors.model}
        helperText={formik.touched.model && formik.errors.model}
        required
      />
      <TextField
        label="Price"
        name="price"
        type="number"
        inputProps={{ step: "0.01" }}
        value={formik.values.price}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.price && !!formik.errors.price}
        helperText={formik.touched.price && formik.errors.price}
        required
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={isLoading || !formik.isValid}
      >
        {initialData ? "Update" : "Create"} Car
      </Button>
    </Box>
  );
};
