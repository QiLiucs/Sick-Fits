import React,{Component} from "react";
import CartStyles from "./styles/CartStyles"
import Supreme from "./styles/Supreme"
import CloseButton from "./styles/CloseButton"
import SickButton from "./styles/SickButton"
import {Query,Mutation} from "react-apollo"
import gql from "graphql-tag"
import User from "./User"
import CartItem from "./CartItem"
import calcTotalPrice from "../lib/calcTotalPrice"
import formatMoney from "../lib/formatMoney"
import TakeMyMoney from "./TakeMyMoney"

//@client: dont go to server for cartOpen,just get it directly from local store
const LOCAL_STATE_QUERY=gql`
    query {
        cartOpen @client
    }
`;

const TOGGLE_MUTATION=gql`
    mutation {
        toggleCart @client
    }
`;

class Cart extends Component{
    render(){
        return(
            <User>
                {
                    ({data:{me}})=>{
                        if(!me) return null;
                        return (
                            //mutation可以wrap query,query也可以wrap mutation,closebutton要用到toggle
                            <Mutation mutation={TOGGLE_MUTATION}>
                                {
                                    (toggleCartFunc)=>{
                                        return(
                                            <Query query={LOCAL_STATE_QUERY}>
                                                {
                                                    ({data})=>{
                                                        return(
                                                            // open:开启侧栏
                                                            <CartStyles open={data.cartOpen}>
                                                                <header>
                                                                    <CloseButton title="close" onClick={toggleCartFunc}>&times;</CloseButton>
                                                                    <Supreme>{me.name}'s Cart</Supreme>
                                                                    <p>You Have {me.cart.length} Item{me.cart.length>1?'s':''} in Your Cart.</p>
                                                                </header>
                                                                <ul>
                                                                    {
                                                                        me.cart.map(cartItem=><CartItem cartItem={cartItem}/>)
                                                                    }
                                                                </ul>
                                                                <footer>
                                                                    <p>{formatMoney(calcTotalPrice(me.cart))}</p>
                                                                    {me.cart.length &&
                                                                    <TakeMyMoney>
                                                                        <SickButton>Checkout</SickButton>
                                                                    </TakeMyMoney>}

                                                                </footer>
                                                            </CartStyles>
                                                        );

                                                    }
                                                }

                                            </Query>
                                        )
                                    }
                                }

                            </Mutation>
                        )
                    }
                }
            </User>

        );
    }
}
export default Cart;
export {LOCAL_STATE_QUERY,TOGGLE_MUTATION}