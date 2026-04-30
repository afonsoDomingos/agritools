import { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import { Star, ShoppingCart, ArrowLeft, Truck, ShieldCheck, RefreshCcw, Loader2 } from 'lucide-react';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/_/backend/api/products/${id}`);
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, qty);
    navigate('/cart');
  };

  if (loading) return <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}><Loader2 className="animate-spin" size={50} /></div>;
  if (!product) return <div className="container text-center section-padding"><h2>Produto não encontrado</h2></div>;

  return (
    <div className="section-padding">
      <div className="container">
        <Link to="/shop" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '30px', color: 'var(--text-light)' }}>
          <ArrowLeft size={18} /> Voltar para a Loja
        </Link>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px' }} className="product-detail-layout">
          {/* Image Gallery */}
          <div>
            <div className="glass" style={{ borderRadius: '20px', overflow: 'hidden', height: '500px', marginBottom: '20px' }}>
              <img src={product.images[0]} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ display: 'flex', gap: '15px' }}>
              {product.images.map((img, i) => (
                <div key={i} style={{ width: '80px', height: '80px', borderRadius: '10px', overflow: 'hidden', border: i === 0 ? '2px solid var(--primary)' : 'none' }}>
                  <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <span style={{ color: 'var(--primary)', fontWeight: 600, fontSize: '0.9rem', textTransform: 'uppercase' }}>{product.category}</span>
            <h1 style={{ fontSize: '3rem', margin: '10px 0 20px' }}>{product.name}</h1>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px' }}>
              <div style={{ display: 'flex', gap: '5px' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill={i < Math.floor(product.rating) ? 'var(--accent)' : 'none'} color={i < Math.floor(product.rating) ? 'var(--accent)' : '#ddd'} />
                ))}
              </div>
              <span style={{ color: 'var(--text-light)' }}>{product.numReviews} avaliações</span>
              <span style={{ color: product.stock > 0 ? '#10b981' : '#ef4444', fontWeight: 600 }}>
                {product.stock > 0 ? 'Em Stock' : 'Esgotado'}
              </span>
            </div>

            <div style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--primary)', marginBottom: '30px' }}>
              {product.price.toLocaleString('pt-MZ', { style: 'currency', currency: 'MZN' })}
            </div>

            <p style={{ color: 'var(--text-light)', fontSize: '1.1rem', marginBottom: '40px', lineHeight: '1.8' }}>
              {product.description}
            </p>

            <div style={{ display: 'flex', gap: '20px', marginBottom: '40px' }}>
              <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#f0f0f0', borderRadius: '10px', padding: '5px' }}>
                <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ background: 'none', padding: '10px' }}>-</button>
                <span style={{ width: '50px', textAlign: 'center', fontWeight: 700, fontSize: '1.2rem' }}>{qty}</span>
                <button onClick={() => setQty(qty + 1)} style={{ background: 'none', padding: '10px' }}>+</button>
              </div>
              <button 
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="btn btn-primary" 
                style={{ flexGrow: 1, justifyContent: 'center', padding: '15px', borderRadius: '10px', fontSize: '1.1rem' }}
              >
                <ShoppingCart size={22} /> Adicionar ao Carrinho
              </button>
            </div>

            {/* Features Info */}
            <div className="glass" style={{ padding: '25px', borderRadius: '15px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <Truck size={24} color="var(--primary)" />
                <div>
                  <h4 style={{ fontSize: '0.9rem' }}>Entrega Rápida</h4>
                  <p style={{ fontSize: '0.8rem', color: '#888' }}>Em todo Moçambique</p>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <ShieldCheck size={24} color="var(--primary)" />
                <div>
                  <h4 style={{ fontSize: '0.9rem' }}>Garantia AgriTools</h4>
                  <p style={{ fontSize: '0.8rem', color: '#888' }}>Qualidade assegurada</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        @media (max-width: 992px) {
          .product-detail-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

export default ProductDetail;
