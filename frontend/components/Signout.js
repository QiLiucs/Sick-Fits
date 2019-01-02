import React,{Component} from 'react'
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag'
import {CURRENT_USER_QUERY} from "./User"

const SIGNOUT_MUTATION=gql`
    mutation SIGNOUT_MUTATION{
        signout{
            message
        }
    }
`;
class Signout extends Component{
    render(){
        return(
            <Mutation mutation={SIGNOUT_MUTATION} refetchQueries={[{query:CURRENT_USER_QUERY}]}>
                {
                    (signoutFunc,{loading,error})=>{
                        return(
                            <button onClick={signoutFunc}>Sign out</button>
                        )
                    }
                }

            </Mutation>

        )
    }
}
export default Signout