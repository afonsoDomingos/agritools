import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Plus, Edit, Trash, Package, ShoppingBag, Users, BarChart, X, Loader2 } from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: 'Sementes',
    stock: '',
    images: ['']
  });

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('/_/backend/api/products');
      setProducts(data.products);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        await axios.delete(`/_/backend/api/products/${id}`, config);
        fetchProducts();
      } catch (error) {
        alert('Erro ao excluir produto');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      if (editingProduct) {
        await axios.put(`/_/backend/api/products/${editingProduct._id}`, formData, config);
      } else {
        await axios.post('/_/backend/api/products', formData, config);
      }
      setShowModal(false);
      setEditingProduct(null);
      setFormData({ name: '', price: '', description: '', category: 'Sementes', stock: '', images: [''] });
      fetchProducts();
    } catch (error) {
      alert('Erro ao salvar produto');
    }
  };

  const openModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        price: product.price,
        description: product.description,
        category: product.category,
        stock: product.stock,
        images: product.images
      });
    } else {
      setEditingProduct(null);
      setFormData({ name: '', price: '', description: '', category: 'Sementes', stock: '', images: [''] });
    }
    setShowModal(true);
  };

  return (
    <div className="section-padding">
      <div className="container">
        <div style={{ display: 'flex', gap: '40px' }} className="admin-layout">
          {/* Sidebar */}
          <aside style={{ width: '280px', flexShrink: 0 }}>
            <div className="glass" style={{ padding: '30px', borderRadius: '20px' }}>
              <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'var(--primary)', margin: '0 auto 15px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                  <Users size={40} />
                </div>
                <h3 style={{ fontSize: '1.2rem' }}>{user.name}</h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 700 }}>ADMINISTRADOR</span>
              </div>
              
              <nav style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button onClick={() => setActiveTab('products')} style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', borderRadius: '10px', background: activeTab === 'products' ? 'var(--primary)' : 'transparent', color: activeTab === 'products' ? 'white' : 'var(--text-dark)', textAlign: 'left', fontWeight: 600 }}>
                  <Package size={20} /> Produtos
                </button>
                <button onClick={() => setActiveTab('orders')} style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', borderRadius: '10px', background: activeTab === 'orders' ? 'var(--primary)' : 'transparent', color: activeTab === 'orders' ? 'white' : 'var(--text-dark)', textAlign: 'left', fontWeight: 600 }}>
                  <ShoppingBag size={20} /> Pedidos
                </button>
                <button onClick={() => setActiveTab('reports')} style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', borderRadius: '10px', background: activeTab === 'reports' ? 'var(--primary)' : 'transparent', color: activeTab === 'reports' ? 'white' : 'var(--text-dark)', textAlign: 'left', fontWeight: 600 }}>
                  <BarChart size={20} /> Relatórios
                </button>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main style={{ flexGrow: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
              <h2 style={{ fontSize: '2rem', textTransform: 'capitalize' }}>{activeTab}</h2>
              {activeTab === 'products' && (
                <button onClick={() => openModal()} className="btn btn-primary">
                  <Plus size={20} /> Novo Produto
                </button>
              )}
            </div>

            {loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}><Loader2 className="animate-spin" size={40} /></div>
            ) : activeTab === 'products' ? (
              <div className="glass" style={{ borderRadius: '20px', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead style={{ backgroundColor: '#f8f9fa' }}>
                    <tr>
                      <th style={{ padding: '15px', textAlign: 'left' }}>Imagem</th>
                      <th style={{ padding: '15px', textAlign: 'left' }}>Nome</th>
                      <th style={{ padding: '15px', textAlign: 'left' }}>Preço</th>
                      <th style={{ padding: '15px', textAlign: 'left' }}>Categoria</th>
                      <th style={{ padding: '15px', textAlign: 'left' }}>Stock</th>
                      <th style={{ padding: '15px', textAlign: 'center' }}>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(p => (
                      <tr key={p._id} style={{ borderTop: '1px solid #eee' }}>
                        <td style={{ padding: '15px' }}><img src={p.images[0]} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '8px' }} /></td>
                        <td style={{ padding: '15px', fontWeight: 600 }}>{p.name}</td>
                        <td style={{ padding: '15px' }}>{p.price.toLocaleString('pt-MZ')} MT</td>
                        <td style={{ padding: '15px' }}><span style={{ padding: '5px 12px', borderRadius: '20px', backgroundColor: '#eef2ff', color: 'var(--primary)', fontSize: '0.8rem' }}>{p.category}</span></td>
                        <td style={{ padding: '15px' }}>{p.stock}</td>
                        <td style={{ padding: '15px', textAlign: 'center' }}>
                          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                            <button onClick={() => openModal(p)} style={{ color: 'var(--primary)', background: 'none' }}><Edit size={18} /></button>
                            <button onClick={() => handleDelete(p._id)} style={{ color: '#ef4444', background: 'none' }}><Trash size={18} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="glass" style={{ padding: '50px', textAlign: 'center', borderRadius: '20px' }}>
                <h3>Módulo em desenvolvimento</h3>
                <p>O controle de pedidos e relatórios estará disponível em breve.</p>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div className="glass" style={{ width: '100%', maxWidth: '600px', backgroundColor: 'white', borderRadius: '20px', padding: '40px', position: 'relative', maxHeight: '90vh', overflowY: 'auto' }}>
            <button onClick={() => setShowModal(false)} style={{ position: 'absolute', top: '20px', right: '20px', background: 'none' }}><X size={24} /></button>
            <h2 style={{ marginBottom: '30px' }}>{editingProduct ? 'Editar Produto' : 'Adicionar Novo Produto'}</h2>
            
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Nome</label>
                  <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #ddd' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Preço (MT)</label>
                  <input type="number" required value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #ddd' }} />
                </div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Categoria</label>
                  <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #ddd' }}>
                    <option>Sementes</option>
                    <option>Fertilizantes</option>
                    <option>Ferramentas</option>
                    <option>Máquinas</option>
                    <option>Avicultura</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Stock</label>
                  <input type="number" required value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #ddd' }} />
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Descrição</label>
                <textarea rows="4" required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #ddd', fontFamily: 'inherit' }}></textarea>
              </div>

              <div style={{ marginBottom: '30px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>URL da Imagem</label>
                <input type="text" required value={formData.images[0]} onChange={e => setFormData({...formData, images: [e.target.value]})} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #ddd' }} />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '15px' }}>Salvar Alterações</button>
            </form>
          </div>
        </div>
      )}
      
      <style>{`
        @media (max-width: 992px) {
          .admin-layout { flex-direction: column !important; }
          aside { width: 100% !important; }
        }
        th { font-family: 'Outfit', sans-serif; text-transform: uppercase; font-size: 0.8rem; color: #888; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin { animation: spin 1s linear infinite; }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
