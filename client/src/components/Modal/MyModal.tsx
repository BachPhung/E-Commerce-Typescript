import { Box, Button, Modal } from "@mui/material";
import {Login} from '@mui/icons-material'
import { useState } from "react";
import { ModalSignInForm } from "./ModalSignInForm";

const style = {
  position: 'absolute',
  display:'flex',
  justifyContent:'center',
  flexDirection:'column',
  alignItems:'center',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


export const MyModal = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <Button onClick={handleOpen} className='btn-navbar' variant='outlined'>
        Sign in
        <span style={{
          height: "46px",
          display: 'flex',
          alignItems: 'center'
        }}>
          <Login />
        </span>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalSignInForm></ModalSignInForm>
      </Modal>
    </div>
  )
}

