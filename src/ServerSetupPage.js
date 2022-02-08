import React, { useState, useEffect } from "react";




export default function ServerSetupPage(props) {
    const [conf, setConf] = useState(null);
    const [error, setError] = useState(null);
    const [modalStatus, setModalStatus] = useState(false);
    const link = props.link;
    async function getConfigFile(){
        try {
            //e.preventDefault();
            //let data;
            let res = await fetch(link,{
                method:'post',
                //body: JSON.stringify(data),
                headers:{'Content-Type': 'application/json',},
            });
            if(res.ok) {
                res = await res.json();
                console.log("jsonBuilder res: ",err);
                setConf(res);
            } else {
                //Error message
                console.log("jsonBuilder err: ",err);
                setError(res);
                setModalStatus(true);
            }
        } catch (err){
            //Error message
            console.log("jsonBuilder err: ",err);
            setError(err);
            setModalStatus(true);
        }
    };
    useEffect(() => {
        getConfigFile();
    }, []);

}

export default ServerSetupPage;