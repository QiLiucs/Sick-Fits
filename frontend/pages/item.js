import React,{Component} from "react"
import SingleItem from '../components/SingleItem'
class Item extends Component{
    render(){
        return (
            <SingleItem id={this.props.query.id}></SingleItem>
        );
    }
}
export default Item;