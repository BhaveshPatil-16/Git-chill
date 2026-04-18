import React from "react";

const Footer = () => {
  const links = {
    Company: ["About hireX", "Careers", "Press", "Blog"],
    Product: ["Features", "Pricing", "Changelog", "Roadmap"],
    Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
    Support: ["Help Center", "Contact Us", "Status"],
  };

  return (
    <footer
      className="ml-0 md:ml-[280px] border-t border-white/5 mt-8 transition-[margin-left] duration-300"
      style={{ background: "var(--bg-nav)", backdropFilter: "blur(20px)" }}
    >
      <div className="max-w-[900px] mx-auto px-6 py-10">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 mb-10">
          {Object.entries(links).map(([section, items]) => (
            <div key={section}>
              <h4 className="text-[12px] font-bold uppercase tracking-[0.08em] text-white/40 mb-4">
                {section}
              </h4>
              <ul className="flex flex-col gap-2.5 list-none p-0 m-0">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#!"
                      className="text-[13px] text-white/55 no-underline font-medium tracking-[-0.01em] transition-colors duration-[180ms] hover:text-white"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-white/5 md:flex-col md:gap-3 md:text-center">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-[20px] font-bold text-white tracking-[-1px]">hire</span>
            <span
              className="text-[24px] font-extrabold ml-[-2px]"
              style={{ background: "var(--gradient-accent)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
            >
              X
            </span>
          </div>

          <p className="text-[12px] text-white/30 font-medium tracking-[-0.01em]">
            © {new Date().getFullYear()} hireX. All rights reserved. Built for professionals.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {/* Twitter/X */}
            <a href="#!" className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 transition-all duration-[180ms] hover:text-white hover:bg-white/10">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.623L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            {/* LinkedIn */}
            <a href="#!" className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 transition-all duration-[180ms] hover:text-white hover:bg-white/10">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            {/* GitHub */}
            <a href="#!" className="w-8 h-8 rounded-lg flex items-center justify-center text-white/40 transition-all duration-[180ms] hover:text-white hover:bg-white/10">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
