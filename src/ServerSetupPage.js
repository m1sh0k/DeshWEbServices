import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import getResource from "./fetch"
import ConfigEditor from "./ConfigEditor";





export default function ServerSetupPage(props) {
    const { toggleActivePage } = props;
    const [conf, setConf] = useState(null);
    const [error, setError] = useState(null);

    async function getConfigFile(){
        try {
            //e.preventDefault();
            let {err:err,res:data} = await getResource({link:'/getConfig',method:'post',data:''});
            if(err) {
                //Error message
                //console.log("setupPage /getConfig err: ",err);
                toggleActivePage('Reports',err);
            }else{
                console.log("setupPage /getConfig: ",JSON.parse(data));
                setConf(JSON.parse(data));
            }
        } catch (err){
            //Error message
            //console.log("setupPage /getConfig err: ",err);
            toggleActivePage('Reports',err);
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
                conf ? <ConfigEditor
                    data={conf}
                />:""
            }
        </div>
    )

}

