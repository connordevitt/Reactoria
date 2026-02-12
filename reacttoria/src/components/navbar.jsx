import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
      isScrolled 
        ? 'bg-dark-900 border-b border-dark-800' 
        : 'bg-dark-900'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 group"
          >
            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">M</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-white font-bold text-lg">MLB</span>
              <span className="text-dark-400 font-medium text-sm ml-2">Standings</span>
            </div>
            <div className="sm:hidden">
              <span className="text-white font-bold text-sm">MLB</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              className={`navbar-link ${
                location.pathname === '/' ? 'bg-primary-600/20 text-primary-400' : ''
              }`}
            >
              Home
            </Link>
            <Link
              to="/leaguestandings"
              className={`navbar-link ${
                location.pathname === '/leaguestandings' ? 'bg-primary-600/20 text-primary-400' : ''
              }`}
            >
              League Standings
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-dark-300 hover:text-white hover:bg-dark-800 transition-colors duration-200"
            aria-expanded={isOpen}
          >
            <span className="sr-only">Open main menu</span>
            {isOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-200 overflow-hidden ${
          isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="py-2 space-y-1">
            <Link
              to="/"
              className={`block navbar-link ${
                location.pathname === '/' ? 'bg-primary-600/20 text-primary-400' : ''
              }`}
            >
              Home
            </Link>
            <Link
              to="/leaguestandings"
              className={`block navbar-link ${
                location.pathname === '/leaguestandings' ? 'bg-primary-600/20 text-primary-400' : ''
              }`}
            >
              League Standings
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;