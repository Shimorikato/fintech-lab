import { ReactNode } from 'react';
import ThemeToggle from './ThemeToggle';
import { motion } from 'framer-motion';
import { Link } from 'react-router';

type LayoutProps = {
  children: ReactNode;
  title: string;
  backLink?: string;
};

const Layout = ({ children, title, backLink }: LayoutProps) => {
  return (
    <div className="min-h-screen dark:bg-gray-900 bg-gray-50 transition-colors duration-300">
      <div className="aurora-glow"></div>
      <header className="py-4 px-6 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          {backLink && (
            <Link to={backLink}>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </motion.button>
            </Link>
          )}
          <h1 className="text-xl font-semibold dark:text-white text-gray-800">{title}</h1>
        </div>
        <ThemeToggle />
      </header>
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
};

export default Layout;
