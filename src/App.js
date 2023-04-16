import Pages from './pages/Pages';
import Category from './components/Category';
import Header from './components/Header';
import Footer from './components/Footer'
import { BrowserRouter } from 'react-router-dom';
import Search from './components/Search';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Search />
        <Category />
        <Pages />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
