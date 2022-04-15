import styled from "styled-components";

export const Box = styled.div`
    padding: 80px 20px;
    background: black;
    position: absolute;
    bottom: 0;
    width: 100%;

    @media (max-width: 1000px) {
        padding: 70px 30px;
    }
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 1000px;
    margin: 0 auto;
    /* background: red; */
`;

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
`;

export const Row = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(185px, 1fr));
    grid-gap: 50px;

    @media (max-width: 1000px) {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    }
`;

export const FooterLink = styled.a`
    color: #fff;
    margin-bottom: none;
    font-size: 18px;
    text-decoration: none;

    &:hover {
        color: blue;
        transition: 200ms ease-in;
    }
`;

export const Heading = styled.p`
    font-size: 24px;
    color: #fff;
    margin-bottom: 0px;
    font-weight: bold;
`;
