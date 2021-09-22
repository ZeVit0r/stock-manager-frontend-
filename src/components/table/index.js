import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Button from '@mui/material/Button';
import { purple, red } from '@mui/material/colors';
import { styled } from '@mui/material/styles';

// importação de icones
import {FaTrashAlt} from 'react-icons/fa'

// importação dos componentes do modal
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import Form from '../../components/form'

import api from '../../services/api'

const styleModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: 2
};

export default (props) => {

  // constantes para o componente do butão de atualização!!
  const [open, setOpen] = React.useState(false);
  const handleOpen = (row) => {
    setOpen(true)
    setItems(row)
  };
  const handleClose = () => setOpen(false);

  const [items, setItems] = React.useState([]);

  const updateItems = async (elem) => {
    const {name, sale, purchase, amount, provide, category} = elem

    const response = await api.put(`/products?productId=${items.id}`, {name, sale, purchase, amount, provide, category});
    handleClose();
    const update = ()=>props.update();
    update()
  }

  const ButtonUpdate = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    '&:hover': {
      backgroundColor: purple[700],
    },
  }));

  const ButtonDelete = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
    '&:hover': {
      backgroundColor: red[700],
    },
    height: '36px'
  }));

  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Nome</TableCell>
              <TableCell align="center">CompraR$</TableCell>
              <TableCell align="center">VendaR$</TableCell>
              <TableCell align="center">Estoque</TableCell>
              <TableCell align="center">Categoria</TableCell>
              <TableCell align="center">Fornecedor</TableCell>
              <TableCell align="center"></TableCell>
              <TableCell align="center"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.items.map((row) => {
              return(
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="center">{row.purchase.toFixed(2)}</TableCell>
                <TableCell align="center">{row.sale.toFixed(2)}</TableCell>
                <TableCell align="center">{row.amount}</TableCell>
                <TableCell align="center">{row.category}</TableCell>
                <TableCell align="center">{row.provide}</TableCell>
                <TableCell align="right"><ButtonUpdate onClick={()=>handleOpen(row)}>Atualizar</ButtonUpdate></TableCell>
                <TableCell align="left"><ButtonDelete onClick={()=>props.removeItems(row.id)}><FaTrashAlt/></ButtonDelete></TableCell>
              </TableRow>
            )})
            }
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal}>
          <Form text={'atualizar'} modifyItems={updateItems} item={items}/>
        </Box>
      </Modal>
    </div>
  );
}

