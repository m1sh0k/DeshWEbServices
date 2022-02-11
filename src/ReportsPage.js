import React, { useState, useEffect } from "react";
import getResource from "./fetch"
import Page from "../../react-express-webpack-PG/src/layout/page";





export default function ReportsPage(props) {
    //console.log("ReportsPage(props): ",props);
    return (
        <div className='main-content'>
            {props.data ? <h1>ERROR:  {props.data.status} </h1> : ''}
            {props.data ? <p>MESSAGE: {props.data.message} </p> : ''}
        </div>
    )

}

