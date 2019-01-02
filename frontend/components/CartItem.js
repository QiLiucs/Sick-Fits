import React, {Component} from 'react';
import PropTypes from 'prop-types'
import styled from "styled-components"
import formatMoney from "../lib/formatMoney"
import RemoveFromCart from "./RemoveFromCart"

const CartItemStyle=styled.li`
padding:1rem 0;
border-bottom:1px solid ${props=>props.theme.lightgrey};
display:grid;
align-items:center;
grid-template-columns:auto 1fr auto;
img{
    margin-right:10px;
}
h4{
    margin:0;
}
`;
class CartItem extends Component{
    render(){
        const {cartItem}=this.props;
        if(!cartItem.item){
            return(
                <CartItemStyle>
                    <div>
                        <p>This item is removed!</p>
                    </div>
                    <RemoveFromCart id={cartItem.id}/>
                </CartItemStyle>
            )
        }
        return(
            <CartItemStyle>
                <img width="100" src={cartItem.item.image}/>
                <div>
                    <h4>{cartItem.item.title}</h4>
                    <p>
                        {formatMoney(cartItem.item.price*cartItem.quantity)}
                        {'-'}
                        <em>
                            {cartItem.quantity}&times;{formatMoney(cartItem.item.price)} ea
                        </em>
                    </p>
                </div>
                <RemoveFromCart id={cartItem.id}/>
            </CartItemStyle>
        )
    }
}
export default CartItem