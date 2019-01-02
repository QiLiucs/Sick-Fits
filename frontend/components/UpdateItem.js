import React,{Component} from "react"
import Form from './styles/Form'
import {Mutation,Query} from 'react-apollo'
import Error from './ErrorMessage'
import gql from 'graphql-tag'

// 参考play的写法
const SINGLE_ITEM_QUERY=gql`
    query SINGLE_ITEM_QUERY($id:ID!){
        item(where:{id:$id}){
            id
            title
            description
            price
        }
    }
`;
const UPDATE_ITEM_MUTATION=gql`
    mutation UPDATE_ITEM_MUTATION(
        $id:ID!
        $title:String
        $description:String
        $price:Int
    ){
        updateItem(
            id:$id
            title:$title
            description:$description
            price:$price
        ){
            id
            price
        }
    }
`;
class UpdateItem extends Component{
    state={};
    handleChange=(e)=>{
        const {name,type,value}=e.target;//e.target.name
        console.log(name)
        console.log(e.target.name)
        const val=type==='number'?parseFloat(value):value;
        this.setState(
            {
                [name]:val,
            }
        )
    };
    updateItem=async(e,updateItemFunc)=>{
        e.preventDefault();
        console.log(this.props.id)
        const res=await updateItemFunc({
            variables:{
                id:this.props.id,
                ...this.state//解析，就相当于去掉括号，取出所有的键值对
            },
        });
        console.log(res);
    };
    render(){
        return(
            <Query query={SINGLE_ITEM_QUERY} variables={{id:this.props.id}}>
                {
                    ({loading,data})=>{
                        if(loading) return <p>Loading...</p>;
                        // 如果找不到id?
                        if(!data.item) return <p>No Item of Id {this.props.id} Found</p>;
                        return(
                            <Mutation mutation={UPDATE_ITEM_MUTATION}
                                      >
                                {
                                    (updateItemFunc,{loading,error})=>(
                                        <Form onSubmit={e=>this.updateItem(e,updateItemFunc)}>
                                            <Error error={error}/>
                                            <fieldset disabled={loading} aria-busy={loading}>

                                                <label htmlFor="title">
                                                    Title
                                                </label>
                                                {/*使用defaultValue的好处就是避免数据绑定，导致无法改变input的内容*/}
                                                <input
                                                    type="text"
                                                    id="title"
                                                    name="title"
                                                    placeholder="title"
                                                    defaultValue={data.item.title}
                                                    onChange={this.handleChange}
                                                />
                                                <label htmlFor="price">
                                                    Price
                                                </label>
                                                <input
                                                    type="number"
                                                    id="price"
                                                    name="price"
                                                    placeholder="price"
                                                    defaultValue={data.item.price}
                                                    onChange={this.handleChange}
                                                />
                                                <label htmlFor="description">
                                                    Description
                                                </label>
                                                <textarea
                                                    type="text"
                                                    id="description"
                                                    name="description"
                                                    placeholder="description"
                                                    defaultValue={data.item.description}
                                                    onChange={this.handleChange}
                                                />
                                                <button type='submit'>Save Changes</button>
                                            </fieldset>
                                        </Form>
                                    )
                                }
                            </Mutation>
                        );
                    }
                }

            </Query>

        )
    }
}
export default UpdateItem;