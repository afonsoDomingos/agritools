import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const WhatsAppFloat = () => {
  return (
    <motion.a
      href="https://wa.me/258848318448"
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        backgroundColor: '#25D366',
        color: 'white',
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        boxShadow: '0 10px 25px rgba(37, 211, 102, 0.3)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer'
      }}
    >
      <MessageCircle size={32} />
      <span style={{
        position: 'absolute',
        right: '70px',
        backgroundColor: 'white',
        color: '#333',
        padding: '8px 15px',
        borderRadius: '10px',
        boxShadow: 'var(--shadow)',
        fontSize: '0.9rem',
        fontWeight: 600,
        whiteSpace: 'nowrap',
        pointerEvents: 'none',
        opacity: 0,
        transition: 'opacity 0.3s'
      }} className="whatsapp-tooltip">
        Falar com Especialista
      </span>
      <style>{`
        a:hover .whatsapp-tooltip { opacity: 1 !important; }
      `}</style>
    </motion.a>
  );
};

export default WhatsAppFloat;
