import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Sprout, Truck, ChevronRight, Award, Zap } from 'lucide-react';
import heroBg from '../assets/hero-bg.png';
import axios from 'axios';
import { useState, useEffect } from 'react';

const Home = () => {
  const [specialties, setSpecialties] = useState([]);

  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        const { data } = await axios.get('/_/backend/api/specialties');
        setSpecialties(data);
      } catch (error) {
        console.error('Error fetching specialties:', error);
      }
    };
    fetchSpecialties();
  }, []);

  const features = [
    { icon: <Sprout size={32} />, title: 'Qualidade Superior', desc: 'Sementes e equipamentos certificados pelos melhores fabricantes mundiais.', color: '#10b981' },
    { icon: <Award size={32} />, title: 'Consultoria Técnica', desc: 'Acompanhamento especializado para maximizar a sua produtividade no campo.', color: '#f59e0b' },
    { icon: <Zap size={32} />, title: 'Inovação Tecnológica', desc: 'As ferramentas mais modernas para automatizar o seu agronegócio.', color: '#3b82f6' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section style={{
        minHeight: '92vh',
        background: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.4)), url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        display: 'flex',
        alignItems: 'center',
        color: 'white',
        position: 'relative'
      }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '50px', alignItems: 'center' }}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <span style={{ 
                backgroundColor: 'var(--primary)', 
                padding: '8px 20px', 
                borderRadius: '50px', 
                fontSize: '0.8rem', 
                fontWeight: 800, 
                textTransform: 'uppercase',
                letterSpacing: '2px',
                marginBottom: '20px',
                display: 'inline-block'
              }}>Líder em Moçambique</span>
              
              <h1 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', lineHeight: '1', fontWeight: 800, marginBottom: '25px' }}>
                Cultive o Futuro <br/>
                <span className="text-gradient" style={{ filter: 'brightness(1.5)' }}>com Inteligência.</span>
              </h1>
              
              <p style={{ fontSize: '1.25rem', marginBottom: '45px', opacity: '0.9', maxWidth: '600px', lineHeight: '1.6' }}>
                Soluções integradas de consultoria, equipamentos e insumos para transformar o seu agronegócio em potência produtiva.
              </p>
              
              <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <Link to="/shop" className="btn btn-primary" style={{ padding: '18px 40px', fontSize: '1.1rem' }}>
                  Explorar Loja <ArrowRight size={20} />
                </Link>
                <Link to="/services" className="btn glass" style={{ color: 'white', padding: '18px 40px', fontSize: '1.1rem' }}>
                  Nossos Serviços
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Decorative Wave */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', overflow: 'hidden', lineHeight: 0 }}>
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ position: 'relative', display: 'block', width: 'calc(100% + 1.3px)', height: '100px', fill: 'var(--bg-light)' }}>
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
          </svg>
        </div>
      </section>

      {/* Specialties */}
      <section className="section-padding">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '60px', flexWrap: 'wrap', gap: '20px' }}>
            <div style={{ maxWidth: '600px' }}>
              <h4 style={{ color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.9rem', marginBottom: '15px' }}>Categorias em Destaque</h4>
              <h2 style={{ fontSize: '3rem' }}>O que fazemos de <span className="text-gradient">Melhor</span></h2>
            </div>
            <Link to="/shop" style={{ color: 'var(--primary)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '5px' }}>
              Ver todo catálogo <ChevronRight size={20} />
            </Link>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px' }}>
            {specialties.map((cat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -15 }}
                style={{
                  height: '500px',
                  borderRadius: '30px',
                  overflow: 'hidden',
                  position: 'relative',
                  boxShadow: 'var(--shadow-lg)'
                }}
              >
                <img src={cat.image} alt={cat.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.8s ease' }} className="cat-img" />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.9))',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '40px',
                  color: 'white'
                }}>
                  <h3 style={{ fontSize: '2rem', marginBottom: '15px' }}>{cat.name}</h3>
                  <Link to={cat.path} className="btn" style={{ 
                    backgroundColor: 'rgba(255,255,255,0.1)', 
                    backdropFilter: 'blur(10px)',
                    color: 'white',
                    width: 'fit-content'
                  }}>
                    Explorar Agora <ChevronRight size={18} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why AgriTools */}
      <section style={{ backgroundColor: 'white', padding: '120px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 80px' }}>
            <h2 style={{ fontSize: '3rem', marginBottom: '20px' }}>Porquê Escolher a <span className="text-gradient">AgriTools?</span></h2>
            <p style={{ color: 'var(--text-light)', fontSize: '1.1rem' }}>Comprometidos com o sucesso do produtor moçambicano através da qualidade e suporte contínuo.</p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
            {features.map((f, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.05 }}
                className="glass"
                style={{ 
                  padding: '50px 40px', 
                  borderRadius: '30px', 
                  textAlign: 'center',
                  border: 'none',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.03)'
                }}
              >
                <div style={{ 
                  width: '80px', 
                  height: '80px', 
                  borderRadius: '24px', 
                  backgroundColor: `${f.color}15`, 
                  color: f.color, 
                  margin: '0 auto 30px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}>
                  {f.icon}
                </div>
                <h4 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>{f.title}</h4>
                <p style={{ color: 'var(--text-light)', lineHeight: '1.7' }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding" style={{ position: 'relative', overflow: 'hidden' }}>
        <div className="container">
          <div className="glass" style={{ 
            background: 'linear-gradient(135deg, var(--text-dark), #1e293b)', 
            color: 'white', 
            borderRadius: '50px', 
            padding: '100px 60px',
            position: 'relative',
            overflow: 'hidden',
            textAlign: 'center'
          }}>
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h2 style={{ fontSize: '3.5rem', marginBottom: '20px' }}>Pronto para <span style={{ color: 'var(--primary)' }}>Crescer?</span></h2>
              <p style={{ fontSize: '1.25rem', marginBottom: '45px', opacity: 0.8, maxWidth: '700px', margin: '0 auto 45px' }}>
                Junte-se a milhares de produtores que já transformaram os seus campos com as nossas soluções.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
                <Link to="/register" className="btn btn-primary" style={{ padding: '20px 50px', fontSize: '1.1rem' }}>Começar Agora</Link>
                <a href="https://wa.me/258848318448" className="btn glass" style={{ color: 'white', padding: '20px 50px', fontSize: '1.1rem' }}>Consultoria Grátis</a>
              </div>
            </div>
            
            {/* Abstract Background Shapes */}
            <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '400px', height: '400px', borderRadius: '50%', background: 'var(--primary)', opacity: 0.1, filter: 'blur(80px)' }}></div>
            <div style={{ position: 'absolute', bottom: '-100px', left: '-100px', width: '400px', height: '400px', borderRadius: '50%', background: 'var(--accent)', opacity: 0.1, filter: 'blur(80px)' }}></div>
          </div>
        </div>
      </section>

      <style>{`
        .cat-img:hover { transform: scale(1.1); }
      `}</style>
    </div>
  );
};

export default Home;
