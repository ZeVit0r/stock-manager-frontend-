import React from "react";

import Button from '@mui/material/Button';
import { green, blue } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import api from '../../services/api'

import TableReport from '../tableReport'

// constante de estilização do componente do modal
const styleModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius:2,
};

export default (props) => {
  // constantes para o componente de modal para adicionar um novo item!
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
    itemsModal()
  }
  const handleClose = () => setOpen(false);

  const [tableItems, setTableItems] = React.useState('')

  const itemsModal = () => {
    api
      .get(`/products/report${props.report}`)
      .then(async (response) => {
        await setTableItems(response.data)
        console.log(response.data)
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }

  const ButtonReport = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(blue[900]),
    backgroundColor: blue[900],
    '&:hover': {
      backgroundColor: blue[800],
    },
  }));

  return (
    <>
      <ButtonReport onClick={handleOpen}>{props.text}</ButtonReport>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal}>
          <TableReport items={tableItems.category || tableItems.missingProducts || tableItems.provides} type={props.report}/>
        </Box>
      </Modal>
    </>
  )
}