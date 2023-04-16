import { useEffect, useState } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';
import { Link } from 'react-router-dom';
import { Wrapper, Card, Gradient } from './PopularCard';
import { Container, Row, Col } from 'react-bootstrap';

function Veggie() {
  const [veggie, setVeggie] = useState([]);

  useEffect(() => {
    getVeggie();
  }, []);

  const getVeggie = async () => {
    const check = localStorage.getItem('veggie');

    if (check) {
      setVeggie(JSON.parse(check));
    } else {
      const api = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_RECIPE_API_KEY}&number=9&tags=vegetarian`
      );
      const data = await api.json();
      setVeggie(data.recipes);
      localStorage.setItem('veggie', JSON.stringify(data.recipes));
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
            <h3>Vegetarian Picks</h3>
            <Splide
              options={{
                focus: 0,
                perMove:1,
                perPage: 3,
                pagination: false,
                drag: 'free',
                gap: '5rem',
                breakpoints: {
                  1280: {
                    perPage: 2,
                  },
                  840: {
                    perPage: 1,
                  },
                },
              }}
            >
              {veggie.map((recipe) => {
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

export default Veggie;
