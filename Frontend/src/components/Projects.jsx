import React from 'react';
import { portfolioData } from '../mock';
import { ExternalLink, Github, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

const Projects = () => {
  const { projects } = portfolioData;

  return (
    <section id="projects" className="py-24 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Featured <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 mx-auto rounded-full"></div>
          <p className="text-gray-400 mt-4 text-lg">Building innovative solutions with modern technologies</p>
        </div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group bg-slate-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-emerald-400/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-emerald-500/20"
            >
              {/* Project image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
                <Badge
                  className="absolute top-4 right-4 bg-emerald-500/90 text-white border-0"
                >
                  {project.status}
                </Badge>
              </div>

              {/* Project content */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-emerald-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-emerald-400 text-sm font-medium">{project.subtitle}</p>
                </div>

                <p className="text-gray-400 leading-relaxed">{project.description}</p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="border-emerald-400/30 text-emerald-400 bg-emerald-400/5"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>

                {/* Key features */}
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-gray-300">Key Features:</p>
                  <ul className="space-y-1">
                    {project.features.slice(0, 3).map((feature, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-400">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Links */}
                <div className="flex gap-3 pt-4">
                  <Button
                    asChild
                    className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-all hover:scale-105"
                  >
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="w-4 h-4 mr-2" />
                      View Code
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="border-emerald-400/50 text-emerald-400 hover:bg-emerald-400/10 rounded-lg transition-all hover:scale-105"
                  >
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                </div>

                {/* Date */}
                <p className="text-xs text-gray-500 pt-2">{project.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;