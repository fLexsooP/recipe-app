import React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Container, Row, Col } from 'react-bootstrap';

function Recipe() {
  let params = useParams();
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState('instructions');

  const fetchDetails = async () => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_RECIPE_API_KEY}`
    );
    const detailData = await data.json();
    setDetails(detailData);
  };

  useEffect(() => {
    fetchDetails();
  }, [params.name]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col
          sm
          lg={10}
        >
          <DetailWrapper
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <h2>{details.title}</h2>
              <img
                src={details.image}
                alt={details.title}
              />
            </div>
            <Info>
              <Button
                className={activeTab === 'instructions' ? 'active' : ''}
                onClick={() => setActiveTab('instructions')}
              >
                Instructions
              </Button>
              <Button
                className={activeTab === 'ingredients' ? 'active' : ''}
                onClick={() => setActiveTab('ingredients')}
              >
                Ingredients
              </Button>
              {activeTab === 'instructions' && (
                <div>
                  <p
                    dangerouslySetInnerHTML={{ __html: details.summary }}
                  ></p>
                  <p
                    dangerouslySetInnerHTML={{ __html: details.instructions }}
                  ></p>
                </div>
              )}
              {activeTab === 'ingredients' && (
                <ul>
                  {details.extendedIngredients?.map((ingredient) => (
                    <li key={ingredient.id}>{ingredient.original}</li>
                  ))}
                </ul>
              )}
            </Info>
          </DetailWrapper>
        </Col>
      </Row>
    </Container>
  );
}

const DetailWrapper = styled(motion.div)`
  margin-top: 10rem;
  margin-bottom: 5rem;
  display: flex;
  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }
  h2 {
    margin-bottom: 2rem;
    width: 34rem;
  }
  li {
    font-size: 1.2rem;
    line-height: 2.5rem;
  }
  ul {
    margin-top: 2rem;
  }
  p {
    margin: 1rem 0;
  }
`;

const Button = styled.button`
  padding: 1rem 2rem;
  color: #313131;
  background: white;
  border: 2px solid black;
  margin-right: 2rem;
  font-weight: 600;
`;

const Info = styled.div`
  margin-left: 5rem;
`;

export default Recipe;
