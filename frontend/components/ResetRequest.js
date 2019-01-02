import React,{Component} from 'react'
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag'
import Form from './styles/Form'
import Error from './ErrorMessage'

const RESET_REQUEST_MUTATION=gql`
    mutation RESET_REQUEST_MUTATION($email:String!){
        resetRequest(email:$email){
            message
        }
    }
`;
class ResetRequest extends Component{
    state={
        email:''
    };
    saveToState=(e)=>{
        this.setState({[e.target.name]:e.target.value});
    };
    render(){
        return(
            <Mutation mutation={RESET_REQUEST_MUTATION} variables={this.state}>
                {
                    (resetRequestFunc,{loading,error,called})=>{
                        return(
                            <Form
                                method='POST'
                                onSubmit={async e=>{
                                    e.preventDefault();
                                    resetRequestFunc();
                                    this.setState({
                                        email:"",
                                    })
                                }}
                            >
                                <fieldset disabled={loading} aria-busy={loading}>
                                    <h2>Request a Password Reset</h2>
                                    <Error error={error}/>
                                    {!loading && !error && called && <p>Success! Check your email for a reset link!</p>}
                                    <label htmlFor="email">
                                        Email
                                        <input type="email"
                                               name="email"
                                               placeholder="email"
                                               value={this.state.email}
                                               onChange={this.saveToState}/>
                                    </label>
                                    <button type="submit">Request a Reset</button>
                                </fieldset>
                            </Form>
                        );
                    }
                }
            </Mutation>
        )
    }
}
export default ResetRequest