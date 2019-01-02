import React,{Component} from "react"
import {Query} from 'react-apollo'
import Error from './ErrorMessage'
import gql from 'graphql-tag'
import styled from "styled-components"

const SingleItemStyles=styled.div`
    max-width:1200px;
    margin:2rem auto;
    box-shadow:${props=>props.theme.bs};
    display:grid;
    grid-auto-columns:1fr;
    grid-auto-flow:column;
    min-height:800px;
    img{
        width:100%;
        height:100%;
        object-fit:contain;
    }
    .details{
        margin:3rem;
        p{
            font-size:1.2rem;
        }
    }
    
`;

const SINGLE_ITEM_QUERY=gql`
    query SINGLE_ITEM_QUERY($id:ID!){
        item(where:{
            id:$id
        }){
            id
            title
            price
            image
            largeImage
            description
        }
    }
`;
class SingleItem extends Component{
    render(){
        return (
            <Query query={SINGLE_ITEM_QUERY} variables={{id:this.props.id}}>
                {
                    ({data,error,loading})=>{
                        //data.item必须有largeImage才行
                        //SINGLE_ITEM_QUERY！！！！

                        if(loading) return <p>Loading...</p>
                        if(error) return <Error error={error}/>
                        if(!data.item) return <p>No Item Found</p>
                        const item = data.item;
                        console.log(item.largeImage)
                        return (
                            <SingleItemStyles>
                                <img src={data.item.largeImage} alt={data.item.title}/>
                                <div className="details">
                                    <h3>Viewing {data.item.title}</h3>
                                    <p>{data.item.description}</p>
                                </div>
                            </SingleItemStyles>
                        )
                    }
                }
            </Query>

        );
    }
}
export default SingleItem;
export {SINGLE_ITEM_QUERY}