import { Box, Button, Modal } from "@mui/material";
import {Login} from '@mui/icons-material'
import { useState } from "react";
import { ModalSignInForm } from "./ModalSignInForm";
import { ModalSignUpForm } from "./ModalSignUpForm";

export const MyModal = () => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(false)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChangeForm = () => setForm(preV=>!preV)
  return (
    <div>
      <Button onClick={handleOpen} className='btn-navbar' variant='outlined'>
        Sign in 
        <span style={{
          marginLeft:'3px',
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
        {
          form
          ? <Box><ModalSignUpForm handleChangeForm={handleChangeForm}/></Box>
          : <Box><ModalSignInForm handleChangeForm={handleChangeForm}/></Box>
        }
      </Modal>
    </div>
  )
}

