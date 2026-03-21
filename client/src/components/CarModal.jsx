import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { CarForm } from "./CarForm";

export const CarModal = ({
  open,
  onClose,
  onSubmit,
  title = "Add Car",
  initialData = null,
  isLoading = false,
}) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent sx={{ pt: 2 }}>
        <CarForm
          onSubmit={(data) => {
            onSubmit(data);
            onClose();
          }}
          initialData={initialData}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
};
