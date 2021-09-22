import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";

import {FaSearch} from "react-icons/fa"

export default (props) => {
  const [text, setText] = React.useState('')

  const handleChange = (event) => {
    setText(event.target.value);
  };

  React.useEffect(()=>{props.search(text)}, [text])

  return (
    <Paper
      component="form"
      sx={{ p: "2px 4px", display: "flex", alignItems: "center", width: 700, height:36 }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Produtos.."
        inputProps={{ "aria-label": "Produtos.." }}
        onChange={(e)=>handleChange(e)}
      />
      <IconButton sx={{ p: "10px" }} aria-label="search" onClick={()=>{props.search(text)}}>
        <FaSearch/>
      </IconButton>
    </Paper>
  );
}