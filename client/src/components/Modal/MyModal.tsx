import { Box, Button, Modal } from "@mui/material";
import {Login} from '@mui/icons-material'
import { useState } from "react";
import { ModalSignInForm } from "./ModalSignInForm";
import { ModalSignUpForm } from "./ModalSignUpForm";
import { ModalUpdateProductForm } from "./ModalUpdateProductForm";

interface ModalProps {
  updateForm?: boolean,
}

export const MyModal = (props: ModalProps) => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(false)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChangeForm = () => setForm(preV=>!preV)
  return (
    <div>
      <Button onClick={handleOpen} className='btn-navbar' variant='outlined'>
        {
          props.updateForm && 'Update Product'
        }
        {
          (props.updateForm === false)  && "Sign In" 
        }
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
        <>
        {
          (form && !props.updateForm)
          ? <Box><ModalSignUpForm handleChangeForm={handleChangeForm}/></Box>
          : <Box><ModalSignInForm handleChangeForm={handleChangeForm}/></Box>
        }
        { props.updateForm && <Box><ModalUpdateProductForm/></Box> }
        </>
      </Modal>
    </div>
  )
}

