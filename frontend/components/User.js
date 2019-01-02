import React,{Component} from 'react'
import {Query} from 'react-apollo';
import gql from 'graphql-tag'
import PropTypes from 'prop-types'

const CURRENT_USER_QUERY=gql`
    query CURRENT_USER_QUERY{
        me{
            id
            email
            name
            permissions
            cart{
                id 
                quantity
                item{
                    id
                    price
                    image
                    title
                    description
                }
            }
            
        }
    }
`;
class User extends Component{
    render(){
        return(
            <Query query={CURRENT_USER_QUERY} {...this.props}>
                {
                    payload=>{
                        console.log("hhh")
                        console.log(payload)
                        console.log(this.props)
                        return this.props.children(payload);
                    }
                }
            </Query>
        )
    }
}
//User<>里面的内容必须是一个func
User.propTypes={
    children:PropTypes.func.isRequired,
};
export default User;
export {CURRENT_USER_QUERY}