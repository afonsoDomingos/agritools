import { Mail, Phone, MapPin } from 'lucide-react';

const FacebookIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
);

const InstagramIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);

const TwitterIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
);

const Footer = () => {
  return (
    <footer style={{ backgroundColor: 'var(--text-dark)', color: 'var(--white)', padding: '60px 0 20px' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px' }}>
          <div>
            <img src="/LOGO-AGRI.png" alt="AgriTools Logo" style={{ height: '60px', objectFit: 'contain', marginBottom: '20px', filter: 'brightness(0) invert(1)' }} />
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
              <a 
                href="#" 
                className="social-icon facebook" 
                style={{ 
                  width: '45px', 
                  height: '45px', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  color: 'white',
                  transition: 'all 0.3s ease',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}
              >
                <FacebookIcon />
              </a>
              <a 
                href="#" 
                className="social-icon instagram" 
                style={{ 
                  width: '45px', 
                  height: '45px', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  color: 'white',
                  transition: 'all 0.3s ease',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}
              >
                <InstagramIcon />
              </a>
              <a 
                href="#" 
                className="social-icon twitter" 
                style={{ 
                  width: '45px', 
                  height: '45px', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  color: 'white',
                  transition: 'all 0.3s ease',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}
              >
                <TwitterIcon />
              </a>
            </div>
          </div>
        </div>
        
        <style>{`
          .social-icon:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.2);
          }
          .social-icon.facebook:hover {
            background-color: #1877F2 !important;
            border-color: #1877F2 !important;
          }
          .social-icon.instagram:hover {
            background-color: #E4405F !important;
            border-color: #E4405F !important;
          }
          .social-icon.twitter:hover {
            background-color: #1DA1F2 !important;
            border-color: #1DA1F2 !important;
          }
        `}</style>
        
        <div style={{ marginTop: '60px', paddingTop: '20px', borderTop: '1px solid #333', textAlign: 'center', color: '#888', fontSize: '0.9rem' }}>
          <p>&copy; {new Date().getFullYear()} AgriTools. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
