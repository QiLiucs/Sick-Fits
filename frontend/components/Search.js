import React,{Component} from "react"
import Downshift from "downshift"
import Router from "next/router"
import {ApolloConsumer} from "react-apollo"
import gql from "graphql-tag"
import debounce from 'lodash.debounce'
import {DropDown, DropDownItem, SearchStyles} from "./styles/DropDown"

const SEARCH_ITEMS_QUERY=gql`
    query SEARCH_ITEMS_QUERY($searchTerm:String!){
        items(where:{
            #            至少满足其中一个，如果不用or,它会直接去判断title_contains,如果不满足就返回false了
            OR:[
                {title_contains:$searchTerm},
                {description_contains:$searchTerm}
            ]
        }){
            id
            image
            title
        }
    }
`;
function routeToItem(item){
    // console.log(item);
    Router.push({
        pathname:'/item',
        query:{
            id:item.id,
        }
    })
}
class AutoComplete extends Component{
    state={
        items:[],
        loading:false
    };
    onChange=debounce(async (e,client)=>{
        //turn loading on
        this.setState({loading:true});
        //2.manually query
        const res=await client.query({
            query:SEARCH_ITEMS_QUERY,
            variables:{searchTerm:e.target.value}
        });
        //3.set state
        this.setState({
            items:res.data.items,
            loading:false,
        });
    },350);//350 ms

    render(){
        return(
            <SearchStyles>
                {/*itemToString:当enter或select的时候，将选中的item转化为string显示在search box里*/}
                {/*routeToItem: enter的时候，进去选中的item的页面*/}
                <Downshift onChange={routeToItem} itemToString={item => (item===null?"":item.title)}>
                    {
                        //destructure
                        ({getInputProps,getItemProps,isOpen,inputValue,highlightedIndex})=>(
                            <div>
                                <ApolloConsumer>
                                    {
                                        (client)=>{
                                            return  <input
                                                {...getInputProps({
                                                    type:"search",
                                                    placeholder:"Search An Item",
                                                    id:"search",
                                                    className:this.state.loading?"loading":'',
                                                    onChange:(e)=>{
                                                        e.persist();
                                                        this.onChange(e,client);
                                                    }
                                                })
                                                }/>
                                        }
                                    }
                                </ApolloConsumer>
                                {/*点击空白处，isOpen=false,dropdown消失*/}
                                {isOpen && (
                                    <DropDown>
                                        {
                                            this.state.items.map((item, index) => (
                                                //key down或者点击的时候，对选中的item添加样式，使其highlight
                                                <DropDownItem {...getItemProps({item})}
                                                              highlighted={index === highlightedIndex}>
                                                    <img width="50px" src={item.image}/>
                                                    <span>{item.title}</span>
                                                </DropDownItem>
                                            ))
                                        }
                                        {/*如果没有搜到，显示提示信息*/}
                                        {!this.state.items.length && !this.state.loading
                                        && <DropDownItem><span>Nothing found {inputValue}</span></DropDownItem>}

                                    </DropDown>
                                )}
                            </div>
                        )
                    }
                </Downshift>

            </SearchStyles>
        )
    }

}
export default AutoComplete;