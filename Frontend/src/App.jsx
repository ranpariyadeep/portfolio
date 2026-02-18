import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Education from "./components/Education";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { Toaster } from "./components/ui/toaster";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin from "./pages/Admin";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/" element={
          <div className="App">
            <Header />
            <Hero />
            <About />
            <Projects />
            <Education />
            <Contact />
            <Footer />
            <Toaster />
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;