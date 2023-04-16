import { Container, Row, Col } from 'react-bootstrap';
import { AiFillHeart } from 'react-icons/ai';

function Footer() {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs lg={3} className='text-center mb-5 '>
          made with <AiFillHeart color='red'/> by Chence
        </Col>
      </Row>
    </Container>
  );
}

export default Footer;
