import { useEffect, useState } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { Link } from 'react-router-dom';
import { Wrapper, Card, Gradient } from './PopularCard';
import { Container, Row, Col } from 'react-bootstrap';

function Popular() {
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    getPopular();
  }, []);

  const getPopular = async () => {
    const check = localStorage.getItem('popular');

    if (check) {
      setPopular(JSON.parse(check));
    } else {
      const api = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_RECIPE_API_KEY}&number=12`
      );
      const data = await api.json();
      setPopular(data.recipes);
      localStorage.setItem('popular', JSON.stringify(data.recipes));
    }
  };
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col
          sm
          lg={10}
        >
          <Wrapper>
            <h3>Popular Picks</h3>
            <Splide
              options={{
                perPage: 4,
                pagination: false,
                drag: 'free',
                gap: '5rem',
                breakpoints: {
                  1280: {
                    perPage: 3,
                  },
                  840: {
                    perPage: 2,
                  },
                  500: {
                    perPage: 1,
                  },
                },
              }}
            >
              {popular.map((recipe) => {
                return (
                  <SplideSlide key={recipe.id}>
                    <Card>
                      <Link to={'/recipe/' + recipe.id}>
                        <p>{recipe.title}</p>
                        <img
                          src={recipe.image}
                          alt={recipe.title}
                        />
                        <Gradient />
                      </Link>
                    </Card>
                  </SplideSlide>
                );
              })}
            </Splide>
          </Wrapper>
        </Col>
      </Row>
    </Container>
  );
}

export default Popular;
