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
      title: "Lead Frontend Engineer",
      company: "COMIN",
      location: "France",
      period: "2024 - 2025",
      current: false,
      achievements: [
        "Achieved a 40% reduction in server downtime by implementing automated monitoring solutions and proactive maintenance plans",
        "Led a team of 5 engineers in developing a multi-platform application used by 50,000+ users",
        "Optimized database queries, enhancing application speed by reducing response times by 35%",
        "Improved system efficiency by 30%, leading to a $10,000 annual savings in operational costs",
      ],
    },
    {
      title: "Frontend Engineer",
      company: "Marlow Navigation",
      location: "Cyprus",
      period: "2022 - 2024",
      current: false,
      achievements: [
        "Increased task management efficiency by 10% by developing an offline-capable internal app for seafarers",
        "Streamlined bidding process for seafarers, eliminating 90% of manual wire submissions via a new mobile app feature",
        "Implemented a proactive notification system to alert seafarers of required pre-departure documentation, streamlining the embarkation process",
      ],
    },
    {
      title: "Frontend Engineer",
      company: "FLYDESK",
      location: "Hong Kong",
      period: "2021 - 2022",
      current: false,
      achievements: [
        "Collaborated with remote development teams to successfully launch and maintain FlyDesk for international markets, including major clients like DFS, Native Union, and MTR (HK)",
        "Engineered the migration of the database and API to a microservice architecture, leading to a 35% reduction in FlyDesk service response times",
      ],
    },
    {
      title: "Frontend Engineer",
      company: "Opcadia",
      location: "France",
      period: "2020 - 2021",
      current: false,
      achievements: [
        "Built a Next.js online platform enabling students to discover and book classes, resulting in a 40% increase in enrollment and a 5% boost in revenue within the first six months",
        "Spearheaded the development of a complex Next.js e-commerce platform, managing a team of 7 engineers to deliver the project on schedule (6 months)",
        "Leveraged Next.js SEO to optimize website content, meta tags, and site structure, resulting in increased organic traffic",
      ],
    },
    {
      title: "Frontend Engineer",
      company: "Santosha Consulting",
      location: "Madagascar",
      period: "2018 - 2020",
      current: false,
      achievements: [
        "Collaborated with a startup team, leveraging my skills in both React and Angular to deliver high-quality frontend solutions for more than 4 projects",
      ],
    },
    {
      title: "Software Engineer",
      company: "ETech Consulting",
      location: "Madagascar",
      period: "2017 - 2018",
      current: false,
      achievements: [
        "Leveraged my skills in Symfony, WordPress, and PHP to provide frontend development support for a startup team, contributing to the successful completion of 4+ projects",
        "Reduced page load times by 80% by engineering key single-page application features using React and Angular, resulting in higher conversion rates by 20%",
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
            7+ years of building exceptional web applications and leading
            development teams across the globe.
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
                  )
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
