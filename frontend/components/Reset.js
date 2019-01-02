import React,{Component} from 'react'
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag'
import Form from './styles/Form'
import Error from './ErrorMessage'
import PropTypes from 'prop-types'

const RESET_MUTATION=gql`
    mutation RESET_MUTATION($resetToken:String!,$password:String!,$confirmpassword:String!){
        resetPassword(resetToken:$resetToken,password:$password,confirmpassword:$confirmpassword){
            id
            email
            name
        }
    }
`;
class Reset extends Component{
    state={
        password:'',
        confirmpassword:''
    };
    saveToState=(e)=>{
        this.setState({[e.target.name]:e.target.value});
    };
    render(){
        return(
            <Mutation mutation={RESET_MUTATION} variables={{
                resetToken:this.props.resetToken,
                ...this.state
            }}>
                {
                    (resetFunc,{loading,error,called})=>{
                        return(
                            <Form
                                method='POST'
                                onSubmit={async e=>{
                                    e.preventDefault();
                                    resetFunc();
                                    this.setState({
                                        password:"",
                                        confirmpassword:""
                                    })
                                }}
                            >
                                <fieldset disabled={loading} aria-busy={loading}>
                                    <h2>Reset Password</h2>
                                    <Error error={error}/>
                                    {!loading && !error && called && <p>Success!</p>}
                                    <label htmlFor="password">
                                        password
                                        <input type="password"
                                               name="password"
                                               placeholder="password"
                                               value={this.state.password}
                                               onChange={this.saveToState}/>
                                    </label>
                                    <label htmlFor="confirmpassword">
                                        confirm password
                                        <input type="password"
                                               name="confirmpassword"
                                               placeholder="confirmpassword"
                                               value={this.state.confirmpassword}
                                               onChange={this.saveToState}/>
                                    </label>
                                    <button type="submit">Reset Your Password</button>
                                </fieldset>
                            </Form>
                        );
                    }
                }
            </Mutation>
        )
    }
}
export default Reset