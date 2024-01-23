import React, {ReactNode} from "react";
import {Dialog, DialogProps} from "@mui/material";


interface ModalProps extends Omit<DialogProps, 'children'> {
    maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    open: boolean;
    onClose: () => void;
    children: ReactNode;
    isInfoOpen: boolean;
}

// TODO: This component should use the config height and width values

const Modal: React.FC<ModalProps> = ({
                                         maxWidth = "xs",
                                         open,
                                         onClose,
                                         children,
                                         isInfoOpen,
                                     }) => {
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
                    overflow: isInfoOpen ? 'hidden' : 'auto',
                    minHeight: 750
                }
            }}
        >
            {children}
        </Dialog>
    )
}

export default Modal;