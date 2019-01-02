import MyNav from "./MyNav"
import React,{Component} from "react"
import Link from "next/link"
import styled from "styled-components"
import Cart from "./Cart"
import Search from "./Search"


const Logo=styled.h1`
    font-size:3rem;
    margin-left:2rem;
    position:relative;
    z-index:2;
    transform:skew(-7deg);
    a{
        padding:0.5rem 1rem;
        background:${props=>props.theme.red};
        color:white;
        text-transform:uppercase;
        text-decoration:none;
    }
    @media(max-width:1300px){
        margin:0;
        text-align:center;
    }
`;
//S must be UpperCase
const StyleHeader=styled.div`
    .bar{
        border-bottom:10px solid ${props=>props.theme.black};
        display:grid;
        grid-template-columns:auto 1fr;
        justify-content:space-between;
        align-items:stretch;
        @media(max-width:1300px){
            grid-template-columns:1fr;
            justify-content:center;
        }
    }
    .sub-bar{
        display:grid;
        grid-template-columns:1fr auto;
        border-bottom:1px solid ${props=>props.theme.lightgrey}
    }
    
`;
class Header extends Component{
    render(){
        return(
            <StyleHeader>
                <div className="bar">
                    <Logo>
                        <Link href="/">
                            <a>Sick Fits</a>
                        </Link>
                    </Logo>
                    <MyNav/>
                </div>
                <div className="sub-bar">
                    <Search/>
                </div>
                <Cart/>
            </StyleHeader>
        )
    }

}
export default Header