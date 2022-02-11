import React, { useState, useEffect } from "react";
import Input from '@mui/material/Input';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function ConfigEditor(props) {
    const { data } = props;
    let keysData = Object.keys(data);
    let valueData = Object.values(data);
    console.log("keys: ",keysData,", values: ",valueData)
    const dataParse =(data)=>{

    }
    return(
        <div className="ConfigEditorTable">
            {
                keysData.map((itm,i)=>{
                    <TextField id={i+itm} label={itm} variant="outlined" />
                })
            }
        </div>
    )
}