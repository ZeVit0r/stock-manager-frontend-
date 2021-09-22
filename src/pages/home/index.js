import React from 'react';

import { Pagination } from '@mui/material';
import Button from '@mui/material/Button';
import { green, blue } from '@mui/material/colors';
import { styled } from '@mui/material/styles';

import Search from '../../components/search'
import Table from '../../components/table'

import './style.css'

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

import Form from '../../components/form';
import ButtonReport from '../../components/buttonReport'

import api from '../../services/api'

// constante de estilização do componente do modal
const styleModal = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius:2,
};

export default () => {
  
  // constantes para o componente de modal para adicionar um novo item!
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Constante que armazena todos os dados(esse constante nao muda)
  const [data, setData] = React.useState([])
  
  // constante que armazena a string para filtragem
  const [search, setSearch] = React.useState('')

  // constante que armazena a quantidade total de items(serve para colocar o numero no componente de paginação)
  const [quantityItems, setQuantityItems] = React.useState(1)

  // funcao que filtra os items
  const searchEntry = (text='') => {
    setSearch(text)
    handlePagination({},1)
  }

  // constante para o componente de paginação
  const [page, setPage] = React.useState(1);

  const handlePagination = (event={}, value) => {
    setPage(value);
  };

  
  const dataUpdate = () => {
    api
      .get(`/products?name=${search}&page=${page}`)
      .then(async (response) => {
        await setQuantityItems(response.data.quantity)
        await setData(response.data.items)
      })
      .catch((err) => {
        console.error("ops! ocorreu um erro" + err);
      });
  }

  //funcao que recebe os dados do backend!!
  React.useEffect(async ()=>{    
    dataUpdate()
  },[search, page])

  //funcao para adicionar items
  const addItems = async (items) => {
    const {name, sale, purchase, amount, provide, category} = items
    const response = await api.post("/products", {name, sale, purchase, amount, provide, category});

    handleClose()
    dataUpdate()
  }

  const removeItems = async (productId) => {
    await setData(data.filter((elem)=>{
      return (elem !== data.productId)
    }))
    const response = await api.delete(`/products?productId=${productId}`);

    dataUpdate()

  }

  // Funções de estilização de alguns components do material-ui
  const ButtonAdd = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(green[700]),
    backgroundColor: green[700],
    '&:hover': {
      backgroundColor: green[500],
    },
  }));

  return(
    <div className="body">
      <div className="reports">
        <ButtonReport text={"Relatório de Categorias"} report={'Categories'}/>
        <ButtonReport text={"Relatório de Produtos ausentes"}report={'Products'}/>
        <ButtonReport text={"Relatório de Fornecedores"}report={'Provides'}/>
      </div>

      <div className="top">
        <Search search={searchEntry}/>
        <ButtonAdd onClick={handleOpen}>Adicionar Produto</ButtonAdd>
      </div>
      
      <div className="pagination">
        <Pagination count={Math.ceil(quantityItems/7)} page={page} onChange={handlePagination}/>
      </div>
      <div className="table">
        <Table items={data || []} removeItems={removeItems} update={dataUpdate}/>
      </div>
      

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal}>
          <Form text={'adicionar'} modifyItems={addItems}/>
        </Box>
      </Modal>

    </div>
  )
}