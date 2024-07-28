import './index.css';
import Navbar from '../Navbar'; 
import Footer from '../Footer';

// eslint-disable-next-line react/prop-types
function Layout({ children }) {
  return (
    <div className="layout">
      <header className="layout-header">
        <Navbar />  
      </header>
      <main className="layout-main">{children}</main>
      <Footer/>
    </div>
  );
}

export default Layout;
