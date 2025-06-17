import Link from 'next/link';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-100 pt-16 pb-8">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo & Info */}
          <div className="space-y-4">
            <Link href="/" className="inline-block">
              <h3 className="text-2xl font-bold">
                <span className="gradient-text-purple">Kalos</span> Inks
              </h3>
            </Link>
            <p className="text-gray-600">
              Premium tattoo studio specializing in custom designs, cover-ups, and fine art tattooing.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-purple-700 transition-colors"
                aria-label="Instagram"
              >
                <Instagram />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-purple-700 transition-colors"
                aria-label="Facebook"
              >
                <Facebook />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-purple-700 transition-colors"
                aria-label="Twitter"
              >
                <Twitter />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/portfolio" 
                  className="text-gray-600 hover:text-purple-700 transition-colors"
                >
                  Portfolio
                </Link>
              </li>
              <li>
                <Link 
                  href="/booking" 
                  className="text-gray-600 hover:text-purple-700 transition-colors"
                >
                  Book Appointment
                </Link>
              </li>
              <li>
                <Link 
                  href="/ready-made-designs" 
                  className="text-gray-600 hover:text-purple-700 transition-colors"
                >
                  Ready-Made Designs
                </Link>
              </li>
              <li>
                <Link 
                  href="/education/aftercare" 
                  className="text-gray-600 hover:text-purple-700 transition-colors"
                >
                  Aftercare
                </Link>
              </li>
              <li>
                <Link 
                  href="/faq" 
                  className="text-gray-600 hover:text-purple-700 transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Education */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Education Hub</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/education/pain-chart" 
                  className="text-gray-600 hover:text-purple-700 transition-colors"
                >
                  Pain Chart
                </Link>
              </li>
              <li>
                <Link 
                  href="/education/aftercare" 
                  className="text-gray-600 hover:text-purple-700 transition-colors"
                >
                  Aftercare Guide
                </Link>
              </li>
              <li>
                <Link 
                  href="/education/preparation" 
                  className="text-gray-600 hover:text-purple-700 transition-colors"
                >
                  Preparation Checklist
                </Link>
              </li>
              <li>
                <Link 
                  href="/education/styles-quiz" 
                  className="text-gray-600 hover:text-purple-700 transition-colors"
                >
                  Find Your Style Quiz
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <MapPin className="w-5 h-5 text-purple-700 flex-shrink-0 mt-1" />
                <span className="text-gray-600">
                  123 Ink Street, Artville<br />
                  CA 90210
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="w-5 h-5 text-purple-700" />
                <a href="tel:+12345678900" className="text-gray-600 hover:text-purple-700 transition-colors">
                  (123) 456-7890
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-purple-700" />
                <a href="mailto:info@kalosinks.com" className="text-gray-600 hover:text-purple-700 transition-colors">
                  info@kalosinks.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-12 pt-8 text-center">
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} Kalos Inks. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}