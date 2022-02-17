import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import getResource from "./fetch"

import TextField from "@mui/material/TextField";





export default function ServerSetupPage(props) {
    const { toggleActivePage } = props;
    const [table,setTable] = useState(null);
    const [error, setError] = useState(null);
    //parse to array of obj
    let parseArray = [];
    function parseData(data,key){
        //console.log("parseData(data): ",data);
        let tempArr = [];
        for(let [key, value] of Object.entries(data)){
            if(typeof value === 'string') {
                tempArr.push({key:key,value:value});
            }else  parseData(value,key);
        }
        //console.log("key: ",key,", tempArr: ",tempArr);
        if(key) {
            parseArray.push({key:key,value:tempArr})
        }else parseArray = [...tempArr,...parseArray]
        return parseArray;
    }
    //parse to json style
    let objJson = {};
    function parseToJson(data,key){
        //console.log("parseToJson(data): ",data);
        let tempObj = {};
        for(let itm of data) {
            if(typeof itm.value === 'string') {
                tempObj[itm.key] = itm.value;
            }else parseToJson(itm.value,itm.key);
        }
        //console.log("key: ",key,", tempObj: ",tempObj);
        if(key) {
            objJson[key] = {...tempObj}
        }else objJson = {...tempObj,...objJson}
        return objJson;
    }

    async function saveConfig(){
        try{
            console.log("table: ",table);
            let jsonData =  parseToJson(table);
            console.log("jsonData: ",jsonData);
            let {err:err,res:data} = await getResource({link:'/saveConfig',method:'post',data: {fileData:jsonData,fileName:"config.json"}});
            if(err) {
                //Error message
                console.log("setupPage /saveConfig err: ",err);
                toggleActivePage('Reports',err);
            }else{
                console.log("setupPage /saveConfig: ",data);
                toggleActivePage('Reports',{message:data.message,status:200});
            }
        }catch(err){
            console.log("setupPage /saveConfig err: ",err);
            toggleActivePage('Reports',err);
        }
    }

    useEffect(() => {
        const fetchData= async ()=>{
            try {
                let {err:err,res:data} = await getResource({link:'/getConfig',method:'post'});
                if(err) {
                    //Error message
                    console.log("setupPage /getConfig err: ",err);
                    toggleActivePage('Reports',err);
                }else{
                    console.log("setupPage /getConfig: ",JSON.parse(data));
                    setTable(parseData(JSON.parse(data)));
                }
            } catch (err){
                //Error message
                console.log("setupPage /getConfig err: ",err);
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
                        typeof itm.value !== 'object' ? <div className="categoriesGroup">
                                <TextField
                                    className="serverConfig key"
                                    key={"categoriesKeys"+itm.key}
                                    defaultValue={itm.key}
                                    variant="outlined"
                                />
                            <b>:</b>
                                <TextField
                                    className="serverConfig value"
                                    key={"categoriesValues"+itm.key}
                                    defaultValue={itm.value}
                                    variant="outlined"
                                />
                                <Button variant="contained" size="small" onClick={()=>addRow(i)}>ADD</Button>
                                <Button variant="contained" size="small" onClick={()=>remRow(i)}>DEL</Button>
                            </div>
                            : <div className="subCategoriesGroup">
                                <span>{itm.key}</span>
                                {
                                    itm.value.map((itmV,iV)=> <div className="serverConfig">

                                            <TextField
                                                className="serverConfig key"
                                                key={"subCategoriesKeys"+itmV.key}
                                                defaultValue={itmV.key}
                                                variant="outlined"
                                            />
                                        <b>:</b>
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
            <Button variant="contained" size="medium" onClick={()=>saveConfig()}>Upload Config</Button>
        </div>
    )
}

