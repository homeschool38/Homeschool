(function () {
  const mount = document.getElementById('site-footer');

  if (!mount) return;

  const footerHTML = `
    <style>
      .site-footer {
        background: #2e2e2e;
        color: rgba(255,255,255,0.72);
        padding: 42px 24px 26px;
        font-family: 'Nunito', sans-serif;
      }

      .site-footer-inner {
        max-width: 1100px;
        margin: 0 auto;
        display: grid;
        grid-template-columns: 1.4fr 1fr 1fr 1fr;
        gap: 34px;
      }

      .site-footer-brand {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .site-footer-logo {
        display: flex;
        align-items: center;
        gap: 10px;
        color: #ffffff;
        text-decoration: none;
      }

      .site-footer-logo img {
        width: 58px;
        height: 58px;
        border-radius: 50%;
        object-fit: contain;
      }

      .site-footer-logo span {
        font-family: 'Playfair Display', Georgia, serif;
        font-size: 1.25rem;
        line-height: 1.2;
      }

      .site-footer-tagline {
        color: rgba(255,255,255,0.68);
        font-size: 0.95rem;
        line-height: 1.7;
        max-width: 320px;
      }

      .site-footer-column h3 {
        color: #ffffff;
        font-family: 'Playfair Display', Georgia, serif;
        font-size: 1rem;
        margin-bottom: 12px;
      }

      .site-footer-column a {
        display: block;
        color: rgba(255,255,255,0.68);
        text-decoration: none;
        font-size: 0.92rem;
        margin-bottom: 8px;
        transition: color 0.2s;
      }

      .site-footer-column a:hover {
        color: #f5c0c2;
      }

      .site-footer-bottom {
        max-width: 1100px;
        margin: 32px auto 0;
        padding-top: 20px;
        border-top: 1px solid rgba(255,255,255,0.12);
        display: flex;
        justify-content: space-between;
        gap: 16px;
        flex-wrap: wrap;
        color: rgba(255,255,255,0.48);
        font-size: 0.85rem;
      }

      .site-footer-bottom a {
        color: #f5c0c2;
        text-decoration: none;
      }

      .site-footer-bottom a:hover {
        color: #ffffff;
      }

      @media (max-width: 800px) {
        .site-footer-inner {
          grid-template-columns: 1fr 1fr;
        }
      }

      @media (max-width: 560px) {
        .site-footer-inner {
          grid-template-columns: 1fr;
        }

        .site-footer-bottom {
          flex-direction: column;
        }
      }
    </style>

    <footer class="site-footer">
      <div class="site-footer-inner">
        <div class="site-footer-brand">
          <a class="site-footer-logo" href="/" aria-label="My Muslim Homeschool home">
            <img src="images/logo/My Muslim Homeschool Hub -  White logo.png" alt="My Muslim Homeschool logo">
            <span>My Muslim<br>Homeschool</span>
          </a>
          <p class="site-footer-tagline">
            Faith-filled Islamic resources for Muslim families, homeschoolers, and children — rooted in Qur’an, Sunnah, and real family life.
          </p>
        </div>

        <div class="site-footer-column">
          <h3>Shop</h3>
          <a href="/shop.html">All Products</a>
          <a href="/product-bundle.html">Homeschool Bundle</a>
          <a href="/product-scripts.html">Prophet Story Scripts</a>
          <a href="/product-screenfree.html">Screen-Free Cards</a>
        </div>

        <div class="site-footer-column">
          <h3>Resources</h3>
          <a href="/free-muslim-homeschool-printables.html">Free Printables</a>
          <a href="/islamic-homeschool-resources.html">Islamic Homeschool Resources</a>
          <a href="/islamic-studies-homeschool-curriculum.html">Islamic Studies</a>
          <a href="/blog.html">Blog</a>
        </div>

        <div class="site-footer-column">
          <h3>Connect</h3>
          <a href="/#about">About</a>
          <a href="/homeschool-course-landing.html">Course</a>
          <a href="/book-a-call.html">Book a Call</a>
          <a href="mailto:info@mymuslimhomeschool.com">Email Us</a>
        </div>
      </div>

      <div class="site-footer-bottom">
        <span>© ${new Date().getFullYear()} My Muslim Homeschool. All rights reserved.</span>
        <span>Digital resources for personal household use only. Questions? <a href="mailto:info@mymuslimhomeschool.com">info@mymuslimhomeschool.com</a></span>
      </div>
    </footer>
  `;

  mount.innerHTML = footerHTML;
})();
