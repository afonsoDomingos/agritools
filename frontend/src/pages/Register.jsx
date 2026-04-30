import { useState, useContext, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Mail, Lock, User, Loader2 } from 'lucide-react';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [msg, setMsg] = useState(null);
  
  const { register, loading, error, user } = useContext(AuthContext);
  
  const navigate = useNavigate();
  const location = useLocation();
  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (user) {
      navigate(redirect);
    }
  }, [user, navigate, redirect]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMsg('As palavras-passe não coincidem');
      return;
    }
    try {
      await register(name, email, password);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
      <div className="glass" style={{ width: '100%', maxWidth: '450px', padding: '40px', borderRadius: '20px', boxShadow: 'var(--shadow)' }}>
        <div className="text-center" style={{ marginBottom: '40px' }}>
          <h1 style={{ fontSize: '2rem', color: 'var(--primary)', marginBottom: '10px' }}>Criar Conta</h1>
          <p style={{ color: 'var(--text-light)' }}>Junte-se à comunidade AgriTools</p>
        </div>

        {(error || msg) && (
          <div style={{ backgroundColor: '#fee2e2', color: '#dc2626', padding: '12px', borderRadius: '8px', marginBottom: '20px', textAlign: 'center', fontSize: '0.9rem' }}>
            {error || msg}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Nome Completo</label>
            <div style={{ position: 'relative' }}>
              <input 
                type="text" 
                placeholder="Seu nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                style={{ width: '100%', padding: '12px 15px 12px 40px', borderRadius: '10px', border: '1px solid #ddd', outline: 'none' }}
              />
              <User size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#888' }} />
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Email</label>
            <div style={{ position: 'relative' }}>
              <input 
                type="email" 
                placeholder="exemplo@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{ width: '100%', padding: '12px 15px 12px 40px', borderRadius: '10px', border: '1px solid #ddd', outline: 'none' }}
              />
              <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#888' }} />
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Palavra-passe</label>
            <div style={{ position: 'relative' }}>
              <input 
                type="password" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ width: '100%', padding: '12px 15px 12px 40px', borderRadius: '10px', border: '1px solid #ddd', outline: 'none' }}
              />
              <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#888' }} />
            </div>
          </div>

          <div style={{ marginBottom: '30px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600 }}>Confirmar Palavra-passe</label>
            <div style={{ position: 'relative' }}>
              <input 
                type="password" 
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                style={{ width: '100%', padding: '12px 15px 12px 40px', borderRadius: '10px', border: '1px solid #ddd', outline: 'none' }}
              />
              <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#888' }} />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="btn btn-primary" 
            style={{ width: '100%', justifyContent: 'center', padding: '14px', borderRadius: '10px', fontSize: '1rem' }}
          >
            {loading ? <Loader2 className="animate-spin" /> : 'Criar Conta'}
          </button>
        </form>

        <div className="text-center" style={{ marginTop: '30px' }}>
          <p style={{ color: 'var(--text-light)' }}>
            Já tem uma conta? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 700 }}>Entre aqui</Link>
          </p>
        </div>
      </div>
      
      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin { animation: spin 1s linear infinite; }
      `}</style>
    </div>
  );
};

export default Register;
