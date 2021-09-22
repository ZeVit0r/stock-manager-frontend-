import React from "react";
// importações do material-ui
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
// importação do axios
import api from '../../services/api'
//importação de componentes
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

  // constante para os items que seram mostrados na tabela
  const [tableItems, setTableItems] = React.useState('')

  // pede para o backend os dados para serem mostrados
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
  
  // estilização do buttao utilizando metodo do material-ui
  const ButtonReport = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#AE46C0'),
    backgroundColor: '#AE46C0',
    '&:hover': {
      backgroundColor: '#9c27b0',
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