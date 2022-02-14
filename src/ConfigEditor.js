import React, { useState, useEffect } from "react";
import Input from '@mui/material/Input';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function parseData(data){
    let parseArray = [];
    for(let [key, value] of Object.entries(data)){
        if(typeof value === 'object') {
            parseArray.push({key:key,value:[]});
            for(let [keyS, valueS] of Object.entries(value)){
                parseArray[parseArray.length - 1].value.push({key:keyS,value:valueS});
            }
        }else parseArray.push({key:key,value:value});
    }
    console.log("ConfigEditor parseArray: ",parseArray);
    return parseArray;
}

export default function ConfigEditor(props) {
    const { data } = props;
    const [parseArray,setParseArray] = useState(parseData(data))

    const addParam =()=>{

    }
    console.log("ConfigEditor parseArray: ",parseArray);

    const getCurrentData =()=>{
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = today.getFullYear();

        return mm + '/' + dd + '/' + yyyy;
    }
    return(
        <div className="ConfigEditorTable">
            {
                parseArray.map((itm,i)=>
                    typeof itm.value !== 'object' ? <TextField
                            key={i+itm.key}
                            label={itm.key}
                            defaultValue={itm.value}
                            variant="outlined"
                        />
                        : <div className="subCategories">
                            <span>{itm.key}</span>
                            {
                                itm.value.map((itmV,iV)=> <TextField
                                    key={iV+itmV.key}
                                    label={itmV.key}
                                    defaultValue={itmV.value}
                                    variant="outlined"
                                />)
                            }
                        </div>
                    )
            }
        </div>
    )
}