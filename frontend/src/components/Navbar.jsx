import { Link } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, LogOut, LayoutDashboard } from 'lucide-react';
import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const { cartItems } = useContext(CartContext);
  
  const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);

  return (
    <nav className="glass" style={{ position: 'sticky', top: 0, zIndex: 1000, padding: '15px 0' }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
          <img src="/LOGO-AGRI.png" alt="AgriTools Logo" style={{ height: '50px', objectFit: 'contain' }} />
        </Link>

        {/* Desktop Menu */}
        <div className="desktop-menu" style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
          <div style={{ display: 'flex', gap: '30px', fontWeight: 600, color: 'var(--text-dark)' }}>
            <Link to="/" className="nav-link">Início</Link>
            <Link to="/shop" className="nav-link">Loja</Link>
            <Link to="/services" className="nav-link">Serviços</Link>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', paddingLeft: '30px', borderLeft: '1px solid #eee' }}>
            <Link to="/cart" style={{ position: 'relative' }}>
              <ShoppingCart size={24} color="var(--text-dark)" />
              {totalItems > 0 && (
                <span style={{ 
                  position: 'absolute', 
                  top: '-8px', 
                  right: '-10px', 
                  backgroundColor: 'var(--accent)', 
                  color: 'white', 
                  borderRadius: '50%', 
                  width: '20px', 
                  height: '20px', 
                  fontSize: '0.7rem', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontWeight: 800,
                  boxShadow: '0 4px 10px rgba(245, 158, 11, 0.4)'
                }}>
                  {totalItems}
                </span>
              )}
            </Link>
            
            {user ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                <Link to={user.role === 'admin' ? '/admin' : '/profile'} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', fontWeight: 700 }}>
                  <div style={{ width: '35px', height: '35px', borderRadius: '50%', backgroundColor: 'var(--primary-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <User size={18} />
                  </div>
                  <span className="user-name">{user.name.split(' ')[0]}</span>
                </Link>
                <button onClick={logout} style={{ background: 'none', color: 'var(--text-light)', cursor: 'pointer', border: 'none' }}><LogOut size={20} /></button>
              </div>
            ) : (
              <Link to="/login" className="btn btn-primary" style={{ padding: '10px 24px' }}>Entrar</Link>
            )}
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="mobile-toggle" style={{ display: 'none' }} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </div>
      </div>

      <style>{`
        .nav-link { position: relative; }
        .nav-link:after { content: ''; position: absolute; bottom: -5px; left: 0; width: 0; height: 2px; background: var(--primary); transition: var(--transition); }
        .nav-link:hover:after { width: 100%; }
        .nav-link:hover { color: var(--primary); }
        
        @media (max-width: 992px) {
          .desktop-menu { display: none !important; }
          .mobile-toggle { display: block !important; }
          .user-name { display: none; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
