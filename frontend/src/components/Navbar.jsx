import { Link } from 'react-router-dom';
import { ShoppingCart, User, Menu, X, LogOut, LayoutDashboard } from 'lucide-react';
import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const { totalItems } = useContext(CartContext);

  return (
    <nav className="glass sticky top-0 z-50">
      <div className="container py-4 flex justify-between items-center" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" className="flex items-center gap-2">
          <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--primary)' }}>AgriTools🌱</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <Link to="/" className="hover:text-primary">Home</Link>
          <Link to="/shop" className="hover:text-primary">Loja</Link>
          <Link to="/cart" className="relative">
            <ShoppingCart size={24} />
            {totalItems > 0 && (
              <span style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                background: 'var(--secondary)',
                color: 'white',
                borderRadius: '50%',
                width: '18px',
                height: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '10px'
              }}>{totalItems}</span>
            )}
          </Link>
          
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              {user.role === 'admin' && (
                <Link to="/admin" title="Dashboard">
                  <LayoutDashboard size={20} />
                </Link>
              )}
              <Link to="/profile"><User size={24} /></Link>
              <button onClick={logout} style={{ background: 'none', color: 'var(--secondary)' }}><LogOut size={24} /></button>
            </div>
          ) : (
            <Link to="/login" className="btn btn-primary" style={{ padding: '8px 16px' }}>Entrar</Link>
          )}
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden" style={{ display: 'none' }} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </div>
      </div>
      
      {/* Inline styles for quick layouting in React without Tailwind if not requested, but I'll use class names from index.css */}
      <style>{`
        @media (max-width: 768px) {
          .md\\:flex { display: none !important; }
          .md\\:hidden { display: block !important; }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
