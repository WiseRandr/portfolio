import React from 'react';
import { Heart, Code } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Code className="text-blue-400" size={20} />
            <span className="text-xl font-bold">Wise Randriamialison</span>
          </div>
          
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Passionate Frontend Engineer crafting exceptional user experiences with modern web technologies. 
            Based in Antananarivo, Madagascar, working with teams worldwide.
          </p>
          
          <div className="border-t border-gray-800 pt-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-gray-400">
                <span>Made with</span>
                <Heart className="text-red-500 fill-current" size={16} />
                <span>using React & TypeScript</span>
              </div>
              
              <p className="text-gray-400">
                © {currentYear} Wise Randriamialison. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;