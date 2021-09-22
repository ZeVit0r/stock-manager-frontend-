import * as React from 'react';
// importaçoes do material-ui
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
// importação de icones
import {FaTrashAlt} from 'react-icons/fa'
// importação de componentes
import Form from '../../components/form'
// importação do axios
import api from '../../services/api'

// estilização para o modal
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

  // funcao para atualizar items
  const updateItems = async (elem) => {
    const {name, sale, purchase, amount, provide, category} = elem

    await api.put(`/products?productId=${items.id}`, {name, sale, purchase, amount, provide, category});
    handleClose();
    const update = ()=>props.update();
    update()
  }

  // estilização de butoes utilizando o metodo do material-ui
  const ButtonUpdate = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#AE46C0'),
    backgroundColor: '#AE46C0',
    '&:hover': {
      backgroundColor: '#9c27b0',
    },
  }));
  const ButtonDelete = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText('#E70F34'),
    backgroundColor: '#E70F34',
    '&:hover': {
      backgroundColor: '#90001A',
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

