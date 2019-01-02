import React,{Component} from "react";
import {Query,Mutation} from "react-apollo"
import gql from "graphql-tag"
import {CURRENT_USER_QUERY} from "./User"

const ADD_TO_CART_MUTATION=gql`
    mutation ADD_TO_CART_MUTATION($id:ID!){
        addToCart(id:$id){
            id
            quantity
        }
    }
`;
class AddToCart extends Component{
    render(){
        return(
            <Mutation mutation={ADD_TO_CART_MUTATION} variables={{id:this.props.id}}
            refetchQueries={[{query:CURRENT_USER_QUERY}]}>{
                (addToCartFunc)=>{
                    return (
                        <button onClick={addToCartFunc}>Add To Cart&#x1F6D2;</button>
                    )
                }
            }
            </Mutation>
        )
    }
}
export default AddToCart