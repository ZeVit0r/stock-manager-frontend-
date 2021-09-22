import * as React from 'react';
// importações do material-ui
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// importação do css do componente
import './style.css'

export default ({type, items = []}) => {
  // funcao que cria um head para diferentes tipos de botoes
  const showTableHead = () => {
    if(type === 'Categories'){
      return (
        <>
          <TableHead>
            <TableRow>
              <TableCell>Categoria</TableCell>
              <TableCell align="right">Qtd.Estoque</TableCell>
              <TableCell align="right">Qtd.Produtos</TableCell>
            </TableRow>
          </TableHead>
        </>
      )
    }
    else if(type === 'Products'){
      return (
        <>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell align="right">Categoria</TableCell>
              <TableCell align="right">Estoque</TableCell>
              <TableCell align="right">Fornecedor</TableCell>
            </TableRow>
          </TableHead>
        </>
      )
    }
  }
  // funcao que cria um body para diferentes tipos de botoes
  const showTableBody = () => {
    if(type === 'Categories'){
      return (
        <>
          <TableBody>
          {!!items ? items.map((row, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.category}
              </TableCell>
              <TableCell align="right">{row.amountTotal}</TableCell>
              <TableCell align="right">{row.productsTotal}</TableCell>
            </TableRow>
          )) : ''}
        </TableBody>
        </>
      )
    }
    else if(type === 'Products'){
      return (
        <>
          <TableBody>
          {!!items ? items.map((row, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.category}</TableCell>
              <TableCell align="right">{row.amount}</TableCell>
              <TableCell align="right">{row.provide}</TableCell>
            </TableRow>
          )) : ''}
        </TableBody>
        </>
      )
    }
    else if(type === 'Provides'){
      return (
        <>
          <TableBody>
          {!!items ? items.map((row, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="center" colSpan={5}>
                <b>Fornecedor: </b>{row.provide}
                {showTableProvides(row.products)}
              </TableCell>
            </TableRow>
          )) : ''}
        </TableBody>
        </>
      )
    }
  }
  // funcao que cria uma tabela para o relatório de fornecedores
  const showTableProvides = (products) => {
    if(type === 'Provides'){
      return(
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow>
                <TableCell align="center">Nome</TableCell>
                <TableCell align="center">Categoria</TableCell>
                <TableCell align="center">Estoque</TableCell>
                <TableCell align="center">Compra $</TableCell>
                <TableCell align="center">Venda $</TableCell>
              </TableRow>
            </TableHead>
            
            <TableBody>
              {!!products ? products.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.category}</TableCell>
                  <TableCell align="right">{row.amount}</TableCell>
                  <TableCell align="right">{row.purchase}</TableCell>
                  <TableCell align="right">{row.sale}</TableCell>
                </TableRow>
              )) : ''}
            </TableBody>

          </Table>
        </TableContainer>
      )
    }
  }
  // funcao que coloca o titulo em cada relatório
  const tableTitle = ()=>{
    console.log('teste')
    if(type==='Categories'){
      return (<h1>Relatório de Categorias</h1>)
    }else if(type==='Products'){
      return (<h1>Produtos sem estoque</h1>)
    }else if(type==='Provides'){
      return (<h1>Fornecedores com produtos sem estoque</h1>)
    } 
  }

  return (
    <>
      <div className="tableTitle">
        {tableTitle()}
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          {showTableHead()}
          {showTableBody()}
        </Table>
      </TableContainer>
    </>
  );
}
