import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";

const StyledSideNav = styled.div`   
    position: fixed;     /* Fixed Sidebar (stay in place on scroll and position relative to viewport) */
    height: 100%;
    z-index: 1;      /* Stay on top of everything */
    top: 3.4em;      /* Stay at the top */
    background-color: #222; /* Black */
    overflow-x: hidden;     /* Disable horizontal scroll */
    padding-top: 10px;
`;

class SideNav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            sidebarWidth: '0em',
            activePath: props.location.pathname,
            items: [
                {
                  path: '/', /* path is used as id to check which NavItem is active basically */
                  name: 'Home',
                  key: 1 /* Key is required, else console throws error. Does this please you Mr. Browser?! */
                },
                {
                  path: '/posts',
                  name: 'Post',
                  key: 2
                },
                {
                  path: '/revgeo',
                  name: 'Reverse Geo',
                  key: 3
                },
              ]
        }
    }

    onSidebarClose = () => {
        this.setState({ sidebarWidth: '0em', isOpen: false });
    }
  
    onSidebarOpen = () => {
        this.setState({ sidebarWidth: '15em', isOpen: true});
    }

    onItemClick = (path) => {
        this.setState({ activePath: path });
    }

    render() {
        const { items, activePath } = this.state;
        
        return(
            <StyledSideNav style={{width: this.state.sidebarWidth}}>
                {this.state.isOpen ?  <span className="closebtn" onClick={this.onSidebarClose}>&times;</span>: <span  className="openbtn" onClick={this.onSidebarOpen}>&#9776;</span>}
                {
                    items.map((item) => {
                        return (
                            <NavItem 
                                path={item.path}
                                name={item.name}
                                css={item.css}
                                onItemClick={this.onItemClick}
                                active={item.path === activePath}
                                key={item.key}
                            />
                        );
                    })
                }
            </StyledSideNav>
        );
    }
}

const RouterSideNav = withRouter(SideNav);

const StyledNavItem = styled.div`
    height: 70px;
    width: 14em; /* width must be same size as NavBar to center */
    text-align: left; /* Aligns <a> inside of NavIcon div */
    margin-bottom: 0;   /* Puts space between NavItems */
    margin-left:.8em;
    a {
        font-size: 1.2em;
        line-height: 2.6em;
        color: ${(props) => props.active ? "white" : "#9FFFCB"};
        :hover {
            opacity: 0.7;
            text-decoration: none; /* Gets rid of underlining of icons */
        }  
    }
`;

class NavItem extends React.Component {
    handleClick = () => {
        const { path, onItemClick } = this.props;
        onItemClick(path);
    }

    render() {
        const { active } = this.props;
        return(
            <StyledNavItem active={active}>
                <Link to={this.props.path} className={this.props.css} onClick={this.handleClick}>
                    {this.props.name}
                </Link>
            </StyledNavItem>
        );
    }
}

const NavIcon = styled.div`

`;

export default class Sidebar extends React.Component {
    
    render() {
        return (
            <div>
                <RouterSideNav></RouterSideNav>
                
            </div>
        );
    }
}