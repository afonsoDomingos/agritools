import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { User, Package, MapPin, LogOut, Loader2, Calendar } from 'lucide-react';

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        const { data } = await axios.get('/_/backend/api/orders/myorders', config);
        setOrders(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    if (user) fetchOrders();
  }, [user]);

  if (!user) return <div className="section-padding text-center"><h2>Faça login para ver seu perfil</h2></div>;

  return (
    <div className="section-padding">
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '40px' }} className="profile-layout">
          {/* Sidebar */}
          <aside>
            <div className="glass" style={{ padding: '30px', borderRadius: '20px', textAlign: 'center' }}>
              <div style={{ width: '100px', height: '100px', borderRadius: '50%', backgroundColor: 'var(--primary)', margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '2.5rem', fontWeight: 700 }}>
                {user.name.charAt(0)}
              </div>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '5px' }}>{user.name}</h2>
              <p style={{ color: 'var(--text-light)', marginBottom: '30px' }}>{user.email}</p>
              
              <button 
                onClick={logout}
                style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', justifyContent: 'center', color: '#ef4444', fontWeight: 600, background: 'none' }}
              >
                <LogOut size={20} /> Sair da Conta
              </button>
            </div>
          </aside>

          {/* Main */}
          <main>
            <div className="glass" style={{ padding: '30px', borderRadius: '20px' }}>
              <h2 style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '30px' }}>
                <Package size={28} /> Histórico de Pedidos
              </h2>

              {loading ? (
                <div style={{ display: 'flex', justifyContent: 'center', padding: '50px' }}><Loader2 className="animate-spin" /></div>
              ) : orders.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '50px' }}>
                  <p>Você ainda não realizou nenhum pedido.</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {orders.map(order => (
                    <div key={order._id} style={{ border: '1px solid #eee', borderRadius: '15px', padding: '20px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px', flexWrap: 'wrap', gap: '10px' }}>
                        <div>
                          <p style={{ fontSize: '0.8rem', color: '#888' }}>ID: {order._id}</p>
                          <p style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.9rem', fontWeight: 600 }}>
                            <Calendar size={14} /> {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div style={{ padding: '5px 15px', borderRadius: '20px', backgroundColor: '#eef2ff', color: 'var(--primary)', fontWeight: 600, fontSize: '0.8rem' }}>
                          {order.status.toUpperCase()}
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div style={{ marginBottom: '25px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '0.8rem', fontWeight: 600 }}>
                          <span style={{ color: order.status === 'pending' ? 'var(--primary)' : '#ccc' }}>Pendente</span>
                          <span style={{ color: order.status === 'paid' ? 'var(--primary)' : '#ccc' }}>Pago</span>
                          <span style={{ color: order.status === 'shipped' ? 'var(--primary)' : '#ccc' }}>Enviado</span>
                          <span style={{ color: order.status === 'delivered' ? 'var(--primary)' : '#ccc' }}>Entregue</span>
                        </div>
                        <div style={{ height: '8px', backgroundColor: '#f0f0f0', borderRadius: '4px', position: 'relative' }}>
                          <div style={{ 
                            position: 'absolute', 
                            left: 0, 
                            top: 0, 
                            height: '100%', 
                            backgroundColor: 'var(--primary)', 
                            borderRadius: '4px',
                            transition: 'width 0.5s ease',
                            width: order.status === 'pending' ? '12.5%' : 
                                   order.status === 'paid' ? '37.5%' : 
                                   order.status === 'shipped' ? '62.5%' : 
                                   order.status === 'delivered' ? '100%' : '0%'
                          }}></div>
                        </div>
                      </div>
                      
                      <div style={{ display: 'flex', gap: '10px', marginBottom: '15px', overflowX: 'auto', paddingBottom: '10px' }}>
                        {order.orderItems.map((item, i) => (
                          <img key={i} src={item.image} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '5px' }} title={item.name} />
                        ))}
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '15px', borderTop: '1px solid #f5f5f5' }}>
                        <span style={{ fontWeight: 700 }}>{order.totalPrice.toLocaleString('pt-MZ')} MT</span>
                        <span style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>{order.orderItems.length} itens</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
      
      <style>{`
        @media (max-width: 768px) {
          .profile-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

export default Profile;
