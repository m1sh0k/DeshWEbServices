import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import getResource from "./fetch"

import TextField from "@mui/material/TextField";





export default function ServerSetupPage(props) {
    const { toggleActivePage } = props;
    const [table,setTable] = useState(null);
    const [error, setError] = useState(null);

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

    useEffect(() => {
        const fetchData= async ()=>{
            try {
                //e.preventDefault();
                let {err:err,res:data} = await getResource({link:'/getConfig',method:'post',data:''});
                if(err) {
                    //Error message
                    //console.log("setupPage /getConfig err: ",err);
                    toggleActivePage('Reports',err);
                }else{
                    console.log("setupPage /getConfig: ",JSON.parse(data));
                    setTable(parseData(JSON.parse(data)));
                }
            } catch (err){
                //Error message
                //console.log("setupPage /getConfig err: ",err);
                toggleActivePage('Reports',err);
            }
        };
        fetchData();
    }, []);

    function getCurrentData(){
        const today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = today.getFullYear();

        return mm + '/' + dd + '/' + yyyy;
    }

    function addRow(inx,nestedArr){
        console.log("addRow(inx): ",inx,", nestedArr: ",nestedArr);
        let nestArrInx;
        if(nestedArr){
            nestArrInx = [...table].map(itm => itm.key).indexOf(nestedArr);
            console.log("nestArrInx: ",nestArrInx);
            if(nestArrInx < 0) return console.log("Err cant find itm!");
        }
        const newTable = [...table];
        console.log("newTable: ",newTable);
        !nestArrInx ?  newTable.splice(inx,0,{ key: "newKey", value: "newValue" }) :
            newTable[nestArrInx].value.splice(inx,0,{ key: "newKey", value: "newValue" })
        setTable(newTable);
    }

    function remRow(inx,nestedArr){
        console.log("remRow(inx): ",inx,", nestedArr: ",nestedArr);
        let nestArrInx;
        if(nestedArr){
            nestArrInx = [...table].map(itm => itm.key).indexOf(nestedArr);
            console.log("nestArrInx: ",nestArrInx);
            if(nestArrInx < 0) return console.log("Err cant find itm!");
        }
        const newTable = [...table];
        !nestArrInx ?  newTable.splice(inx,1,) :
            newTable[nestArrInx].value.splice(inx,1)
        setTable(newTable);
    }

    useEffect(()=>{
        console.log("table: ",table)
    },[table]);


/*    function editRow (startInx,delItm,addItm,nestedArrayInx){
        console.log("editRow startInx: ",startInx,", delItm: ",delItm,", addItm: ",addItm,", nestedArrayKey: ",nestedArrayInx);
        if(nestedArrayInx){
            if(addItm) {
                editTable = editTable[nestedArrayInx].value.splice(startInx,delItm,addItm);
                setTable(editTable);
            }else{
                editTable = editTable[nestedArrayInx].value.splice(startInx,delItm);
                console.log("editTable after change: ",editTable);
                setTable(editTable);
            }
        }else {
            editTable = editTable.splice(startInx,delItm,addItm);
            setTable(editTable);
        }
    }*/

    return(
        <div className="ConfigEditorTable">
            <div className="Categories">
                <span>Config Description</span>
                {
                    table ? table.map((itm,i)=>
                        typeof itm.value !== 'object' ? <div className="CategoriesGruop">
                                <TextField
                                    key={"Categories"+itm.key}
                                    label={itm.key}
                                    defaultValue={itm.value}
                                    variant="outlined"
                                />
                                <Button variant="contained" size="small" onClick={()=>addRow(i)}>ADD</Button>
                                <Button variant="contained" size="small" onClick={()=>remRow(i)}>DEL</Button>
                            </div>
                            : <div className="subCategories">
                                <span>{itm.key}</span>
                                {
                                    itm.value.map((itmV,iV)=> <div className="serverConfig">

                                            <TextField
                                                className="serverConfig key"
                                                key={"subCategoriesKeys"+itmV.key}
                                                defaultValue={itmV.key}
                                                variant="outlined"
                                            />
                                            <TextField
                                                className="serverConfig value"
                                                key={"subCategoriesValues"+itmV.key}
                                                defaultValue={itmV.value}
                                                variant="outlined"
                                            />
                                            <Button variant="contained" size="small" onClick={()=>addRow(iV,itm.key)}>ADD</Button>
                                            <Button variant="contained" size="small" onClick={()=>remRow(iV,itm.key)}>DEL</Button>
                                        </div>
                                    )}
                            </div>
                    ) : ""
                }
            </div>
        </div>
    )
}

