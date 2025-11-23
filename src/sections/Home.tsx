import { useState, useEffect } from 'react';
import Courses from '../utils/mockData';
import Header from '../components/Header';
import HeroSection from '../components/Hero';
import CourseGrid from '../components/course/Grid';
import FeaturesSection from '../components/Features';
import Footer from '../components/Footer';
// import TypeBotSection from './TypeBot';

interface HomeProps {
  onUserInfoClick?: () => void;
}

export default function Home({ onUserInfoClick }: HomeProps) {
  const [darkMode, setDarkMode] = useState(false);

  // Load dark mode preference
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode) {
      setDarkMode(JSON.parse(savedMode));
    }
  }, []);

  // Save dark mode preference
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);



  return (
    <div className={`min-h-screen transition-colors duration-10000 ${
      darkMode ? 'bg-slate-900' : 'bg-[#F8FAFC]'
    }`}>
      {/* <TypeBotSection /> */}
      <Header darkMode={darkMode} setDarkMode={setDarkMode} onUserClick={onUserInfoClick} />
      <HeroSection darkMode={darkMode} />
      <CourseGrid courses={Courses} darkMode={darkMode} />
      <FeaturesSection darkMode={darkMode} />
      <Footer darkMode={darkMode} />
    </div>
  );
}