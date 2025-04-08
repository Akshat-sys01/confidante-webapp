import React, { useState, useEffect } from 'react';
import { Heart, BookOpen, Users, MessageCircle, Mail, Phone, ArrowRight, Menu, X } from 'lucide-react';

// Types
interface NavItem {
  label: string;
  href: string;
}

interface BlogPost {
  title: string;
  image: string;
  alt: string;
  category: string;
  summary?: string;
}

interface Feature {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  desc: string;
}

interface ContactInfo {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  text: string;
  label: string;
  href?: string;
}

// Data
const NAV_ITEMS: NavItem[] = [
  { label: "Mission", href: "#mission" },
  { label: "Blog", href: "#blog" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" }
];

const BLOG_POSTS: BlogPost[] = [
  {
    title: "Understanding Teen Mental Health",
    image: "/images/07.jpg",
    alt: "Teen mental health awareness image",
    category: "Mental Health",
    summary: "Exploring the challenges teens face and strategies for support."
  },
  {
    title: "Comprehensive Sex Education: A Modern Approach",
    image: "/images/02.jpg",
    alt: "Comprehensive education classroom",
    category: "Sex Education",
    summary: "Evidence-based approaches to inclusive sex education."
  },
  {
    title: "Building Emotional Intelligence in Schools",
    image: "/images/04.jpg",
    alt: "Students working on emotional intelligence activity",
    category: "Emotional Well-being",
    summary: "How to foster emotional skills in educational settings."
  }
];

const FEATURES: Feature[] = [
  { icon: Heart, title: "Mental Health", desc: "Supporting emotional wellness" },
  { icon: BookOpen, title: "Education", desc: "Evidence-based learning" },
  { icon: Users, title: "Community", desc: "Building connections" },
  { icon: MessageCircle, title: "Support", desc: "24/7 assistance" }
];

const CONTACT_INFO: ContactInfo[] = [
  { 
    icon: Mail, 
    text: "helpatconfidante@gmail.com", 
    label: "Email",
    href: "mailto:helpatconfidante@gmail.com" 
  },
  { 
    icon: Phone, 
    text: "+91 98391 54888",
    label: "Phone",
    href: "tel:+919839154888" 
  },
  { 
    icon: Phone, 
    text: "+91 75058 43873",
    label: "Phone",
    href: "tel:+917505843873" 
  }
];

// Component for Navigation
const Navigation = () => {
  const [activeSection, setActiveSection] = useState("mission");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll for navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle section detection
  useEffect(() => {
    const handleSectionVisibility = () => {
      const sections = NAV_ITEMS.map(item => item.href.substring(1));
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleSectionVisibility);
    return () => window.removeEventListener('scroll', handleSectionVisibility);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img 
              src="/images/Confidante-Logo-Bird.png" 
              alt="Confidante Bird Logo" 
              className="w-10 h-10" 
            />
            <span className="ml-2 text-xl font-bold text-gray-800">Confidante</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              {NAV_ITEMS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className={`text-gray-700 hover:text-[#F98176] px-3 py-2 text-sm font-medium transition-colors duration-200 relative group ${
                    activeSection === href.substring(1) ? 'text-[#F98176]' : ''
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
                    setActiveSection(href.substring(1));
                  }}
                >
                  {label}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#F98176] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-in-out"></span>
                </a>
              ))}
            </div>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-700 hover:text-[#F98176] focus:outline-none focus:ring-2 focus:ring-[#F98176] rounded-md p-1"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white py-4 mt-2 rounded-lg shadow-lg">
            <div className="flex flex-col space-y-2">
              {NAV_ITEMS.map(({ label, href }) => (
                <a
                  key={label}
                  href={href}
                  className={`text-gray-700 hover:text-[#F98176] px-4 py-2 text-sm font-medium transition-colors duration-200 ${
                    activeSection === href.substring(1) ? 'text-[#F98176] bg-gray-100' : ''
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
                    setActiveSection(href.substring(1));
                    setIsMenuOpen(false);
                  }}
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

const HeroSection = () => (
  <section
    id="mission"
    className="relative bg-gradient-to-r from-[#F98176] to-[#F98176]/80 text-white pt-36 pb-24"
    aria-label="Mission statement"
  >
    <div className="container mx-auto px-6">
      <div className="flex flex-col lg:flex-row items-center">
        <div className="max-w-3xl lg:w-3/5">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Empowering Youth Through Health Education
          </h1>
          <p className="text-lg md:text-xl mb-8 leading-relaxed opacity-90">
            Bridging the gap between awareness and action in mental health, sex education, and emotional well-being. Making health education accessible and impactful for schools nationwide.
          </p>
          <button
            className="bg-white text-[#F98176] px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-all flex items-center gap-2 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#F98176]"
            aria-label="Get started with Confidante"
          >
            Get Started
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Rectangle Image Container with slight right shift */}
        <div className="mt-12 lg:mt-0 lg:w-2/5 relative flex justify-center lg:justify-end">
          <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-xl border-4 border-white transform translate-x-4"> 
            <img
              src="/images/01.jpg"
              alt="Person with arms outstretched feeling free"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
);

// Component for Blog Card
interface BlogCardProps {
  title: string;
  image: string;
  alt: string;
  category: string;
  summary?: string;
}

const BlogCard = ({ title, image, alt, category, summary }: BlogCardProps) => (
  <article className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-transform duration-300">
    <div className="overflow-hidden">
      <img 
        src={image} 
        alt={alt} 
        className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105" 
      />
    </div>
    <div className="p-6">
      <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#F98176]/10 text-[#F98176] mb-3">{category}</span>
      <h3 className="text-xl font-bold mb-3 line-clamp-2 text-gray-800">{title}</h3>
      {summary && <p className="text-gray-600 mb-4 line-clamp-2">{summary}</p>}
      <a 
        href="#" 
        className="text-[#F98176] font-semibold flex items-center gap-2 group hover:underline" 
        aria-label={`Read more about ${title}`}
      >
        Read More
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </a>
    </div>
  </article>
);

// Component for Feature Item
interface FeatureItemProps {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  desc: string;
}

const FeatureItem = ({ Icon, title, desc }: FeatureItemProps) => (
  <div className="flex flex-col items-center text-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
    <div className="w-12 h-12 rounded-full bg-[#F98176]/10 flex items-center justify-center mb-4">
      <Icon className="w-6 h-6 text-[#F98176]" aria-hidden="true" />
    </div>
    <h3 className="font-semibold text-lg mb-2 text-gray-800">{title}</h3>
    <p className="text-sm text-gray-600">{desc}</p>
  </div>
);

// Component for Contact Item
interface ContactItemProps {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  text: string;
  href?: string;
}

const ContactItem = ({ Icon, label, text, href }: ContactItemProps) => (
  <a 
    href={href} 
    className="flex items-center gap-4 p-3 hover:bg-[#F98176]/5 rounded-lg transition-colors"
    aria-label={`Contact via ${label}: ${text}`}
  >
    <div className="w-10 h-10 rounded-full bg-[#F98176]/10 flex items-center justify-center">
      <Icon className="w-5 h-5 text-[#F98176]" aria-hidden="true" />
    </div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium text-gray-800">{text}</p> {/* Added text-gray-800 for better visibility */}
    </div>
  </a>
);

// Component for Contact Form
const ContactForm = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormState(prev => ({ ...prev, [id]: value }));
    
    // Clear error when typing
    if (errors[id as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [id]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      name: '',
      email: '',
      message: ''
    };
    let isValid = true;

    if (!formState.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!formState.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      newErrors.email = 'Email address is invalid';
      isValid = false;
    }

    if (!formState.message.trim()) {
      newErrors.message = 'Message is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate form submission
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitted(true);
        setFormState({ name: '', email: '', message: '' });
        
        // Reset success message after 5 seconds
        setTimeout(() => {
          setSubmitted(false);
        }, 5000);
      }, 1500);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {submitted ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h3 className="text-xl font-semibold mb-2 text-gray-800">Thank You!</h3>
          <p className="text-gray-600">Your message has been sent successfully. We'll get back to you soon.</p>
        </div>
      ) : (
        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
            <input
              id="name"
              type="text"
              value={formState.name}
              onChange={handleChange}
              placeholder="John Doe"
              className={`w-full px-4 py-2 rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#F98176] text-gray-800`} /* Added text-gray-800 */
              aria-invalid={errors.name ? 'true' : 'false'}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name && <p id="name-error" className="mt-1 text-sm text-red-500">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
            <input
              id="email"
              type="email"
              value={formState.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className={`w-full px-4 py-2 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#F98176] text-gray-800`} /* Added text-gray-800 */
              aria-invalid={errors.email ? 'true' : 'false'}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && <p id="email-error" className="mt-1 text-sm text-red-500">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
            <textarea
              id="message"
              value={formState.message}
              onChange={handleChange}
              placeholder="How can we help you?"
              rows={4}
              className={`w-full px-4 py-2 rounded-lg border ${errors.message ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:ring-2 focus:ring-[#F98176] text-gray-800`} /* Added text-gray-800 */
              aria-invalid={errors.message ? 'true' : 'false'}
              aria-describedby={errors.message ? 'message-error' : undefined}
            ></textarea>
            {errors.message && <p id="message-error" className="mt-1 text-sm text-red-500">{errors.message}</p>}
          </div>
          <button 
            type="submit" 
            className="w-full bg-[#F98176] text-white py-3 rounded-lg hover:bg-[#F98176]/90 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F98176] flex items-center justify-center"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending...
              </>
            ) : (
              'Send Message'
            )}
          </button>
        </form>
      )}
    </div>
  );
};

// Blog Section Component
const BlogSection = () => (
  <section id="blog" className="py-20 bg-[#F0ECE5]" aria-labelledby="blog-heading">
    <div className="container mx-auto px-6">
      <div className="text-center mb-12">
        <h2 id="blog-heading" className="text-3xl font-bold mb-4 text-[#F98176]">Latest Insights</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">Explore our collection of resources designed to inform and inspire better health education practices.</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {BLOG_POSTS.map((post, index) => (
          <BlogCard key={index} {...post} />
        ))}
      </div>
      <div className="text-center mt-12">
        <a 
          href="#" 
          className="inline-flex items-center gap-2 text-[#F98176] font-semibold hover:underline"
          aria-label="View all blog posts"
        >
          View All Posts
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>
    </div>
  </section>
);

// About Section Component
const AboutSection = () => (
  <section id="about" className="py-20 bg-white" aria-labelledby="about-heading">
    <div className="container mx-auto px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 id="about-heading" className="text-3xl font-bold mb-6 text-[#F98176]">About Confidante</h2>
        <p className="text-gray-600 mb-12 text-lg">We believe that every student deserves access to comprehensive health education that addresses their physical, mental, and emotional well-being. Our platform combines expert knowledge with innovative technology to create engaging, accessible, and impactful educational experiences.</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {FEATURES.map((feature, index) => (
            <FeatureItem key={index} Icon={feature.icon} title={feature.title} desc={feature.desc} />
          ))}
        </div>
        
        <div className="w-full max-w-md mx-auto">
          <img 
            src="/images/05.png"
            alt="Team collaborating on health education materials"
            className="rounded-lg shadow-xl w-full"
          />
        </div>
      </div>
    </div>
  </section>
);

// Contact Section Component
const ContactSection = () => (
  <section id="contact" className="py-20 bg-[#F0ECE5]" aria-labelledby="contact-heading">
    <div className="container mx-auto px-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 id="contact-heading" className="text-3xl font-bold mb-4 text-[#F98176]">Get in Touch</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Have questions or want to learn more? We're here to help. Reach out to our team using the contact information below.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-6 text-[#F98176]">Contact Information</h3>
            <div className="space-y-4">
              {CONTACT_INFO.map((item, index) => (
                <ContactItem key={index} Icon={item.icon} label={item.label} text={item.text} href={item.href} />
              ))}
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h4 className="font-medium mb-4 text-gray-700">Connect With Us</h4>
              <div className="flex space-x-4">
                {[
                  { name: 'Facebook', icon: 'facebook' },
                  { name: 'Twitter', icon: 'twitter' },
                  { name: 'Instagram', icon: 'instagram' },
                  { name: 'LinkedIn', icon: 'linkedin' }
                ].map((social) => (
                  <a
                    key={social.name}
                    href="#"
                    className="w-10 h-10 rounded-full bg-[#F98176]/10 flex items-center justify-center hover:bg-[#F98176] hover:text-white transition-colors"
                    aria-label={`Follow us on ${social.name}`}
                  >
                    <span className="sr-only">{social.name}</span>
                    {/* Using visible text for icons with proper contrast */}
                    <span className="text-xs font-bold text-[#F98176] hover:text-white">{social.icon.charAt(0).toUpperCase()}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
    </div>
  </section>
);

// Footer Component
const Footer = () => (
  <footer className="bg-[#333] text-white py-8">
    <div className="container mx-auto px-6">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <img 
            src="/images/Confidante-Logo-Bird.png" 
            alt="Confidante Bird Logo" 
            className="w-8 h-8" 
          />
          <span className="ml-2 text-lg font-bold">Confidante</span>
        </div>
        <div className="text-sm text-gray-400">
          © {new Date().getFullYear()} Confidante. All rights reserved.
        </div>
      </div>
    </div>
  </footer>
);

// Scroll To Top Button Component
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      className={`fixed right-6 bottom-6 p-3 rounded-full bg-[#F98176] text-white shadow-lg transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-6 w-6" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M5 10l7-7m0 0l7 7m-7-7v18" 
        />
      </svg>
    </button>
  );
};

// Main App Component
function App() {
  return (
    <div className="min-h-screen bg-[#F0ECE5]">
      <Navigation />
      <HeroSection />
      <BlogSection />
      <AboutSection />
      <ContactSection />
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}

export default App;