import React, {Component} from 'react';
import PropTypes from 'prop-types'
import styled from "styled-components"
import {Query,Mutation} from 'react-apollo';
import gql from 'graphql-tag'
import {CURRENT_USER_QUERY} from "./User"

const BigButton=styled.button`
font-size:3rem;
background:none;
border:0;
&:hover{
    color:${props=>props.theme.red};
    cursor:pointer;
}
`;
const REMOVE_FROM_CART_MUTATION=gql`
    mutation REMOVE_FROM_CART_MUTATION($id:ID!){
        removeFromCart(id:$id){
            id
        }
    }
`;
class RemoveFromCart extends Component{
    update=(cache,payload)=>{
        //1.read the cache
        const data=cache.readQuery({query:CURRENT_USER_QUERY});
        //2.remove
        const cartItemId=payload.data.removeFromCart.id;
        data.me.cart=data.me.cart.filter(cartItem=>cartItem.id!==cartItemId);
        //3.write to cache
        cache.writeQuery({query:CURRENT_USER_QUERY,data});

    };
    render(){
        return(
            //why optimisticResponse? 使用之前：告诉服务器删除，server删除之后再返回id,但是我可以直接告诉客户端server返回的应该是什么，client拿到
            //返回的内容之后马上就可以update cache了
            <Mutation mutation={REMOVE_FROM_CART_MUTATION} variables={{id:this.props.id}}
            update={this.update} optimisticResponse={
                {
                    __typename:'Mutation',
                    removeFromCart:{
                        __typename:'CartItem',
                        id:this.props.id
                    }
                }
            }>
                {
                    (removeFunc,{loading,error})=>{
                        return(
                            <BigButton title="Delete Item" onClick={()=>{removeFunc().catch(err=>{alert(err.message)})}} disabled={loading}>&times;</BigButton>
                        );
                    }

                }
            </Mutation>

        );
    }
}
export default RemoveFromCart;