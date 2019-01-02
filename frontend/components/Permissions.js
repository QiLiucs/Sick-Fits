import React,{Component} from 'react'
import {Query,Mutation} from 'react-apollo';
import gql from 'graphql-tag'
import Error from './ErrorMessage'
import Table from "./styles/Table"
import SickButton from "./styles/SickButton"

const possiblePerms=[
    "ADMIN",
    "USER",
    "ITEMCREATE",
    "ITEMUPDATE",
    "ITEMDELETE",
    "PERMISSIONUPDATE",
];
const ALL_USERS_QUERY=gql`
    query ALL_USERS_QUERY{
        users{
            id
            name
            email
            permissions
        }
    }
`;
const UPDATE_PERMISSION_MUTATION=gql`
    mutation UPDATE_PERMISSION_MUTATION($permissions:[Permission],$userId:ID!){
        updatePermission(permissions:$permissions,userId:$userId){
            id
            permissions
            name
            email
        }
    }
`;
class Permissions extends Component{
    render(){
        return(
          <Query query={ALL_USERS_QUERY}>
              {
                  ({data,loading,error})=>{
                      if(loading) return <p>Loading...</p>
                      if(error) return <Error error={error}/>
                      return (
                          <div>
                              <h3>Manage Permission</h3>
                              <Table>
                                  <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        {possiblePerms.map(permit=><th>{permit}</th>)}
                                    </tr>
                                  </thead>
                                  <tbody>
                                  {data.users.map(user=><User user={user}/>)}
                                  </tbody>
                              </Table>
                          </div>
                      )
                  }
              }
          </Query>
        );
    }
}
class User extends Component{
    state={
        permissions:this.props.user.permissions
    };
    handlePermissionChange=e=>{
        const checkbox=e.target;
        //array
        let updatedPermissions=[...this.state.permissions];//make a copy!!!!let updatedPermissions=this.state.permissions:it is a reference
        if(checkbox.checked){
            //add it in
            updatedPermissions.push(checkbox.value);
        }else{
            updatedPermissions=updatedPermissions.filter(
                permission=>permission!==checkbox.value//false被删
            )
        }
        this.setState({permissions:updatedPermissions});
    };
    render(){
        const user=this.props.user;
        return(
            <Mutation mutation={UPDATE_PERMISSION_MUTATION} variables={
                {
                    permissions:this.state.permissions,
                    userId:user.id
                }}
            >
                {
                    (updatePermissionFunc,{loading,error})=>{
                        return(
                            <>
                                {error && <tr><td colSpan="8"><Error  error={error}/></td></tr>}
                                <tr>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>

                                    {possiblePerms.map(permit=>(
                                        <td>
                                            <label htmlFor={`${user.id}-${permit}`}>
                                                <input type="checkbox"
                                                       checked={this.state.permissions.includes(permit)}
                                                       value={permit}
                                                       onChange={this.handlePermissionChange}
                                                />
                                            </label>
                                        </td>
                                    ))}
                                    <td><SickButton disabled={loading} onClick={updatePermissionFunc}>UPDAT{loading?'ING':'E'}</SickButton></td>
                                </tr>
                            </>
                        );
                    }

                }
            </Mutation>


        );
    }
}
export default Permissions;