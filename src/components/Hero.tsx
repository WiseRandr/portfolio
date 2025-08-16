import React from 'react';
import { ArrowDown, Github, Mail, MapPin } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="min-h-screen bg-gradient-primary flex items-center justify-center relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full mix-blend-multiply filter blur-xl"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl"></div>
        <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-teal-300 rounded-full mix-blend-multiply filter blur-xl"></div>
      </div>

      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="animate-fade-in-up">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-shadow">
            Hi, I'm <span className="text-yellow-300">Wise Randriamialison</span>
          </h1>
          
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-light mb-8 text-blue-100 animate-fade-in-up animation-delay-200">
            Senior Frontend Engineer
          </h2>
          
          <p className="text-lg sm:text-xl text-blue-50 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-400">
            Crafting exceptional user experiences with React, TypeScript, and modern web technologies. 
            7+ years of building scalable applications that users love.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-12 animate-fade-in-up animation-delay-400">
            <div className="flex items-center gap-2 text-blue-100">
              <MapPin size={20} />
              <span>Antananarivo, Madagascar</span>
            </div>
            <div className="flex items-center gap-2 text-blue-100">
              <Mail size={20} />
              <span>randriamialison.wise@gmail.com</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-16 animate-fade-in-up animation-delay-400">
            <button
              onClick={() => scrollToSection('contact')}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Get In Touch
            </button>
            <a
              href="https://github.io/wiserandr"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
            >
              <Github size={20} />
              View My Work
            </a>
          </div>
        </div>
        
        <button
          onClick={() => scrollToSection('about')}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white hover:text-yellow-300 transition-colors duration-300 animate-bounce"
        >
          <ArrowDown size={32} />
        </button>
      </div>
    </section>
  );
};

export default Hero;