import React, { useState } from 'react';
import Contact from '../../Component/Shared/Contact';
import HeroSection from '../../Component/Shared/HeroSection';
import Advertisment from '../../Component/Shared/Advertisment';
import About from '../../Component/Shared/About';
import Service from '../../Component/Shared/Services';
import Footer from '../../Component/Shared/Footer';

const Home = () => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  };
  return (
    <div>
       <HeroSection/>
       <Advertisment/>
       <About/>
       <Service/>
      <Contact/>
      <Footer/>
    </div>
  )
}


export default Home
