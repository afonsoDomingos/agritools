import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { Trash2, Plus, Minus, ArrowLeft, ShoppingBag } from 'lucide-react';

const Cart = () => {
  const { cartItems, removeFromCart, updateQty, totalPrice, totalItems } = useContext(CartContext);

  return (
    <div className="section-padding">
      <div className="container">
        <h1 style={{ fontSize: '2.5rem', marginBottom: '40px' }}>Seu Carrinho</h1>

        {cartItems.length === 0 ? (
          <div className="text-center" style={{ padding: '80px 0' }}>
            <div style={{ color: '#ddd', marginBottom: '20px' }}><ShoppingBag size={80} /></div>
            <h2>Seu carrinho está vazio</h2>
            <p style={{ color: 'var(--text-light)', marginBottom: '30px' }}>Parece que você ainda não adicionou nenhum produto.</p>
            <Link to="/shop" className="btn btn-primary">Começar a Comprar</Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '40px' }} className="cart-layout">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {cartItems.map((item) => (
                <div key={item._id} className="glass" style={{ display: 'flex', padding: '20px', borderRadius: '15px', gap: '20px', alignItems: 'center' }}>
                  <img src={item.images[0]} alt={item.name} style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '10px' }} />
                  
                  <div style={{ flexGrow: 1 }}>
                    <Link to={`/product/${item._id}`}>
                      <h3 style={{ fontSize: '1.1rem', marginBottom: '5px' }}>{item.name}</h3>
                    </Link>
                    <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>{item.category}</p>
                    <p style={{ fontWeight: 700, marginTop: '10px' }}>{item.price.toLocaleString('pt-MZ', { style: 'currency', currency: 'MZN' })}</p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#f0f0f0', borderRadius: '30px', padding: '5px' }}>
                    <button 
                      onClick={() => updateQty(item._id, Math.max(1, item.qty - 1))}
                      style={{ background: 'none', padding: '5px' }}
                    >
                      <Minus size={16} />
                    </button>
                    <span style={{ width: '40px', textAlign: 'center', fontWeight: 600 }}>{item.qty}</span>
                    <button 
                      onClick={() => updateQty(item._id, item.qty + 1)}
                      style={{ background: 'none', padding: '5px' }}
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <button 
                    onClick={() => removeFromCart(item._id)}
                    style={{ background: 'none', color: '#ef4444' }}
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
              
              <Link to="/shop" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--primary)', fontWeight: 600, marginTop: '20px' }}>
                <ArrowLeft size={20} /> Continuar Comprando
              </Link>
            </div>

            <aside>
              <div className="glass" style={{ padding: '30px', borderRadius: '20px', position: 'sticky', top: '100px' }}>
                <h3 style={{ marginBottom: '25px', borderBottom: '1px solid #eee', paddingBottom: '15px' }}>Resumo do Pedido</h3>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                  <span>Subtotal ({totalItems} itens)</span>
                  <span style={{ fontWeight: 600 }}>{totalPrice.toLocaleString('pt-MZ', { style: 'currency', currency: 'MZN' })}</span>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                  <span>Portes de Envio</span>
                  <span style={{ color: 'var(--primary-light)', fontWeight: 600 }}>Grátis</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px', paddingTop: '20px', borderTop: '2px solid var(--primary)', marginBottom: '30px' }}>
                  <span style={{ fontSize: '1.2rem', fontWeight: 700 }}>Total</span>
                  <span style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--primary)' }}>
                    {totalPrice.toLocaleString('pt-MZ', { style: 'currency', currency: 'MZN' })}
                  </span>
                </div>

                <Link to="/checkout" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '15px', borderRadius: '10px', fontSize: '1.1rem' }}>
                  Finalizar Compra
                </Link>
                
                <div style={{ marginTop: '20px', textAlign: 'center' }}>
                  <p style={{ fontSize: '0.8rem', color: '#888' }}>Pagamento via M-Pesa, E-Mola ou Transferência Bancária.</p>
                </div>
              </div>
            </aside>
          </div>
        )}
      </div>
      
      <style>{`
        @media (max-width: 992px) {
          .cart-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

export default Cart;
