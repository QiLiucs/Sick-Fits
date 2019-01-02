import React,{Component} from "react";
import {Query,Mutation} from "react-apollo"
import gql from "graphql-tag"
import PleaseSignin from "../components/PleaseSignin"
import Order from "../components/Order"
class OrderPage extends Component{
    render(){
        return(
            <PleaseSignin>

                <Order id={this.props.query.id}/>
            </PleaseSignin>
        )

    }
}
export default OrderPage;