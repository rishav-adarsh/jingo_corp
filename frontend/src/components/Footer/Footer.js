import React from "react";
import {
    Box,
    Container,
    Row,
    Column,
    FooterLink,
    Heading,
} from "./FooterStyles";

const Footer = () => {
    return (
        <div className="page-container">
            {/* <div className="content-wrap"></div> */}
            <footer className="footer">
                <Box>
                    <h1
                        style={{
                            color: "blue",
                            textAlign: "center",
                            marginTop: "-80px",
                        }}
                    >
                        Floating Gears: All you need
                    </h1>
                    <Container>
                        <Row>
                            <Column>
                                <Heading>Email</Heading>
                                <FooterLink href="#">shiv@gmail.com</FooterLink>
                                <FooterLink href="#">
                                    Priyam@gmail.com
                                </FooterLink>
                                <FooterLink href="#">
                                    Rishav@gmail.com
                                </FooterLink>
                            </Column>
                            <Column>
                                <Heading>Call Us</Heading>
                                <FooterLink href="#">+91 XXXXXXXXXX</FooterLink>
                                <FooterLink href="#">+91 XXXXXXXXXX</FooterLink>
                                <FooterLink href="#">+91 xxxxxxxxxx</FooterLink>
                            </Column>
                            <Column>
                                <Heading>Address</Heading>
                                <Heading>
                                    GS Road, Guwahati, Assam, India
                                </Heading>
                            </Column>
                        </Row>
                    </Container>
                </Box>
            </footer>
        </div>
    );
};
export default Footer;
