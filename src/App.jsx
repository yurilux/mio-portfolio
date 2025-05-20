// src/App.jsx
import React, { useState, useEffect } from 'react'; // Importa useState e useEffect
// Importa Routes, Route, e NavLink per la navigazione attiva
import { Routes, Route, NavLink, Link, useLocation } from 'react-router-dom'; // Importa useLocation
import HomePage from './pages/HomePage';
import ExperiencePage from './pages/ExperiencePage';
import ProjectPage from './pages/ProjectPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import SkillsPage from './pages/SkillsPage';
import NotFoundPage from './pages/NotFoundPage';
import useTheme from './hooks/useTheme';
import styles from './App.module.css'; // Importa gli stili del modulo
import BionicConverterPage from './pages/BionicConverterPage'; // <--- AGGIUNTA QUESTA LINEA
import { motion, AnimatePresence } from 'framer-motion'; // Importa per animazioni menu

function App() {
  const [theme, toggleTheme] = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Stato per menu mobile
  const location = useLocation(); // Hook per ottenere la posizione corrente

  // Chiudi il menu mobile quando cambia la rotta (pagina)
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]); // L'effetto si attiva quando 'location' cambia

  // Funzione per lo stile dei NavLink attivi
  const getNavLinkClass = ({ isActive }) => {
    return isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink;
  };

  // Funzione per aprire/chiudere il menu mobile
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Animazione per il menu mobile
  const mobileMenuVariants = {
      hidden: { opacity: 0, height: 0, transition: { duration: 0.3, ease: "easeInOut" } },
      visible: { opacity: 1, height: 'auto', transition: { duration: 0.3, ease: "easeInOut" } }
  };


  return (
    <div className={styles.appWrapper}>
      <header className={styles.header}>
        <div className={`container ${styles.nav}`}>
          {/* Logo */}
          <Link to="/" className={styles.logo}>Iulian Bottale</Link>

           {/* Contenitore Elementi a Destra (visibili su desktop) */}
          <div className={styles.headerRightDesktop}>
              {/* Navigazione Desktop */}
              <nav className={styles.navLinks}>
                   <NavLink to="/" className={getNavLinkClass} end>Home</NavLink>
                   <NavLink to="/chi-sono" className={getNavLinkClass}>Chi Sono</NavLink>
                   <NavLink to="/competenze" className={getNavLinkClass}>Competenze</NavLink>
                   <NavLink to="/contatti" className={getNavLinkClass}>Contatti</NavLink>
              </nav>
              {/* Bottone Tema */}
              <button onClick={toggleTheme} className={styles.themeToggle}>
                   {theme === 'light' ? '🌙' : '☀️'}
              </button>
          </div>

          {/* Bottone Hamburger (visibile solo su mobile) */}
           <div className={styles.headerRightMobile}>
               {/* Bottone Tema (ripetuto per mobile, o lo sposti qui sempre) */}
               <button onClick={toggleTheme} className={styles.themeToggle}>
                   {theme === 'light' ? '🌙' : '☀️'}
               </button>
                <button onClick={toggleMobileMenu} className={styles.hamburgerButton} aria-label="Apri menu navigazione">
                    {/* Cambia icona in base allo stato del menu */}
                    {isMobileMenuOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg> // Icona X
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg> // Icona Hamburger
                    )}
                </button>
           </div>

        </div>

        {/* Menu Mobile (Animato con AnimatePresence) */}
        <AnimatePresence>
            {isMobileMenuOpen && (
                <motion.nav
                    key="mobileMenu" // Necessario per AnimatePresence
                    className={styles.mobileNav}
                    variants={mobileMenuVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                >
                    {/* Link del menu mobile - onClick chiude il menu */}
                    <NavLink to="/" className={getNavLinkClass} onClick={toggleMobileMenu} end>Home</NavLink>
                    <NavLink to="/chi-sono" className={getNavLinkClass} onClick={toggleMobileMenu}>Chi Sono</NavLink>
                    <NavLink to="/competenze" className={getNavLinkClass} onClick={toggleMobileMenu}>Competenze</NavLink>
                    <NavLink to="/contatti" className={getNavLinkClass} onClick={toggleMobileMenu}>Contatti</NavLink>
                </motion.nav>
            )}
        </AnimatePresence>

      </header>

      {/* Contenuto Principale con Rotte */}
      <main className={`${styles.mainContent} container`}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/esperienze/:id" element={<ExperiencePage />} />
          <Route path="/progetti/:id" element={<ProjectPage />} />
          <Route path="/chi-sono" element={<AboutPage />} />
          <Route path="/contatti" element={<ContactPage />} />
          <Route path="/competenze" element={<SkillsPage />} />
          <Route path="/bionic-converter" element={<BionicConverterPage />} /> {/* <--- AGGIUNTA QUESTA LINEA */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        © {new Date().getFullYear()} Iulian Bottale. Tutti i diritti riservati.
      </footer>
    </div>
  );
}

export default App;