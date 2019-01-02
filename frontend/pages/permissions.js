import React,{Component} from "react"
import PleaseSignin from "../components/PleaseSignin"
import Permissions from "../components/Permissions"
const PermissionsPage=(props)=>{
    return(
        <PleaseSignin>
            <Permissions/>
        </PleaseSignin>
    )

};
export default PermissionsPage