import React,{Component} from 'react'
import Form from './styles/Form'
import formatMoney from "../lib/formatMoney"
import {Mutation} from 'react-apollo'
import Error from './ErrorMessage'
import Router from 'next/router'
import gql from 'graphql-tag'
// !:required
const CREATE_ITEM_MUTATION=gql`
    mutation CREATE_ITEM_MUTATION(
        $title:String!
        $description:String!
        $image:String
        $largeImage:String
        $price:Int!
    ){
        createItem(
            title:$title
            description:$description
            image:$image
            largeImage:$largeImage
            price:$price
        ){
            id
        }
    }
`;
class CreateItem extends Component{
    state={
        title:'Cool Shoes',
        description:'I love this item',
        largeImage:'large-item.jpg',
        image:'item.jpg',
        price:1000,
    };
    //这个函数只能处理一个input的变化，if description的input变化？price change?要写许多个handleChange函数么？
    // handleChange=(e)=>{
    //     console.log(e.target);
    //     this.setState({
    //         title:e.target.value,
    //     });
    // };
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
    uploadFile=async e=>{
        console.log("upload file...");
        const files=e.target.files;
        console.log(files);
        const formdata=new FormData();
        formdata.append("file",files[0]);
        formdata.append('upload_preset','sickfits');
        console.log(formdata);
        const res=await fetch("https://api.cloudinary.com/v1_1/dk5oi9w1l/image/upload",{method:'POST',body:formdata});
        const file=await res.json();
        console.log(file);
        //用于图片预览
        this.setState({
            //e.g https://res.cloudinary.com/dk5oi9w1l/image/upload/v1545680179/sickfits/y5xtmrknv9tikvlzmx2w.jpg
            image:file.secure_url,
            largeImage:file.eager[0].secure_url
        })

    };

    render(){
        return(
            <Mutation mutation={CREATE_ITEM_MUTATION}
            variables={this.state}>
                {
                    (createItemFunc,{loading,error})=>(
                        <Form onSubmit={
                            async (e)=>{
                                // 点击不会跳转到http://localhost:7777/mysell?title=Cool+Shoes&price=1000&description=I+love+this+item
                                e.preventDefault();
                                //call the mutation
                                const res=await createItemFunc();
                                //change them to the single item page
                                console.log(res)//返回id
                                Router.push({
                                    pathname:'/item',
                                    query:{id:res.data.createItem.id}
                                })

                            }
                        }>

                            <Error error={error}/>
                            <fieldset disabled={loading} aria-busy={loading}>
                                <label htmlFor="file">
                                    Image
                                </label>
                                <input
                                    type="file"
                                    id="file"
                                    name="file"
                                    placeholder="Upload an Image"
                                    onChange={this.uploadFile}
                                />
                                {this.state.image&&<img src={this.state.image} alt="preview" width="200px"/>}
                                <label htmlFor="title">
                                    Title
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    placeholder="title"
                                    value={this.state.title}
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
                                    value={this.state.price}
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
                                    value={this.state.description}
                                    onChange={this.handleChange}
                                />
                                {/*http://localhost:7777/mysell?title=Cool+Shoes&price=1000&description=I+love+this+item
                    这并不是我想要跳转的页面，所以需要处理onSubmit函数*/}
                                <button type='submit'>Submit</button>
                            </fieldset>
                        </Form>
                    )
                }
            </Mutation>

        )
    }
}
export default CreateItem;