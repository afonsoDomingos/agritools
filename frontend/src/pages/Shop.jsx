import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { Search, Filter, Loader2 } from 'lucide-react';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/_/backend/api/products?keyword=${keyword}&category=${category}`);
      setProducts(data.products);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [category]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchProducts();
  };

  const categories = ['Sementes', 'Fertilizantes', 'Ferramentas', 'Máquinas', 'Avicultura'];

  return (
    <div className="section-padding">
      <div className="container">
        <div style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <h1 style={{ fontSize: '2.5rem' }}>Nossa Loja</h1>
          
          <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px', width: '100%', maxWidth: '400px' }}>
            <div style={{ position: 'relative', flexGrow: 1 }}>
              <input 
                type="text" 
                placeholder="Buscar produtos..." 
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 15px 12px 40px',
                  borderRadius: '30px',
                  border: '1px solid #ddd',
                  outline: 'none'
                }}
              />
              <Search size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: '#888' }} />
            </div>
            <button type="submit" className="btn btn-primary" style={{ borderRadius: '30px' }}>Buscar</button>
          </form>
        </div>

        <div style={{ display: 'flex', gap: '40px', flexDirection: 'row' }} className="shop-layout">
          {/* Sidebar Filters */}
          <aside style={{ width: '250px', flexShrink: 0 }}>
            <div className="glass" style={{ padding: '25px', borderRadius: '15px' }}>
              <h3 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Filter size={20} /> Categorias
              </h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <li>
                  <button 
                    onClick={() => setCategory('')}
                    style={{ 
                      background: 'none', 
                      color: category === '' ? 'var(--primary)' : 'var(--text-light)',
                      fontWeight: category === '' ? 700 : 400
                    }}
                  >
                    Todos os Produtos
                  </button>
                </li>
                {categories.map(cat => (
                  <li key={cat}>
                    <button 
                      onClick={() => setCategory(cat)}
                      style={{ 
                        background: 'none', 
                        color: category === cat ? 'var(--primary)' : 'var(--text-light)',
                        fontWeight: category === cat ? 700 : 400
                      }}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Product Grid */}
          <div style={{ flexGrow: 1 }}>
            {loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '300px' }}>
                <Loader2 className="animate-spin" size={40} color="var(--primary)" />
              </div>
            ) : products.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '30px' }}>
                {products.map(product => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center" style={{ padding: '50px' }}>
                <h3>Nenhum produto encontrado.</h3>
                <p>Tente ajustar seus filtros ou busca.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin { animation: spin 1s linear infinite; }
        
        @media (max-width: 992px) {
          .shop-layout { flex-direction: column !important; }
          aside { width: 100% !important; }
          aside ul { flex-direction: row !important; flex-wrap: wrap; gap: 20px !important; }
        }
      `}</style>
    </div>
  );
};

export default Shop;
