import React from 'react';

interface SkillCategory {
  title: string;
  skills: string[];
  color: string;
}

const Skills: React.FC = () => {
  const skillCategories: SkillCategory[] = [
    {
      title: "Frontend Technologies",
      skills: ["React", "React Native", "Next.js", "TypeScript", "JavaScript", "HTML5", "CSS3", "SASS"],
      color: "blue"
    },
    {
      title: "Backend & Database", 
      skills: ["Node.js", "NestJS", "PostgreSQL", "MySQL", "MongoDB", "GraphQL"],
      color: "teal"
    },
    {
      title: "Tools & DevOps",
      skills: ["Docker", "AWS", "Google Cloud Platform", "Lambda", "DynamoDB", "S3", "Webpack"],
      color: "purple"
    },
    {
      title: "Testing & Methodologies",
      skills: ["Jest", "Cypress", "Agile", "Scrum"],
      color: "green"
    },
    {
      title: "Operating Systems",
      skills: ["Mac", "Linux", "Windows"],
      color: "orange"
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap: { [key: string]: string } = {
      blue: "bg-blue-100 text-blue-800 border-blue-200",
      teal: "bg-teal-100 text-teal-800 border-teal-200", 
      purple: "bg-purple-100 text-purple-800 border-purple-200",
      green: "bg-green-100 text-green-800 border-green-200",
      orange: "bg-orange-100 text-orange-800 border-orange-200"
    };
    return colorMap[color] || colorMap.blue;
  };

  return (
    <section id="skills" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Technical Skills
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A comprehensive toolkit of modern technologies and frameworks I use to build exceptional web applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className={`px-3 py-2 rounded-full text-sm font-medium border transition-all duration-200 hover:scale-105 ${getColorClasses(category.color)}`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-white rounded-xl p-8 shadow-md">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Core Strengths
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-blue-600">7+</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Years Experience</h4>
                <p className="text-gray-600">Proven track record in frontend development</p>
              </div>
              <div className="text-center">
                <div className="bg-teal-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-teal-600">50k+</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Users Impacted</h4>
                <p className="text-gray-600">Applications serving tens of thousands</p>
              </div>
              <div className="text-center">
                <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-orange-600">40%</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Performance Gains</h4>
                <p className="text-gray-600">Average improvement in application efficiency</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;