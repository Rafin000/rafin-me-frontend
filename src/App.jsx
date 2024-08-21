import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.css';
import Layout from './components/Layout';
import Blog from './pages/Blog';
import Home from './pages/Home';
import Contact from './pages/Contact';
import BlogDetails from './pages/Blog/BlogCard/BlogDetails';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blogs/:postId" element={<BlogDetails />}/>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;