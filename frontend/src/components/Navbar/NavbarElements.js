import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.nav`
    background: black;
    position: fixed;
    top: 0;
    height: 85px;
    display: flex;
    justify-content: space-between;
    padding: 0.2rem calc((100vw - 1000px) / 2);
    z-index: 12;
    /* Third Nav */
    /* justify-content: flex-start; */
`;

export const NavLink = styled(Link)`
    color: white;
    display: flex;
    align-items: center;
    margin: 10px;
    text-decoration: none;
    padding: 0 1rem;
    height: 100%;
    cursor: pointer;
    &.active {
        color: red;
    }

    @media screen and (max-width: 768px) {
        margin-right: -25px;
        margin-left: 2px;
        font-size: 10px;
    }
`;

export const Bars = styled(FaBars)`
    display: none;
    color: #808080;
    // @media screen and (max-width: 768px) {
    // 	display: block;
    // 	position: absolute;
    // 	top: 0;
    // 	right: 0;
    // 	transform: translate(-100%, 75%);
    // 	font-size: 1.8rem;
    // 	cursor: pointer;
    // }
`;

export const NavMenu = styled.div`
    display: flex;
    align-items: center;
    margin-right: -24px;
    /* Second Nav */
    /* margin-right: 24px; */
    /* Third Nav */
    /* width: 100vw;
white-space: nowrap; */
    // @media screen and (max-width: 768px) {
    // 	display: none;
    // }
`;

export const NavBtn = styled.nav`
    display: flex;
    align-items: center;
    margin-left: 20%;
    // margin-right: 24px;
    /* Third Nav */
    /* justify-content: flex-end;
width: 100vw; */
    @media screen and (max-width: 768px) {
        margin-left: 5%;
        font-size: 10px;
    }
`;

export const NavBtnLink = styled(Link)`
    border-radius: 10px;
    background: #696969;
    padding: 10px 22px;
    color: white;
    outline: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    /* Second Nav */
    margin-left: 24px;
    &:hover {
        transition: all 0.2s ease-in-out;
        background: blue;
        color: white;
        opacity: 0.6;
        text-transform: uppercase;
    }

    @media screen and (max-width: 768px) {
        padding: 6px 10px;
    }
`;
