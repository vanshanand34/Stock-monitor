import React from "react";


function getToken(){
    let mytoken:string = localStorage.getItem('token') || " ";
    if(mytoken){
        return JSON.stringify(mytoken);
    }else{
        return " ";
    }
}


export default getToken;