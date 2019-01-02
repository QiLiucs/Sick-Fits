import React,{Component} from "react"
import Link from "next/link"
import Items from '../components/Items'
class Home extends Component{
    render(){
        return (
            <div>
                {/*<p>Hey!</p>*/}
                {/*/!*use link to avoid refresh*!/*/}
                {/*<Link href="/mysell">*/}
                    {/*sell!*/}
                {/*</Link>*/}
                <Items pagenum={this.props.query.page || 1}/>
            </div>

        )
    }
}
export default Home