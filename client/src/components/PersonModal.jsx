import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { PersonForm } from "./PersonForm";

export const PersonModal = ({
  open,
  onClose,
  onSubmit,
  title = "Add Person",
  initialData = null,
  isLoading = false,
}) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{title}</DialogTitle>
      <DialogContent sx={{ pt: 2 }}>
        <PersonForm
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
