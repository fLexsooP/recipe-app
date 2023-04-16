import React from 'react'
import styled from 'styled-components';
import { GiMeal } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import {Container, Row, Col} from 'react-bootstrap';

function Header() {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col
          sm
          lg={10}
        >
          <Nav>
            <GiMeal />
            <Logo to={'/'}>Recipest</Logo>
          </Nav>
        </Col>
      </Row>
    </Container>
  );
}

const Logo = styled(Link)`
  text-decoration: none;
  font-size: 2rem;
  font-weight: 400;
  font-family: 'Lobster Two', cursive;
  color: black;
`;

const Nav = styled.div`
  padding: 4rem 0rem;
  display: flex;
  justify-content: left;
  align-items: center;
  svg {
    font-size: 3rem;
  }
`;

export default Header