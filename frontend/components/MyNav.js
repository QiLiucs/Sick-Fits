import Link from "next/link"
import React,{Component} from "react"
import NavStyles from "./styles/NavStyles"
import NProgress from "nprogress"
import Router from "next/router"
import User from "./User"
import Signout from "./Signout";
import {TOGGLE_MUTATION} from "./Cart";
import {Mutation} from "react-apollo"
import CartCount from "./CartCount"

Router.onRouteChangeStart=()=>{
    NProgress.start();
};
Router.onRouteChangeComplete=()=>{
    NProgress.done();
};
Router.onRouteChangeError=()=>{
    NProgress.done();
};

class MyNav extends Component{
    render(){
        return(

                    <User>
                        {
                            ({data:{me}})=>{
                                // if(me){
                                //     return <p>{me.name}</p>
                                // }
                                // return null;
                                return(
                                    <NavStyles>
                                        <Link href="/items">
                                            <a>Shop</a>
                                        </Link>
                                        {me && (
                                            <>
                                                <Link href="/mysell">
                                                    <a>Sell</a>
                                                </Link>
                                                <Link href="/orders">
                                                    <a>Orders</a>
                                                </Link>
                                                <Link href="/me">
                                                    <a>Account</a>
                                                </Link>
                                                <Signout/>
                                                <Mutation mutation={TOGGLE_MUTATION}>
                                                    {
                                                        (toggleFunc)=>{
                                                            //reduce: reduce an array to a scalar, 0 is initial tally
                                                            return <button onClick={toggleFunc}>My Cart<CartCount count={me.cart.reduce((tally,cartItem)=>tally+cartItem.quantity,0)}></CartCount></button>
                                                        }
                                                    }
                                                </Mutation>
                                            </>

                                            )
                                        }
                                        {!me &&(
                                            <Link href="/signup">
                                                <a>Sign In</a>
                                            </Link>
                                        )}

                                    </NavStyles>
                                    );

                            }
                        }
                    </User>


        )
    }

}
export default MyNav