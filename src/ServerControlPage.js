import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import getResource from "./fetch"





export default function ServerControlPage(props) {
    const [serverStateOn, setServerStateOn] = useState(false);

    return (
        <div>
            {
                serverStateOn === false ?
                <div className='buttonGroup'>
                    <Button variant="outlined" >Start Server</Button>
                    <Button variant="outlined" disabled>Stop Server</Button>
                </div>
                    :
                    <div className='buttonGroup'>
                        <Button variant="outlined"disabled>Start Server</Button>
                        <Button variant="outlined">Stop Server</Button>
                    </div>
            }
            <Button variant="outlined">Restart Server</Button>
            <Button variant="outlined">Tutn Off Machine</Button>
            <Button variant="outlined">Restart Machine</Button>
        </div>
    )

}

