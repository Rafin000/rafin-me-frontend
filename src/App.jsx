import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.css';
import Layout from './components/Layout';
import Blog from './pages/Blog';
import Home from './pages/Home';
import Contact from './pages/Contact';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;