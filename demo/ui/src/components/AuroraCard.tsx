import { ReactNode } from 'react';
import { motion } from 'framer-motion';

type AuroraCardProps = {
  children: ReactNode;
  className?: string;
};

const AuroraCard = ({ children, className = '' }: AuroraCardProps) => {
  return (
    <motion.div
      className={`aurora-card p-6 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="aurora-glow"></div>
      {children}
    </motion.div>
  );
};

export default AuroraCard;
