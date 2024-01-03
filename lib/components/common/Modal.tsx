import React from "react";
import { Dialog } from "@mui/material";
import { useCdeContext } from "../../CdeContext";

const Modal:React.FC<any> = ({
  maxWidth = "xs",
  open,
  onClose,
  children
}) => {
  const { infoOpen } = useCdeContext();
  return (
    <Dialog
      fullWidth
      maxWidth={maxWidth}
      open={open}
      onClose={onClose}
      sx={{
        '& .MuiModal-backdrop': {
          background: 'rgba(0, 0, 0, 0.25)'
        },
        '& .MuiDialog-paper': {
          boxShadow: '0rem 0.125rem 0.25rem -0.125rem rgba(7, 8, 8, 0.06), 0rem 0.25rem 0.5rem -0.125rem rgba(7, 8, 8, 0.10)',
          overflow: infoOpen ? 'hidden' : 'auto'
        }
      }}
    >
      {children}
    </Dialog>
  )
}

export default Modal;