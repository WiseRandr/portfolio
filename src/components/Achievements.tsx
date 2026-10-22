import React from "react";
import { Award, Code, Users, WifiOff } from "lucide-react";

interface Achievement {
  icon: React.ReactNode;
  title: string;
  description: string;
  impact: string;
  color: string;
}

const Achievements: React.FC = () => {
  const achievements: Achievement[] = [
    {
      icon: <Users size={32} aria-hidden="true" />,
      title: "Led a Team of 5 on a Multi-Platform App",
      description:
        "At COMIN, led five engineers delivering a web and mobile application used by more than 50,000 users, including a Google Maps Navigation SDK integration for more accurate routing.",
      impact: "50,000+ users",
      color: "blue",
    },
    {
      icon: <Code size={32} aria-hidden="true" />,
      title: "Migrated a Legacy PHP Platform to Next.js",
      description:
        "At Opcadia, led the move from a basic PHP site to a modern Next.js application, giving the business a maintainable, SEO-friendly foundation to grow on.",
      impact: "PHP → Next.js",
      color: "teal",
    },
    {
      icon: <WifiOff size={32} aria-hidden="true" />,
      title: "Shipped an Offline-Capable App for Seafarers",
      description:
        "At Marlow Navigation, built a mobile application that keeps working without connectivity, streamlining crew workflows and reducing manual processes.",
      impact: "Offline-first",
      color: "green",
    },
    {
      icon: <Award size={32} aria-hidden="true" />,
      title: "Delivered an E-Commerce Platform in 6 Months",
      description:
        "At Opcadia, led frontend development of an e-commerce platform that was delivered within six months.",
      impact: "6-month delivery",
      color: "purple",
    },
  ];

  const getColorClasses = (color: string) => {
    const colorMap: {
      [key: string]: { bg: string; text: string; icon: string };
    } = {
      blue: { bg: "bg-blue-50", text: "text-blue-600", icon: "text-blue-600" },
      teal: { bg: "bg-teal-50", text: "text-teal-600", icon: "text-teal-600" },
      green: {
        bg: "bg-green-50",
        text: "text-green-600",
        icon: "text-green-600",
      },
      purple: {
        bg: "bg-purple-50",
        text: "text-purple-600",
        icon: "text-purple-600",
      },
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <section id="achievements" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Key Achievements
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A snapshot of the outcomes delivered through frontend engineering,
            performance work, and strong product collaboration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {achievements.map((achievement) => {
            const colors = getColorClasses(achievement.color);
            return (
              <div
                key={achievement.title}
                className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <div
                  className={`${colors.bg} w-16 h-16 rounded-xl flex items-center justify-center mb-6`}
                >
                  <div className={colors.icon}>{achievement.icon}</div>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {achievement.title}
                </h3>

                <p className="text-gray-600 mb-4 leading-relaxed">
                  {achievement.description}
                </p>

                <div
                  className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${colors.bg} ${colors.text}`}
                >
                  {achievement.impact}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 bg-gradient-primary rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">
            Continuous Improvement Mindset
          </h3>
          <p className="text-lg text-blue-100 mb-6 max-w-3xl mx-auto">
            I bring a practical improvement mindset to every product: strengthen
            the user experience, reduce friction, and make systems more
            dependable through focused engineering work.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-bold text-yellow-300 mb-2">Problem Solver</h4>
              <p className="text-blue-100 text-sm">
                Breaking down technical problems into concrete, shippable
                improvements
              </p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-bold text-yellow-300 mb-2">Team Leader</h4>
              <p className="text-blue-100 text-sm">
                Helping teams align on execution and deliver releases on time
              </p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-bold text-yellow-300 mb-2">
                Continuous Improvement
              </h4>
              <p className="text-blue-100 text-sm">
                Growing into full-stack and system-oriented work through Humber
                College studies and hands-on projects
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
