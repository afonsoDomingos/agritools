import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { MapPin, CreditCard, MessageSquare, CheckCircle, Loader2 } from 'lucide-react';

const Checkout = () => {
  const { cartItems, totalPrice, clearCart } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const navigate = useNavigate();

  const [shippingData, setShippingData] = useState({
    address: '',
    city: 'Maputo',
    postalCode: '',
    country: 'Moçambique'
  });

  const [paymentMethod, setPaymentMethod] = useState('WhatsApp');

  useEffect(() => {
    if (!user) navigate('/login?redirect=checkout');
    if (cartItems.length === 0 && !orderComplete) navigate('/shop');
  }, [user, cartItems, navigate, orderComplete]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const orderData = {
      orderItems: cartItems.map(item => ({
        name: item.name,
        qty: item.qty,
        image: item.images[0],
        price: item.price,
        product: item._id
      })),
      shippingAddress: shippingData,
      paymentMethod: paymentMethod,
      itemsPrice: totalPrice,
      shippingPrice: 0,
      taxPrice: 0,
      totalPrice: totalPrice
    };

    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.post('/_/backend/api/orders', orderData, config);
      
      if (paymentMethod === 'WhatsApp') {
        const message = `Olá AgriTools! Fiz um novo pedido:\n\nItens:\n${cartItems.map(i => `- ${i.name} (${i.qty}x)`).join('\n')}\n\nTotal: ${totalPrice} MT\n\nEndereco: ${shippingData.address}, ${shippingData.city}`;
        window.open(`https://wa.me/258848318448?text=${encodeURIComponent(message)}`, '_blank');
      }
      
      setOrderComplete(true);
      clearCart();
      setLoading(false);
    } catch (error) {
      alert('Erro ao processar pedido');
      setLoading(false);
    }
  };

  if (orderComplete) {
    return (
      <div className="section-padding text-center">
        <div className="container">
          <div className="glass" style={{ maxWidth: '600px', margin: '0 auto', padding: '60px', borderRadius: '20px' }}>
            <CheckCircle size={80} color="#10b981" style={{ marginBottom: '20px' }} />
            <h1 style={{ marginBottom: '20px' }}>Pedido Confirmado!</h1>
            <p style={{ color: 'var(--text-light)', marginBottom: '30px' }}>
              Obrigado pela sua compra na AgriTools. Entraremos em contacto em breve para confirmar o pagamento e entrega.
            </p>
            <button onClick={() => navigate('/')} className="btn btn-primary">Voltar ao Início</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="section-padding">
      <div className="container">
        <h1 style={{ fontSize: '2.5rem', marginBottom: '40px' }}>Finalizar Pedido</h1>
        
        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '40px' }} className="checkout-layout">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            {/* Shipping */}
            <div className="glass" style={{ padding: '30px', borderRadius: '20px' }}>
              <h3 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}><MapPin size={22} /> Endereço de Entrega</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Morada Completa</label>
                  <input type="text" required value={shippingData.address} onChange={e => setShippingData({...shippingData, address: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #ddd' }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Cidade</label>
                    <input type="text" required value={shippingData.city} onChange={e => setShippingData({...shippingData, city: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #ddd' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Província</label>
                    <input type="text" required value={shippingData.postalCode} onChange={e => setShippingData({...shippingData, postalCode: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #ddd' }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="glass" style={{ padding: '30px', borderRadius: '20px' }}>
              <h3 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}><CreditCard size={22} /> Método de Pagamento</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', border: '1px solid #ddd', borderRadius: '10px', cursor: 'pointer' }}>
                  <input type="radio" name="payment" value="WhatsApp" checked={paymentMethod === 'WhatsApp'} onChange={e => setPaymentMethod(e.target.value)} />
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <MessageSquare size={20} color="#25D366" />
                    <div>
                      <h4 style={{ fontSize: '1rem' }}>Confirmar via WhatsApp</h4>
                      <p style={{ fontSize: '0.8rem', color: '#888' }}>Envie o seu pedido diretamente para o nosso WhatsApp</p>
                    </div>
                  </div>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '15px', border: '1px solid #ddd', borderRadius: '10px', cursor: 'pointer' }}>
                  <input type="radio" name="payment" value="Transferência" checked={paymentMethod === 'Transferência'} onChange={e => setPaymentMethod(e.target.value)} />
                  <div>
                    <h4 style={{ fontSize: '1rem' }}>Transferência Bancária / M-Pesa</h4>
                    <p style={{ fontSize: '0.8rem', color: '#888' }}>Pagamento via conta bancária ou carteira móvel</p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <aside>
            <div className="glass" style={{ padding: '30px', borderRadius: '20px', position: 'sticky', top: '100px' }}>
              <h3 style={{ marginBottom: '25px', borderBottom: '1px solid #eee', paddingBottom: '15px' }}>Resumo da Compra</h3>
              
              <div style={{ maxHeight: '300px', overflowY: 'auto', marginBottom: '20px' }}>
                {cartItems.map(item => (
                  <div key={item._id} style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
                    <img src={item.images[0]} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '5px' }} />
                    <div style={{ flexGrow: 1 }}>
                      <h4 style={{ fontSize: '0.9rem', fontWeight: 600 }}>{item.name}</h4>
                      <p style={{ fontSize: '0.8rem', color: '#888' }}>{item.qty} x {item.price.toLocaleString('pt-MZ')} MT</p>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', paddingTop: '20px', borderTop: '2px solid var(--primary)', marginBottom: '30px' }}>
                <span style={{ fontSize: '1.2rem', fontWeight: 700 }}>Total</span>
                <span style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--primary)' }}>{totalPrice.toLocaleString('pt-MZ')} MT</span>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="btn btn-primary" 
                style={{ width: '100%', justifyContent: 'center', padding: '15px', borderRadius: '10px', fontSize: '1.1rem' }}
              >
                {loading ? <Loader2 className="animate-spin" /> : 'Confirmar Pedido'}
              </button>
            </div>
          </aside>
        </form>
      </div>
      
      <style>{`
        @media (max-width: 992px) {
          .checkout-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

export default Checkout;
