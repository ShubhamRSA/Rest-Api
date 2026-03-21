import { useFormik } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import {
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useSelector } from "react-redux";

const personValidationSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z
    .string()
    .refine(
      (value) => value === "" || z.string().email().safeParse(value).success,
      "Email is invalid",
    )
    .optional(),
  car_uid: z.string().optional(),
});

export const PersonForm = ({
  onSubmit,
  initialData = null,
  isLoading = false,
}) => {
  const cars = useSelector((state) => state.car.cars);

  const formik = useFormik({
    initialValues: {
      first_name: initialData?.first_name || "",
      last_name: initialData?.last_name || "",
      email: initialData?.email || "",
      car_uid: initialData?.car_uid || "",
    },
    validationSchema: toFormikValidationSchema(personValidationSchema),
    enableReinitialize: true,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
    >
      <TextField
        label="First Name"
        name="first_name"
        value={formik.values.first_name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.first_name && !!formik.errors.first_name}
        helperText={formik.touched.first_name && formik.errors.first_name}
        required
      />
      <TextField
        label="Last Name"
        name="last_name"
        value={formik.values.last_name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.last_name && !!formik.errors.last_name}
        helperText={formik.touched.last_name && formik.errors.last_name}
        required
      />
      <TextField
        label="Email (Optional)"
        name="email"
        type="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email && !!formik.errors.email}
        helperText={formik.touched.email && formik.errors.email}
      />
      <FormControl>
        <InputLabel>Car (Optional)</InputLabel>
        <Select
          name="car_uid"
          value={formik.values.car_uid}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          label="Car (Optional)"
        >
          <MenuItem value="">None</MenuItem>
          {cars.map((car) => (
            <MenuItem key={car.car_uid} value={car.car_uid}>
              {car.make} {car.model}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={isLoading || !formik.isValid}
      >
        {initialData ? "Update" : "Create"} Person
      </Button>
    </Box>
  );
};
