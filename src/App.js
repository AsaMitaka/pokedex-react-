import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Footer, Header } from './components';
import { BerriesPage, ErrorPage, Items, MainPage, PokeItem, Pokemon, FavoritePoke } from './pages';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/pokemon/" element={<PokeItem />} />
        <Route path="/pokemon/:pokemonId" element={<Pokemon />} />
        <Route path="/berry/" element={<BerriesPage />} />
        <Route path="/items/" element={<Items />} />
        <Route path="/items/:pageId" element={<Items />} />
        <Route path="/favorite/" element={<FavoritePoke />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
