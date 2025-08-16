import React from 'react';
import { TrendingUp, Users, Zap, Award } from 'lucide-react';

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
      icon: <TrendingUp size={32} />,
      title: "Improved Query Efficiency",
      description: "By redesigning and fully revising SQL connections and database schema",
      impact: "40% performance boost",
      color: "blue"
    },
    {
      icon: <Zap size={32} />,
      title: "Enhanced System Efficiency", 
      description: "Led implementation of automated monitoring solutions and proactive maintenance",
      impact: "30% efficiency increase + $10K annual savings",
      color: "teal"
    },
    {
      icon: <Users size={32} />,
      title: "Drove Student Enrollment Growth",
      description: "Built Next.js online platform enabling students to discover and book classes",
      impact: "40% increase in enrollment, 5% revenue boost",
      color: "green"
    },
    {
      icon: <Award size={32} />,
      title: "Integrated Google Maps Navigation SDK",
      description: "Improved the driver app's navigation accuracy and reduced route deviation times",
      impact: "80% reduction in route deviations",
      color: "purple"
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap: { [key: string]: { bg: string, text: string, icon: string } } = {
      blue: { bg: "bg-blue-50", text: "text-blue-600", icon: "text-blue-600" },
      teal: { bg: "bg-teal-50", text: "text-teal-600", icon: "text-teal-600" },
      green: { bg: "bg-green-50", text: "text-green-600", icon: "text-green-600" },
      purple: { bg: "bg-purple-50", text: "text-purple-600", icon: "text-purple-600" }
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
            Measurable results that demonstrate my ability to deliver impactful solutions and drive business growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {achievements.map((achievement, index) => {
            const colors = getColorClasses(achievement.color);
            return (
              <div 
                key={index}
                className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className={`${colors.bg} w-16 h-16 rounded-xl flex items-center justify-center mb-6`}>
                  <div className={colors.icon}>
                    {achievement.icon}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {achievement.title}
                </h3>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {achievement.description}
                </p>
                
                <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${colors.bg} ${colors.text}`}>
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
            I believe in leveraging essential tools and techniques to drive business success, 
            achieve all 15% increase by readying strategies and actionable plans.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-bold text-yellow-300 mb-2">Problem Solver</h4>
              <p className="text-blue-100 text-sm">Identifying and solving complex technical challenges</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-bold text-yellow-300 mb-2">Team Leader</h4>
              <p className="text-blue-100 text-sm">Supporting teammates in achieving sprint goals</p>
            </div>
            <div className="bg-white/10 rounded-lg p-4">
              <h4 className="font-bold text-yellow-300 mb-2">Innovation Driver</h4>
              <p className="text-blue-100 text-sm">Implementing cutting-edge solutions for optimal results</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;