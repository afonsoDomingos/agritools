import { Link } from 'react-router-dom';
import { ShoppingCart, Star, ArrowRight } from 'lucide-react';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ y: -10 }}
      style={{
        backgroundColor: 'white',
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
        transition: 'var(--transition)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        position: 'relative'
      }} 
      className="product-card"
    >
      <Link to={`/product/${product._id}`} style={{ height: '280px', overflow: 'hidden', display: 'block', position: 'relative' }}>
        <img 
          src={product.images && product.images[0] ? product.images[0] : 'https://via.placeholder.com/400x300?text=AgriTools'} 
          alt={product.name} 
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)' }}
          className="product-image"
        />
        <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
          <span style={{ 
            backgroundColor: 'rgba(255,255,255,0.9)', 
            padding: '5px 15px', 
            borderRadius: '50px', 
            fontSize: '0.75rem', 
            fontWeight: 800,
            color: 'var(--text-dark)',
            backdropFilter: 'blur(5px)'
          }}>
            {product.category}
          </span>
        </div>
      </Link>
      
      <div style={{ padding: '25px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Link to={`/product/${product._id}`}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '12px', height: '1.4em', overflow: 'hidden', color: 'var(--text-dark)' }}>{product.name}</h3>
        </Link>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '20px' }}>
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={14} fill={i < Math.floor(product.rating) ? 'var(--accent)' : 'none'} color={i < Math.floor(product.rating) ? 'var(--accent)' : '#ddd'} />
          ))}
          <span style={{ fontSize: '0.85rem', color: 'var(--text-light)', marginLeft: '5px' }}>({product.numReviews})</span>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
          <div>
            <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-light)', fontWeight: 500, marginBottom: '2px' }}>Preço Unitário</span>
            <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary-dark)' }}>
              {product.price.toLocaleString('pt-MZ')} MT
            </span>
          </div>
          
          <button 
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
            }}
            className="btn-primary"
            style={{
              width: '45px',
              height: '45px',
              borderRadius: '15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
      
      <style>{`
        .product-card:hover .product-image { transform: scale(1.1); }
      `}</style>
    </motion.div>
  );
};

export default ProductCard;
