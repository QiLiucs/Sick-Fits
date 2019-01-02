import React,{Component} from 'react'
import Reset from '../components/Reset'
class ResetPage extends Component{
    render(){
        return(
            <Reset resetToken={this.props.query.resetToken}></Reset>
        )
    }
}
export default ResetPage;