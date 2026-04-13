import React from "react";
import { Building, Calendar, MapPin } from "lucide-react";

interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  period: string;
  current: boolean;
  achievements: string[];
}

const Experience: React.FC = () => {
  const experiences: ExperienceItem[] = [
    {
      title: "Lead Frontend Engineer (Part-time)",
      company: "Comin & Incom",
      location: "France",
      period: "2024 - Present",
      current: true,
      achievements: [
        "Led a team of 5 engineers to deliver a multi-platform application used by over 50,000 users",
        "Improved application performance by optimizing frontend architecture and data handling",
        "Collaborated with backend teams to support application improvements and enhance overall system reliability",
        "Integrated Google Maps Navigation SDK to improve route accuracy and user experience",
      ],
    },
    {
      title: "Frontend Engineer (Contract)",
      company: "Marlow Navigation",
      location: "Cyprus",
      period: "2022 - Present",
      current: true,
      achievements: [
        "Developed an offline-capable mobile application improving operational efficiency for seafarers",
        "Built features to streamline workflows and reduce manual processes",
        "Integrated frontend features with existing backend services, focusing on user interface behavior and data presentation",
      ],
    },
    {
      title: "Frontend Engineer",
      company: "FLYDESK",
      location: "Hong Kong",
      period: "2021 - 2022",
      current: false,
      achievements: [
        "Collaborated with distributed teams to deliver and maintain applications for international clients",
        "Worked with existing backend APIs to integrate frontend features and ensure smooth data flow within the application",
      ],
    },
    {
      title: "Frontend Engineer",
      company: "Opcadia",
      location: "France",
      period: "2020 - 2021",
      current: false,
      achievements: [
        "Built a Next.js platform that increased student enrollment by 40%",
        "Led frontend development for an e-commerce platform delivered within 6 months",
        "Optimized SEO and frontend performance to improve traffic and engagement",
      ],
    },
    {
      title: "Frontend Engineer",
      company: "Santosha Consulting",
      location: "Madagascar",
      period: "2018 - 2020",
      current: false,
      achievements: [
        "Delivered multiple frontend projects using React and Angular",
        "Collaborated with teams to implement scalable UI solutions",
      ],
    },
    {
      title: "Software Engineer",
      company: "ETech Consulting",
      location: "Madagascar",
      period: "2017 - 2018",
      current: false,
      achievements: [
        "Developed frontend features using React and Angular",
        "Contributed to web applications built with Symfony and WordPress",
        "Improved application performance and reduced load times significantly",
      ],
    },
  ];

  return (
    <section id="experience" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Professional Experience
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience across remote product teams, cross-platform frontend
            delivery, and performance-focused application development.
          </p>
        </div>

        <div className="space-y-8">
          {experiences.map((experience, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-6 sm:p-8 hover:shadow-lg transition-all duration-300 border-l-4 border-blue-500"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                <div className="mb-4 lg:mb-0">
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                    {experience.title}
                  </h3>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-gray-600">
                    <div className="flex items-center gap-2">
                      <Building size={18} />
                      <span className="font-medium">{experience.company}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={18} />
                      <span>{experience.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={18} />
                      <span>{experience.period}</span>
                      {experience.current && (
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                          Current
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {experience.achievements.map(
                  (achievement, achievementIndex) => (
                    <div
                      key={achievementIndex}
                      className="flex items-start gap-3"
                    >
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700 leading-relaxed">
                        {achievement}
                      </p>
                    </div>
                  ),
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
