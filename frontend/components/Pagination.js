import React,{Component} from "react"
import PaginationStyles from './styles/PaginationStyles'
import gql from 'graphql-tag'
import {Query} from 'react-apollo'
import Error from './ErrorMessage'
import {perPage} from '../config.js'
import Link from "next/link"

const PAGINATION_QUERY=gql`
  query PAGINATION_QUERY{
      itemsConnection{
          aggregate{
              count
          }
      }
  } 
`;
class Pagination extends Component{
    render(){
        return(
            <Query query={PAGINATION_QUERY}>
                {
                    ({data,loading,error})=>{
                        if(loading) return <p>Loaging...</p>
                        if(error) return <Error error={error}></Error>
                        const count=data.itemsConnection.aggregate.count;
                        const pages=Math.ceil(count/perPage);
                        const pagenum=this.props.pagenum;
                        return (
                            <PaginationStyles>
                                <Link
                                href={{
                                    pathname:'items',
                                    query:{page:pagenum-1}
                                }}>
                                    <a className="prev" aria-disabled={pagenum<=1}>← Prev</a>
                                </Link>
                                <p>Page {pagenum} of {pages}</p>
                                <p>{count} Items Total</p>
                                <Link
                                    href={{
                                        pathname:'items',
                                        query:{page:pagenum+1}
                                    }}>
                                    <a className="prev" aria-disabled={pagenum>=pages}>Next →</a>
                                </Link>
                                </PaginationStyles>
                        )
                    }
                }
            </Query>

        )
    }
}
export default Pagination