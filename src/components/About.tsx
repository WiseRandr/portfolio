import React from 'react';
import { Code, Heart, Lightbulb } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            About Me
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Passionate frontend engineer with a proven track record of delivering 
            high-quality solutions and leading development teams.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              I'm an experienced Frontend Engineer with over 7 years of expertise in crafting 
              high-quality user experiences and scalable web applications. Currently serving as 
              Lead Frontend Engineer at COMIN, I specialize in React, TypeScript, and modern web technologies.
            </p>
            
            <p className="text-lg text-gray-700 leading-relaxed">
              Throughout my career, I've had the privilege of working with international teams, 
              leading projects that achieved significant improvements in performance and user engagement. 
              I'm passionate about writing clean, maintainable code and mentoring fellow developers.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              When I'm not coding, I enjoy exploring new technologies, contributing to open-source projects, 
              and sharing knowledge with the developer community. I believe in continuous learning and 
              staying up-to-date with the latest industry trends.
            </p>
          </div>

          <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                  <Code className="text-blue-600" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Technical Excellence</h3>
              </div>
              <p className="text-gray-600">
                Committed to writing clean, efficient code with a focus on performance, 
                accessibility, and maintainability.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="bg-teal-100 p-3 rounded-lg mr-4">
                  <Heart className="text-teal-600" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Team Leadership</h3>
              </div>
              <p className="text-gray-600">
                Experienced in leading development teams, mentoring junior developers, 
                and fostering collaborative work environments.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="bg-orange-100 p-3 rounded-lg mr-4">
                  <Lightbulb className="text-orange-600" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Innovation Mindset</h3>
              </div>
              <p className="text-gray-600">
                Always seeking new approaches to solve complex problems and improve 
                user experiences through innovative solutions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;