import React from 'react';
import { portfolioData } from '../mock';
import { Code2, Database, Layout, Terminal } from 'lucide-react';
import { Badge } from './ui/badge';

const About = () => {
  const { about, skills } = portfolioData;

  const skillCategories = [
    { title: 'Programming', icon: Code2, skills: skills.programming, color: 'emerald' },
    { title: 'Frontend', icon: Layout, skills: skills.frontend, color: 'cyan' },
    { title: 'Backend', icon: Terminal, skills: skills.backend, color: 'violet' },
    { title: 'Databases & Tools', icon: Database, skills: [...skills.databases, ...skills.tools], color: 'orange' }
  ];

  return (
    <section id="about" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            About <span className="bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">Me</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 mx-auto rounded-full"></div>
        </div>

        {/* About content */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          {/* Image */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-2xl transform rotate-3"></div>
            <img
              src={about.image}
              alt="Deep Ranpariya"
              className="relative rounded-2xl w-full h-auto object-cover shadow-2xl"
            />
          </div>

          {/* Description */}
          <div className="space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed">
              {about.description}
            </p>
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-gray-900">Languages</h3>
              {about.languages.map((lang, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span className="text-gray-700">
                    <strong>{lang.name}</strong> - {lang.level}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Skills section */}
        <div>
          <h3 className="text-3xl font-bold text-center mb-12">
            Technical <span className="bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">Skills</span>
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 bg-${category.color}-100 rounded-lg`}>
                      <Icon className={`w-5 h-5 text-${category.color}-600`} />
                    </div>
                    <h4 className="font-semibold text-gray-900">{category.title}</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, idx) => (
                      <Badge
                        key={idx}
                        variant="secondary"
                        className="bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;