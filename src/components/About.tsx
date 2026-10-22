import React from "react";
import { Code, Heart, Lightbulb, Download } from "lucide-react";
import { profile } from "../data/profile";

const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            About Me
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Senior frontend engineer focused on scalable interfaces,
            performance, and reliable cross-platform product delivery.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <div className="flex justify-center lg:justify-start mb-8">
              <div className="relative">
                <img
                  src="./profile-photo.webp"
                  alt={`Portrait of ${profile.name}`}
                  width={192}
                  height={192}
                  loading="lazy"
                  decoding="async"
                  className="w-48 h-48 rounded-full object-cover shadow-lg border-4 border-white"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500/20 to-transparent"></div>
              </div>
            </div>

            <p className="text-lg text-gray-700 leading-relaxed">
              I'm a {profile.title.toLowerCase()} with{" "}
              {profile.yearsOfExperience} years of experience building web and
              mobile applications with React, React Native, and Next.js. I care
              most about frontend architecture, performance, and shipping
              products that hold up in production.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              I've worked with remote product teams in France, Cyprus, and Hong
              Kong. Most recently I led a team of five engineers delivering a
              multi-platform application used by more than 50,000 people, and
              built an offline-capable mobile app for seafarers.
            </p>

            <p className="text-lg text-gray-700 leading-relaxed">
              My work doesn't stop at the UI: I led the migration of a legacy
              PHP platform to Next.js and work closely with backend teams on
              APIs and data. Now based in Toronto, I'm studying Computer
              Programming at Humber College to deepen my backend and systems
              skills.
            </p>

            <div className="mt-8">
              <a
                href={profile.resumePath}
                download="WiseRandriamialisonResume.pdf"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg"
              >
                <Download size={20} aria-hidden="true" />
                Download Resume
              </a>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                  <Code className="text-blue-600" size={24} aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Frontend Architecture
                </h3>
              </div>
              <p className="text-gray-600">
                Building performant, maintainable interfaces with strong
                attention to structure, usability, and delivery quality.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="bg-teal-100 p-3 rounded-lg mr-4">
                  <Heart className="text-teal-600" size={24} aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Team Leadership
                </h3>
              </div>
              <p className="text-gray-600">
                Leading small teams, coordinating with backend engineers, and
                keeping delivery on track across distributed time zones.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="bg-orange-100 p-3 rounded-lg mr-4">
                  <Lightbulb
                    className="text-orange-600"
                    size={24}
                    aria-hidden="true"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Product Impact
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
