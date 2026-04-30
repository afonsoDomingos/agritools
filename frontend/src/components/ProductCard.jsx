import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '15px',
      overflow: 'hidden',
      boxShadow: 'var(--shadow)',
      transition: 'var(--transition)',
      display: 'flex',
      flexDirection: 'column'
    }} className="product-card">
      <Link to={`/product/${product._id}`} style={{ height: '250px', overflow: 'hidden', display: 'block' }}>
        <img 
          src={product.images && product.images[0] ? product.images[0] : 'https://via.placeholder.com/400x300?text=AgriTools'} 
          alt={product.name} 
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
          onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'}
          onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
        />
      </Link>
      
      <div style={{ padding: '20px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <span style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '5px' }}>
          {product.category}
        </span>
        <Link to={`/product/${product._id}`}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '10px', height: '1.4em', overflow: 'hidden' }}>{product.name}</h3>
        </Link>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '15px' }}>
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={14} fill={i < Math.floor(product.rating) ? 'var(--accent)' : 'none'} color={i < Math.floor(product.rating) ? 'var(--accent)' : '#ddd'} />
          ))}
          <span style={{ fontSize: '0.85rem', color: '#888' }}>({product.numReviews})</span>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
          <span style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-dark)' }}>
            {product.price.toLocaleString('pt-MZ', { style: 'currency', currency: 'MZN' })}
          </span>
          <button 
            onClick={() => addToCart(product)}
            style={{
              backgroundColor: 'var(--primary)',
              color: 'white',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
