import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import getResource from "./fetch"





export default function ServerSetupPage(props) {
    const [conf, setConf] = useState(null);
    const [error, setError] = useState(null);

    async function getConfigFile(){
        try {
            //e.preventDefault();
            let {err:err,data:data} = await getResource({link:'/getConfig',method:'post',data:''});
            if(err) {
                //Error message
                //console.log("setupPage /getConfig err: ",err);
                props.toggleActivePage('Reports',err);
            }else{
                console.log("setupPage /getConfig: ",data);
                setConf(data);
            }
        } catch (err){
            //Error message
            //console.log("setupPage /getConfig err: ",err);
            props.toggleActivePage('Reports',err);
        }
    };
    //download config file after opening tab
    /*    useEffect(() => getConfigFile(),[]); */
    return (
        <div>
            <Button variant="outlined"
                    onClick={()=> getConfigFile()}
            >Get Current Server Config</Button>
            {
                conf ? <a>{conf}</a> : ""
            }
            {
                error ? <a>Error: {error}</a> : ""
            }
        </div>
    )

}

