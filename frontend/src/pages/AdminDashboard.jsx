import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Plus, Edit, Trash, Package, ShoppingBag, Users, BarChart, X, Loader2, Star, TrendingUp } from 'lucide-react';
import { BarChart as ReBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  
  const { user } = useContext(AuthContext);

  const [productData, setProductData] = useState({
    name: '', price: '', description: '', category: 'Sementes', stock: '', images: ['']
  });

  const [specialtyData, setSpecialtyData] = useState({
    name: '', image: '', path: '/shop'
  });

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'products') {
        const { data } = await axios.get('/_/backend/api/products');
        setProducts(data.products);
      } else if (activeTab === 'specialties') {
        const { data } = await axios.get('/_/backend/api/specialties');
        setSpecialties(data);
      } else if (activeTab === 'orders') {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const { data } = await axios.get('/_/backend/api/orders', config);
        setOrders(data);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const handleDelete = async (id) => {
    if (window.confirm(`Tem certeza que deseja excluir este ${activeTab === 'products' ? 'produto' : 'especialidade'}?`)) {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const endpoint = activeTab === 'products' ? `/api/products/${id}` : `/api/specialties/${id}`;
        await axios.delete(`/_/backend${endpoint}`, config);
        fetchData();
      } catch (error) {
        alert('Erro ao excluir item');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const isProduct = activeTab === 'products';
      const endpoint = isProduct ? '/api/products' : '/api/specialties';
      const data = isProduct ? productData : specialtyData;

      if (editingItem) {
        await axios.put(`/_/backend${endpoint}/${editingItem._id}`, data, config);
      } else {
        await axios.post(`/_/backend${endpoint}`, data, config);
      }
      
      setShowModal(false);
      setEditingItem(null);
      resetForms();
      fetchData();
    } catch (error) {
      alert('Erro ao salvar item');
    }
  };

  const resetForms = () => {
    setProductData({ name: '', price: '', description: '', category: 'Sementes', stock: '', images: [''] });
    setSpecialtyData({ name: '', image: '', path: '/shop' });
  };

  const openModal = (item = null) => {
    if (item) {
      setEditingItem(item);
      if (activeTab === 'products') {
        setProductData({
          name: item.name, price: item.price, description: item.description,
          category: item.category, stock: item.stock, images: item.images
        });
      } else {
        setSpecialtyData({
          name: item.name, image: item.image, path: item.path
        });
      }
    } else {
      setEditingItem(null);
      resetForms();
    }
    setShowModal(true);
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.put(`/_/backend/api/orders/${orderId}/status`, { status }, config);
      fetchData();
    } catch (error) {
      alert('Erro ao atualizar status do pedido');
    }
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
                <button onClick={() => setActiveTab('specialties')} style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', borderRadius: '10px', background: activeTab === 'specialties' ? 'var(--primary)' : 'transparent', color: activeTab === 'specialties' ? 'white' : 'var(--text-dark)', textAlign: 'left', fontWeight: 600 }}>
                  <Star size={20} /> Especialidades
                </button>
                <button onClick={() => setActiveTab('orders')} style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', borderRadius: '10px', background: activeTab === 'orders' ? 'var(--primary)' : 'transparent', color: activeTab === 'orders' ? 'white' : 'var(--text-dark)', textAlign: 'left', fontWeight: 600 }}>
                  <ShoppingBag size={20} /> Pedidos
                </button>
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main style={{ flexGrow: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
              <h2 style={{ fontSize: '2rem', textTransform: 'capitalize' }}>{activeTab === 'specialties' ? 'Nossas Especialidades' : activeTab}</h2>
              {(activeTab === 'products' || activeTab === 'specialties') && (
                <button onClick={() => openModal()} className="btn btn-primary">
                  <Plus size={20} /> Novo {activeTab === 'products' ? 'Produto' : 'Especialidade'}
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
            ) : activeTab === 'specialties' ? (
              <div className="glass" style={{ borderRadius: '20px', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead style={{ backgroundColor: '#f8f9fa' }}>
                    <tr>
                      <th style={{ padding: '15px', textAlign: 'left' }}>Imagem</th>
                      <th style={{ padding: '15px', textAlign: 'left' }}>Nome</th>
                      <th style={{ padding: '15px', textAlign: 'left' }}>Link</th>
                      <th style={{ padding: '15px', textAlign: 'center' }}>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {specialties.map(s => (
                      <tr key={s._id} style={{ borderTop: '1px solid #eee' }}>
                        <td style={{ padding: '15px' }}><img src={s.image} style={{ width: '80px', height: '50px', objectFit: 'cover', borderRadius: '8px' }} /></td>
                        <td style={{ padding: '15px', fontWeight: 600 }}>{s.name}</td>
                        <td style={{ padding: '15px', color: '#666' }}>{s.path}</td>
                        <td style={{ padding: '15px', textAlign: 'center' }}>
                          <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                            <button onClick={() => openModal(s)} style={{ color: 'var(--primary)', background: 'none' }}><Edit size={18} /></button>
                            <button onClick={() => handleDelete(s._id)} style={{ color: '#ef4444', background: 'none' }}><Trash size={18} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : activeTab === 'orders' ? (
              <div className="glass" style={{ borderRadius: '20px', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead style={{ backgroundColor: '#f8f9fa' }}>
                    <tr>
                      <th style={{ padding: '15px', textAlign: 'left' }}>Data</th>
                      <th style={{ padding: '15px', textAlign: 'left' }}>Cliente</th>
                      <th style={{ padding: '15px', textAlign: 'left' }}>Total</th>
                      <th style={{ padding: '15px', textAlign: 'left' }}>Status</th>
                      <th style={{ padding: '15px', textAlign: 'center' }}>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(o => (
                      <tr key={o._id} style={{ borderTop: '1px solid #eee' }}>
                        <td style={{ padding: '15px' }}>{new Date(o.createdAt).toLocaleDateString()}</td>
                        <td style={{ padding: '15px', fontWeight: 600 }}>{o.user?.name || 'Cliente'}</td>
                        <td style={{ padding: '15px' }}>{o.totalPrice.toLocaleString()} MT</td>
                        <td style={{ padding: '15px' }}>
                          <select 
                            value={o.status} 
                            onChange={(e) => updateOrderStatus(o._id, e.target.value)}
                            style={{ padding: '5px 10px', borderRadius: '10px', border: '1px solid #ddd', fontSize: '0.8rem' }}
                          >
                            <option value="pending">Pendente</option>
                            <option value="paid">Pago</option>
                            <option value="shipped">Enviado</option>
                            <option value="delivered">Entregue</option>
                          </select>
                        </td>
                        <td style={{ padding: '15px', textAlign: 'center' }}>
                          <button onClick={() => alert('Ver detalhes em desenvolvimento')} style={{ color: 'var(--primary)', background: 'none', fontWeight: 600 }}>Ver Itens</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : activeTab === 'reports' ? (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                {/* Sales Chart */}
                <div className="glass" style={{ padding: '30px', borderRadius: '20px', height: '400px' }}>
                  <h3 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <TrendingUp size={20} color="var(--primary)" /> Vendas por Dia
                  </h3>
                  <ResponsiveContainer width="100%" height="90%">
                    <LineChart data={orders.map(o => ({ date: new Date(o.createdAt).toLocaleDateString(), total: o.totalPrice }))}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="total" stroke="var(--primary)" strokeWidth={3} dot={{ r: 6 }} activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Category Distribution */}
                <div className="glass" style={{ padding: '30px', borderRadius: '20px', height: '400px' }}>
                  <h3 style={{ marginBottom: '20px' }}>Distribuição de Produtos</h3>
                  <ResponsiveContainer width="100%" height="90%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Sementes', value: products.filter(p => p.category === 'Sementes').length },
                          { name: 'Máquinas', value: products.filter(p => p.category === 'Máquinas').length },
                          { name: 'Ferramentas', value: products.filter(p => p.category === 'Ferramentas').length },
                          { name: 'Avicultura', value: products.filter(p => p.category === 'Avicultura').length },
                        ]}
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        <Cell fill="#10b981" />
                        <Cell fill="#3b82f6" />
                        <Cell fill="#f59e0b" />
                        <Cell fill="#ef4444" />
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Users Growth (Mocked) */}
                <div className="glass" style={{ padding: '30px', borderRadius: '20px', height: '400px', gridColumn: 'span 2' }}>
                  <h3 style={{ marginBottom: '20px' }}>Crescimento de Utilizadores</h3>
                  <ResponsiveContainer width="100%" height="90%">
                    <ReBarChart data={[
                      { name: 'Jan', users: 12 }, { name: 'Fev', users: 19 }, { name: 'Mar', users: 32 }, { name: 'Abr', users: 45 }
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="users" fill="var(--accent)" radius={[5, 5, 0, 0]} />
                    </ReBarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            ) : (
              <div className="glass" style={{ padding: '50px', textAlign: 'center', borderRadius: '20px' }}>
                <h3>Nenhum dado selecionado</h3>
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
            <h2 style={{ marginBottom: '30px' }}>{editingItem ? 'Editar' : 'Adicionar Novo'} {activeTab === 'products' ? 'Produto' : 'Especialidade'}</h2>
            
            <form onSubmit={handleSubmit}>
              {activeTab === 'products' ? (
                <>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Nome</label>
                      <input type="text" required value={productData.name} onChange={e => setProductData({...productData, name: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #ddd' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Preço (MT)</label>
                      <input type="number" required value={productData.price} onChange={e => setProductData({...productData, price: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #ddd' }} />
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Categoria</label>
                      <select value={productData.category} onChange={e => setProductData({...productData, category: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #ddd' }}>
                        <option>Sementes</option><option>Fertilizantes</option><option>Ferramentas</option><option>Máquinas</option><option>Avicultura</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Stock</label>
                      <input type="number" required value={productData.stock} onChange={e => setProductData({...productData, stock: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #ddd' }} />
                    </div>
                  </div>
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Descrição</label>
                    <textarea rows="4" required value={productData.description} onChange={e => setProductData({...productData, description: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #ddd', fontFamily: 'inherit' }}></textarea>
                  </div>
                  <div style={{ marginBottom: '30px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>URL da Imagem</label>
                    <input type="text" required value={productData.images[0]} onChange={e => setProductData({...productData, images: [e.target.value]})} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #ddd' }} />
                  </div>
                </>
              ) : (
                <>
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Nome da Especialidade</label>
                    <input type="text" required value={specialtyData.name} onChange={e => setSpecialtyData({...specialtyData, name: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #ddd' }} />
                  </div>
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>URL da Imagem</label>
                    <input type="text" required value={specialtyData.image} onChange={e => setSpecialtyData({...specialtyData, image: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #ddd' }} />
                  </div>
                  <div style={{ marginBottom: '30px' }}>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Link de Redirecionamento</label>
                    <input type="text" required value={specialtyData.path} onChange={e => setSpecialtyData({...specialtyData, path: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #ddd' }} />
                  </div>
                </>
              )}
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
