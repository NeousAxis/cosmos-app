import React from 'react';
import { Crown } from 'lucide-react';
import { motion } from 'framer-motion';

const PremiumButton = ({ onClick }) => {
    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            style={{
                background: 'linear-gradient(135deg, #C5A059 0%, #E6C87C 50%, #C5A059 100%)',
                color: '#fff',
                border: 'none',
                borderRadius: '20px',
                padding: '6px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontFamily: 'Playfair Display, serif',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(197, 160, 89, 0.3)',
                position: 'relative',
                overflow: 'hidden',
                letterSpacing: '0.5px'
            }}
        >
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                transform: 'skewX(-20deg)',
                animation: 'shine 3s infinite linear',
                pointerEvents: 'none'
            }} />
            <style>
                {`
          @keyframes shine {
            0% { transform: translateX(-150%) skewX(-20deg); }
            100% { transform: translateX(150%) skewX(-20deg); }
          }
        `}
            </style>
            <Crown size={14} fill="white" />
            <span>Premium</span>
        </motion.button>
    );
};

export default PremiumButton;
