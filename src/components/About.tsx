import React from "react";
import { Code, Heart, Lightbulb, Download } from "lucide-react";

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            About Me
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Frontend engineer focused on scalable interfaces, performance
            optimization, and reliable cross-platform product delivery.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <div className="flex justify-center lg:justify-start mb-8">
              <div className="relative">
                <img
                  src="./profile-photo.png"
                  alt="Wise Randriamialison - Frontend Engineer with 7+ years of experience in React, Next.js, and TypeScript"
                  className="w-48 h-48 rounded-full object-cover shadow-lg border-4 border-white"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500/20 to-transparent"></div>
              </div>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed">
              Frontend Engineer with 7+ years of experience building scalable
              web and mobile applications using React and Next.js. I specialize
              in user interface development, performance optimization, and
              cross-platform applications.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              I have worked with international remote teams and contributed to
              complex systems across logistics, mobility, and education. My
              recent roles include leading a multi-platform application serving
              more than 50,000 users and improving application performance,
              operational efficiency, and reliability.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              I am now transitioning toward full-stack and system-oriented roles
              through structured academic training while continuing to sharpen
              my frontend expertise. I value clear architecture, maintainable
              code, and practical collaboration across product and backend
              teams.
            </p>

            <div className="mt-8">
              <a
                href="./WiseRandriamialisonResume.pdf"
                download="WiseRandriamialisonResume.pdf"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg"
              >
                <Download size={20} />
                Download Resume
              </a>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                  <Code className="text-blue-600" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Technical Excellence
                </h3>
              </div>
              <p className="text-gray-600">
                Building performant, maintainable interfaces with strong
                attention to frontend architecture, usability, and delivery
                quality.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="bg-teal-100 p-3 rounded-lg mr-4">
                  <Heart className="text-teal-600" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Team Leadership
                </h3>
              </div>
              <p className="text-gray-600">
                Comfortable leading small teams, coordinating with backend
                engineers, and supporting delivery across distributed
                environments.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="bg-orange-100 p-3 rounded-lg mr-4">
                  <Lightbulb className="text-orange-600" size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Innovation Mindset
                </h3>
              </div>
              <p className="text-gray-600">
                Focused on practical improvements that increase adoption,
                strengthen performance, and make complex products easier to use.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
