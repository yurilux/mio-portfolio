import React from 'react';
// Importa Routes, Route, e NavLink per la navigazione attiva
import { Routes, Route, NavLink, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ExperiencePage from './pages/ExperiencePage';
import ProjectPage from './pages/ProjectPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import SkillsPage from './pages/SkillsPage';
import NotFoundPage from './pages/NotFoundPage';
import useTheme from './hooks/useTheme';
import styles from './App.module.css'; // Importa gli stili del modulo

function App() {
  const [theme, toggleTheme] = useTheme();

  const getNavLinkClass = ({ isActive }) => {
    return isActive ? `${styles.navLink} ${styles.navLinkActive}` : styles.navLink;
  };

  return (
    <div className={styles.appWrapper}>
      <header className={styles.header}>
        <div className={`container ${styles.nav}`}>
          <Link to="/" className={styles.logo}>[Tuo Nome]</Link>
          <div style={{ display: 'flex', alignItems: 'center' }}>
             <nav className={styles.navLinks}>
               {/* Usiamo NavLink per lo stile attivo */}
               <NavLink to="/" className={getNavLinkClass} end>Home</NavLink>
               <NavLink to="/chi-sono" className={getNavLinkClass}>Chi Sono</NavLink>
               <NavLink to="/competenze" className={getNavLinkClass}>Competenze</NavLink>
               <NavLink to="/contatti" className={getNavLinkClass}>Contatti</NavLink>
               {/* Aggiungi altri link se necessario */}
             </nav>
             <button onClick={toggleTheme} className={styles.themeToggle}>
               {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
             </button>
          </div>
        </div>
      </header>

      <main className={`${styles.mainContent} container`}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/esperienze/:id" element={<ExperiencePage />} />
          <Route path="/progetti/:id" element={<ProjectPage />} />
          <Route path="/chi-sono" element={<AboutPage />} />
          <Route path="/contatti" element={<ContactPage />} />
          <Route path="/competenze" element={<SkillsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      <footer className={styles.footer}>
        © {new Date().getFullYear()} [Tuo Nome]. Tutti i diritti riservati.
      </footer>
    </div>
  );
}

export default App;