import React from 'react';

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { green } from '@mui/material/colors';
import { styled } from '@mui/material/styles';

import { useForm } from "react-hook-form";

import './style.css'

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Digite o nome do produto!!"),
  purchase: yup.number("O valor inserido não é um numero!!").positive("Valor inválido!!").required("Digite o valor de compra!!"),
  sale: yup.number(0,"O valor inserido não é um numero!!",9999).positive("Valor inválido!!").required("Digite o valor de venda!!"),
  amount: yup.number("O valor inserido não é um numero!!").integer("Obrigatório o estoque ter valor inteiro!!").required("Digite a quantidade em estoque do produto!!"),
  category: yup.string().required("Digite a categoria do produto!!"),
  provide: yup.string().required("Digite o nome do fornecedor do produto!!"),
});

const TextFieldGreat = {
  width: '100%',
  marginBottom: '10px',
  marginleft: '5px',
  marginRight: '5px',
};

const TextFieldSmall = {
  width: '130px',
  marginBottom: '10px',
};

export default (props) => {

  const { register, handleSubmit, formState:{ errors }} = useForm({
    resolver: yupResolver(schema)
  });

  const [name, setName] = React.useState(props.item.name);
  const [sale, setSale] = React.useState(props.item.sale);
  const [purchase, setPurchase] = React.useState(props.item.purchase);
  const [amount, setAmount] = React.useState(props.item.amount);
  const [provide, setProvide] = React.useState(props.item.provide);
  const [category, setCategory] = React.useState(props.item.category);

  const ButtonAdd = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(green[700]),
    backgroundColor: green[700],
    '&:hover': {
      backgroundColor: green[500],
    },
    marginBottom: '10px',
  }));

  const error = () => {
    if(errors.name){
      return <p>{errors.name.message}</p>
    } else if(errors.purchase){
      return <p>{"Compra R$ tem valor inválido!! Verifique se esta colocando um 'numero' válido maior que zero!!"}</p>
    } else if(errors.sale){
      return <p>{"Venda R$ tem valor inválido!!, verifique se esta colocando um 'numero' válido maior que zero!!"}</p>
    } else if(errors.amount){
      return <p>{"Estoque tem valor inválido!!, verifique se esta colocando um numero valido!!"}</p>
    } else if(errors.category){
      return <p>{errors.category.message}</p>
    } else if(errors.provide){
      return <p>{errors.provide.message}</p>
    }
  }

  return(
    <form onSubmit={handleSubmit(props.modifyItems)}>
      <TextField 
        {...register("name")}
        id="name" 
        name="name" 
        label="Nome" 
        variant="outlined"
        
        value={name}
        onChange={e=>setName(e.target.value)}
        sx={TextFieldGreat}/>        
      <div className="groupTextField">
        <TextField 
          {...register("purchase")}
          id="purchase"
          pattern='^[1-9]\d{0,2}(\.\d{3})*,\d{2}$'
          name="purchase"
          label="Compra R$" 
          variant="outlined"
          
          value={purchase}
          onChange={e=>setPurchase(e.target.value)}
          sx={TextFieldSmall}/>
        <TextField
          {...register("sale")}
          id="sale" 
          name="sale" 
          label="Venda R$" 
          variant="outlined"
          
          value={sale}
          onChange={e=>setSale(e.target.value)}
          sx={TextFieldSmall}/>
        <TextField 
          {...register("amount")}
          id="amount"
          name="amount"
          label="Qtd. Estoque" 
          variant="outlined"
          
          value={amount}
          onChange={e=>setAmount(e.target.value)}
          sx={TextFieldSmall}/>
      </div>
      <TextField 
        {...register("category")}
        id="category"
        name="category"
        label="Categoria" 
        variant="outlined"
        
        value={category}
        onChange={e=>setCategory(e.target.value)}
        sx={TextFieldGreat}/>
      <TextField 
        {...register("provide")}
        id="provide" 
        name="provide" 
        label="Fornecedor" 
        variant="outlined"
        
        value={provide}
        onChange={e=>setProvide(e.target.value)}
        sx={TextFieldGreat}/>
        <div className="error">
          {error()}
        </div>
      <div className="buttonAdd">
        <ButtonAdd type="submit">{`${props.text}`}</ButtonAdd>
      </div>
    </form>
  )
}