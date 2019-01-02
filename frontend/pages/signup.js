import Signup from '../components/Signup'
import Signin from '../components/Signin'
import ResetRequest from '../components/ResetRequest'
import React,{Component} from 'react'
import styled from 'styled-components'
const Columns=styled.div`
    display:grid;
    grid-template-columns:repeat(auto-fit,minmax(300px,1fr));
    grid-gap:20px;
`;
class SignupPage extends Component{
    render(){
        return(
            <Columns>
                <Signup/>
                <Signin/>
                <ResetRequest/>
            </Columns>
        );
    }
}
export default SignupPage;