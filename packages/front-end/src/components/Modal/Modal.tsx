import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Slide,
  } from "@mui/material";
import React from "react";
import { TransitionProps } from "@mui/material/transitions";
  
  interface ModalComponentProps{
    message: string;
    firstButtonText?: string;
    secondButtontext?: string;
    isOpen: boolean
    handleModalOpen: (action?: any) => void;
    title?: string
  }
  const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

  export const ModalComponent: React.FunctionComponent<ModalComponentProps> = ({
    message,
    firstButtonText,
    secondButtontext,
    isOpen = false,
    handleModalOpen,
    title
  }) =>
    {
        const handleClose = () => {
            handleModalOpen();
        };
        return (
  
            <React.Fragment>
                <Dialog
                    open={isOpen}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={handleClose}
                    aria-describedby="alert-dialog-slide-description"
                    >
                    <DialogTitle>{title}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                        {message}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="text" sx={{ color: "black" }} onClick={handleClose}>{firstButtonText}</Button>
                        <Button variant="text" sx={{ color: "black" }} onClick={handleClose}>{secondButtontext}</Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        );
    };
  