(function () {
  const mount = document.getElementById('site-nav');

  if (!mount) return;

  const navHTML = `
    <style>
      :root {
        --pink: #e8868a;
        --pink-light: #f5c0c2;
        --pink-pale: #fdf0f0;
        --sage: #85b5a8;
        --sage-light: #b8d5ce;
        --sage-pale: #edf6f4;
        --yellow: #e8c45a;
        --charcoal: #2e2e2e;
        --mid: #5a5252;
        --cream: #fdf9f6;
        --white: #ffffff;
        --border: #edddd8;
      }

      .site-nav {
        background: var(--white);
        border-bottom: 2px solid var(--pink-light);
        padding: 12px 28px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: sticky;
        top: 0;
        z-index: 1000;
        box-shadow: 0 2px 12px rgba(232,134,138,0.1);
      }

      .site-nav-logo {
        display: flex;
        align-items: center;
        gap: 10px;
        text-decoration: none;
        color: inherit;
      }

      .site-nav-logo img {
        height: 70px;
        width: 70px;
        object-fit: contain;
        border-radius: 50%;
      }

      .site-nav-logo span {
        font-family: 'Playfair Display', Georgia, 'Times New Roman', serif;
        font-size: 1.6rem;
        color: var(--charcoal);
        line-height: 1.25;
      }

      .site-nav-links {
        display: flex;
        align-items: center;
        gap: 18px;
      }

      .site-nav-links a {
        font-family: 'Nunito', sans-serif;
        font-size: 0.95rem;
        font-weight: 600;
        letter-spacing: 0.06em;
        text-decoration: none;
        color: var(--mid);
        transition: color 0.2s, background 0.2s, transform 0.2s;
      }

      .site-nav-links a:hover {
        color: var(--pink);
      }

      .site-dropdown {
        position: relative;
        display: inline-flex;
        align-items: center;
      }

      .site-dropdown > a {
        display: flex;
        align-items: center;
        gap: 4px;
      }

      .site-dropdown-arrow {
        font-size: 0.65rem;
        transition: transform 0.2s;
      }

      .site-dropdown:hover .site-dropdown-arrow {
        transform: rotate(180deg);
      }

      .site-dropdown-content {
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        padding-top: 10px;
        background: var(--white);
        min-width: 250px;
        border-radius: 12px;
        box-shadow: 0 8px 30px rgba(0,0,0,0.08);
        border: 1px solid var(--border);
        z-index: 1001;
      }

      .site-dropdown-content a {
        display: block;
        padding: 10px 20px;
        font-size: 0.95rem;
        color: var(--mid);
        white-space: nowrap;
      }

      .site-dropdown-content a:hover {
        background: var(--pink-pale);
        color: var(--pink);
      }

      .site-dropdown:hover .site-dropdown-content {
        display: block;
      }

      .site-nav-cta {
        background: var(--pink);
        color: var(--white) !important;
        padding: 8px 22px;
        border-radius: 30px;
      }

      .site-nav-cta:hover {
        background: var(--sage) !important;
        color: var(--white) !important;
        transform: translateY(-1px);
      }

      .site-mobile-toggle {
        display: none;
        flex-direction: column;
        gap: 5px;
        cursor: pointer;
        background: none;
        border: none;
        padding: 4px;
      }

      .site-mobile-toggle span {
        display: block;
        width: 26px;
        height: 2.5px;
        background: var(--charcoal);
        border-radius: 2px;
        transition: all 0.3s ease;
      }

      .site-header-spacer {
        height: 94px;
      }

      @media (max-width: 900px) {
        .site-nav {
          padding: 10px 16px;
        }

        .site-nav-logo img {
          height: 50px;
          width: 50px;
        }

        .site-nav-logo span {
          font-size: 1.2rem;
        }

        .site-mobile-toggle {
          display: flex;
        }

        .site-nav-links {
          display: none;
        }

        .site-nav-links.mobile-open {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: var(--white);
          padding: 20px 24px;
          gap: 14px;
          border-bottom: 2px solid var(--pink-light);
          box-shadow: 0 10px 30px rgba(0,0,0,0.05);
        }

        .site-dropdown {
          display: block;
          width: 100%;
        }

        .site-dropdown > a {
          display: flex;
        }

        .site-dropdown-content {
          display: block;
          position: static;
          box-shadow: none;
          background: transparent;
          padding: 8px 0 0 16px;
          border: none;
          min-width: auto;
        }

        .site-dropdown-content a {
          padding: 6px 0;
        }

        .site-mobile-toggle.active span:nth-child(1) {
          transform: rotate(45deg) translate(5px, 6px);
        }

        .site-mobile-toggle.active span:nth-child(2) {
          opacity: 0;
        }

        .site-mobile-toggle.active span:nth-child(3) {
          transform: rotate(-45deg) translate(5px, -6px);
        }

        .site-header-spacer {
          height: 70px;
        }
      }
    </style>

    <nav class="site-nav" id="nav">
      <a class="site-nav-logo" href="/" aria-label="My Muslim Homeschool home">
        <img src="/images/logo/logo.png" alt="My Muslim Homeschool logo">
        <span>My Muslim<br>Homeschool</span>
      </a>

      <button class="site-mobile-toggle" id="siteMobileToggle" aria-label="Toggle menu">
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div class="site-nav-links" id="siteNavLinks">
        <a href="/">Home</a>
        <a href="/#free-course">Free Resources</a>

        <div class="site-dropdown">
          <a href="/shop.html">Shop <span class="site-dropdown-arrow">▼</span></a>
          <div class="site-dropdown-content">
            <a href="/shop.html">All Products</a>
            <a href="/halal-haram-sunnah-foods.html">Halal, Haram &amp; Sunnah Foods</a>
            <a href="/99-names-of-allah-for-kids.html">99 Names of Allah for Kids</a>
            <a href="/product-bundle.html">Homeschool Bundle</a>
            <a href="/product-scripts.html">Prophet Story Scripts</a>
            <a href="/product-screenfree.html">Screen-Free Challenge Cards</a>
            <a href="/product-playbook.html">Morning Routine Playbook</a>
            <a href="/product-workbook.html">Homeschool Reset Workbook</a>
            </div>
        </div>

        <a href="/blog.html">Blog</a>
        <a href="/#about">About</a>
        <a href="/homeschool-course-landing.html">Course</a>
        <a class="site-nav-cta" href="/book-a-call.html">Book a Call</a>
      </div>
    </nav>

    <div class="site-header-spacer"></div>
  `;

  mount.innerHTML = navHTML;

  const toggle = document.getElementById('siteMobileToggle');
  const navLinks = document.getElementById('siteNavLinks');

  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      toggle.classList.toggle('active');
      navLinks.classList.toggle('mobile-open');
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        toggle.classList.remove('active');
        navLinks.classList.remove('mobile-open');
      });
    });
  }
})();
