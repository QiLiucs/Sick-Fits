import React,{Component} from "react";
import {Query,Mutation} from "react-apollo"
import gql from "graphql-tag"
import Error from "./ErrorMessage"
import Head from "next/head"
import {format} from 'date-fns'
import formatMoney from "../lib/formatMoney"
import OrderStyles from "./styles/OrderStyles"

const SINGLE_ORDER_QUERY=gql`
    query SINGLE_ORDER_QUERY($id:ID!){
        order(id:$id){
            id 
            charge
            total
            createAt
            user{
                id
            }
            items{
                id
                title
                description
                price
                image
                quantity
            }
        }
    }
`;
class Order extends Component{
    render(){
        return(
            <Query query={SINGLE_ORDER_QUERY} variables={{id:this.props.id}}>
                {

                    ({data,error,loading})=>{

                        if(loading) return <p>Loading...</p>
                        if(error) return <Error error={error}/>
                        const order=data.order;
                        return(<OrderStyles>
                            <Head>
                                <title>Sick Fits - Order{order.id}</title>
                            </Head>
                            <p>
                                <span>Order ID:</span>
                                <span>{this.props.id}</span>
                            </p>
                            <p>
                                <span>Charge:</span>
                                <span>{order.charge}</span>
                            </p>
                            <p>
                                <span>Date:</span>
                                <span>{format(order.createdAt,'MMMM d, YYYY h:mm a')}</span>
                            </p>
                            <p>
                                <span>Order Total:</span>
                                <span>{formatMoney(order.total)}</span>
                            </p>
                            <p>
                                <span>Item Count:</span>
                                <span>{order.items.length}</span>
                            </p>
                            <div className="items">
                                {order.items.map(item=>(
                                    <div className="order-item">
                                        <img src={item.image}/>
                                        <h3>{item.title}</h3>
                                        <p>Qty:{item.quantity}</p>
                                        <p>Each:{formatMoney(item.price)}</p>
                                        <p>SubTotal:{formatMoney(item.price*item.quantity)}</p>
                                        <p>{item.description}</p>
                                    </div>
                                ))}
                            </div>
                        </OrderStyles>)
                    }
                }
            </Query>

        );
    }
}
export default Order;