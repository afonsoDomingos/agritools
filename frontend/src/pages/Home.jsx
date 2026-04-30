import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Sprout, Truck, MessageSquare } from 'lucide-react';
import heroBg from '../assets/hero-bg.png';
import seedsImg from '../assets/seeds.png';
import poultryImg from '../assets/poultry.png';
import consultancyImg from '../assets/consultancy.png';
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
    { icon: <Sprout size={40} />, title: 'Qualidade Superior', desc: 'Produtos certificados para garantir a melhor colheita.' },
    { icon: <ShieldCheck size={40} />, title: 'Compra Segura', desc: 'Pagamentos protegidos e garantia de entrega em todo o país.' },
    { icon: <Truck size={40} />, title: 'Logística Eficiente', desc: 'Entregamos no seu campo ou empresa com rapidez.' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section style={{
        height: '90vh',
        background: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        color: 'white'
      }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ maxWidth: '700px' }}
          >
            <h1 style={{ fontSize: '4rem', lineHeight: '1.1', marginBottom: '20px' }}>Inovação e Tecnologia para o seu Agronegócio</h1>
            <p style={{ fontSize: '1.2rem', marginBottom: '40px', opacity: '0.9' }}>
              Desde consultoria especializada até os melhores equipamentos agrícolas e avícolas em Moçambique.
            </p>
            <div style={{ display: 'flex', gap: '20px' }}>
              <Link to="/shop" className="btn btn-primary" style={{ padding: '15px 35px', fontSize: '1.1rem' }}>Ver Produtos <ArrowRight size={20} /></Link>
              <a href="https://wa.me/258848318448" target="_blank" className="btn glass" style={{ color: 'white', padding: '15px 35px' }}>Falar com Especialista</a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="section-padding">
        <div className="container">
          <div className="text-center" style={{ marginBottom: '60px' }}>
            <h2 style={{ fontSize: '2.5rem', color: 'var(--primary)' }}>Nossas Especialidades</h2>
            <p style={{ color: 'var(--text-light)' }}>Soluções completas para agricultores e produtores avícolas.</p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {specialties.map((cat, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -10 }}
                style={{
                  height: '400px',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  position: 'relative',
                  boxShadow: 'var(--shadow)'
                }}
              >
                <img src={cat.image} alt={cat.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '30px',
                  color: 'white'
                }}>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>{cat.name}</h3>
                  <Link to={cat.path} style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--accent)', fontWeight: '600' }}>
                    Explorar <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section style={{ backgroundColor: '#fff', padding: '100px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px' }}>
            {features.map((f, i) => (
              <div key={i} className="text-center">
                <div style={{ color: 'var(--primary)', marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>{f.icon}</div>
                <h4 style={{ fontSize: '1.3rem', marginBottom: '15px' }}>{f.title}</h4>
                <p style={{ color: 'var(--text-light)' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding" style={{ backgroundColor: 'var(--primary)', color: 'white', position: 'relative', overflow: 'hidden' }}>
        <div className="container text-center" style={{ position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontSize: '3rem', marginBottom: '20px' }}>Pronto para crescer?</h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '40px', opacity: 0.9 }}>Junte-se a milhares de produtores que confiam na AgriTools.</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
            <Link to="/register" className="btn btn-secondary" style={{ padding: '15px 40px' }}>Criar Conta</Link>
            <a href="mailto:info@agritools.co.mz" className="btn glass" style={{ color: 'white', padding: '15px 40px' }}>Enviar Email</a>
          </div>
        </div>
        <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }}></div>
      </section>
    </div>
  );
};

export default Home;
