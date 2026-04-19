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
              <h4 className="text-[12px] font-bold uppercase tracking-[0.08em] text-[var(--text-card-muted)] mb-4">
                {section}
              </h4>
              <ul className="flex flex-col gap-2.5 list-none p-0 m-0">
                {items.map((item) => (
                  <li key={item}>
                    <a
                      href="#!"
                      className="text-[13px] text-[var(--text-secondary)] no-underline font-medium tracking-[-0.01em] transition-colors duration-[180ms] hover:text-[var(--text-primary)]"
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
            <span className="text-[20px] font-extrabold tracking-[-1px]" style={{ background: "var(--gradient-accent)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>H</span>
            <span className="text-[20px] font-bold text-[var(--nav-text-color)] tracking-[-1px]">ire</span>
            <span
              className="text-[24px] font-extrabold ml-[-2px]"
              style={{ background: "var(--gradient-accent)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
            >
              X
            </span>
          </div>

          <p className="text-[12px] text-[var(--text-card-muted)] font-medium tracking-[-0.01em]">
            © {new Date().getFullYear()} hireX. All rights reserved. Built for professionals.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {/* Twitter/X */}
            <a href="#!" className="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--text-card-muted)] transition-all duration-[180ms] hover:text-[var(--text-primary)] hover:bg-black/5 dark:hover:bg-white/10">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.259 5.623L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            {/* GitHub */}
            <a href="#!" className="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--text-card-muted)] transition-all duration-[180ms] hover:text-[var(--text-primary)] hover:bg-black/5 dark:hover:bg-white/10">
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
