import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: 'var(--text-dark)', color: 'var(--white)', padding: '60px 0 20px' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px' }}>
          <div>
            <h3 style={{ marginBottom: '20px', color: 'var(--primary-light)' }}>AgriTools🌱</h3>
            <p style={{ color: '#ccc' }}>
              Especialistas em serviços de consultoria agrícola & avícola. Fornecemos os melhores equipamentos para o seu agronegócio crescer com sustentabilidade.
            </p>
          </div>
          
          <div>
            <h4 style={{ marginBottom: '20px' }}>Links Rápidos</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li><a href="/shop">Loja</a></li>
              <li><a href="/services">Serviços</a></li>
              <li><a href="/about">Sobre Nós</a></li>
              <li><a href="/contact">Contacto</a></li>
            </ul>
          </div>
          
          <div>
            <h4 style={{ marginBottom: '20px' }}>Contacto</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Phone size={18} color="var(--accent)" />
                <span>+258 848 318 448</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Mail size={18} color="var(--accent)" />
                <span>info@agritools.co.mz</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <MapPin size={18} color="var(--accent)" />
                <span>Maputo, Moçambique</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 style={{ marginBottom: '20px' }}>Siga-nos</h4>
            <div style={{ display: 'flex', gap: '15px' }}>
              <a href="#" className="glass" style={{ padding: '10px', borderRadius: '50%', color: 'white' }}><Facebook size={20} /></a>
              <a href="#" className="glass" style={{ padding: '10px', borderRadius: '50%', color: 'white' }}><Instagram size={20} /></a>
              <a href="#" className="glass" style={{ padding: '10px', borderRadius: '50%', color: 'white' }}><Twitter size={20} /></a>
            </div>
          </div>
        </div>
        
        <div style={{ marginTop: '60px', paddingTop: '20px', borderTop: '1px solid #333', textAlign: 'center', color: '#888', fontSize: '0.9rem' }}>
          <p>&copy; {new Date().getFullYear()} AgriTools. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
