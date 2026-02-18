import React from 'react';
import { Button } from './ui/button';
import { Github, Linkedin, Mail, MapPin, ArrowDown } from 'lucide-react';
import { portfolioData } from '../mock';

const Hero = () => {
  const { hero } = portfolioData;

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center">
        <div className="space-y-6 animate-fade-in">
          {/* Location badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
            <MapPin className="w-4 h-4 text-emerald-400" />
            <span className="text-sm text-gray-300">{hero.location}</span>
          </div>

          {/* Name */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
              {hero.name}
            </span>
          </h1>

          {/* Title */}
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-light text-emerald-400">
            {hero.title}
          </h2>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            {hero.subtitle}
          </p>

          {/* Social links */}
          <div className="flex items-center justify-center gap-4 pt-6">
            <a
              href={hero.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-all hover:scale-110 hover:border-emerald-400/50"
            >
              <Github className="w-5 h-5 text-gray-300" />
            </a>
            <a
              href={hero.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-all hover:scale-110 hover:border-emerald-400/50"
            >
              <Linkedin className="w-5 h-5 text-gray-300" />
            </a>
            <a
              href={`mailto:${hero.email}`}
              className="p-3 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-all hover:scale-110 hover:border-emerald-400/50"
            >
              <Mail className="w-5 h-5 text-gray-300" />
            </a>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
            <Button
              onClick={() => scrollToSection('projects')}
              size="lg"
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-6 text-lg rounded-full transition-all hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/50"
            >
              View My Work
            </Button>
            <Button
              onClick={() => scrollToSection('contact')}
              size="lg"
              variant="outline"
              className="border-2 border-emerald-400/50 text-emerald-400 hover:bg-emerald-400/10 px-8 py-6 text-lg rounded-full transition-all hover:scale-105"
            >
              Get In Touch
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <button
          onClick={() => scrollToSection('about')}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce"
        >
          <ArrowDown className="w-6 h-6 text-emerald-400" />
        </button>
      </div>
    </section>
  );
};

export default Hero;