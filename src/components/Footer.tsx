import React from "react";
import { Heart, Code } from "lucide-react";
import { profile } from "../data/profile";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Code className="text-blue-400" size={20} aria-hidden="true" />
            <span className="text-xl font-bold">{profile.name}</span>
          </div>

          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            {profile.title} building scalable web and mobile experiences with
            React, Next.js, and TypeScript. Based in {profile.location}, working
            with teams across North America and Europe.
          </p>

          <div className="border-t border-gray-800 pt-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-gray-400">
                <span>Made with</span>
                <Heart className="text-red-500 fill-current" size={16} aria-label="love" />
                <span>using React & TypeScript</span>
              </div>

              <p className="text-gray-400">
                © {currentYear} {profile.name}. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
