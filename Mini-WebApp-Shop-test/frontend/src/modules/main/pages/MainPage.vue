<script setup lang="ts">
// Component logic will go here
</script>

<template>
  <div class="main-page">
    <header class="header">
      <div class="container">
        <div class="header__logo">
          <img src="@/assets/images/logo.png" alt="LISSE-SHOP Logo" class="header__logo-image" />
          <span class="header__logo-text">LISSE-SHOP</span>
        </div>
        <nav class="header__nav">
          <a href="/" class="header__nav-link active">О НАС</a>
          <a href="/catalog" class="header__nav-link">КАТАЛОГ</a>
          <a href="/cart" class="header__nav-link">КОРЗИНА</a>
          <a href="/orders" class="header__nav-link">МОИ ЗАКАЗЫ</a>
        </nav>
      </div>
    </header>

    <main class="main">
      <section class="hero">
        <div class="container">
          <div class="hero__content">
            <h1 class="hero__title">LISSE-SHOP</h1>
            <p class="hero__subtitle">
              Забудьте о запутанных проводах и наслаждайтесь кристально чистым звуком беспроводных
              наушников — идеальное сочетание стиля, комфорта и инновационных технологий.
            </p>
            <a href="/catalog" class="hero__button">Перейти в каталог</a>
          </div>
          <div class="hero__image-container">
            <img
              src="@/assets/images/airpods.png"
              alt="Беспроводные наушники"
              class="hero__image"
            />
          </div>
        </div>
      </section>

      <section class="about" id="about">
        <h2 class="about__title">О НАС</h2>
        <div class="container">
          <div class="about__content">
            <div class="about__image-container">
              <img src="@/assets/images/about.png" alt="Лиса в наушниках" class="about__image" />
            </div>
            <div class="about__text">
              «<span class="about__highlight">lisse-shop</span>» — Магазин наушников и техники для
              ценителей качественного звука. Мы открылись в 2023 году и стремимся предложить вам
              лучший выбор продукции и сервиса. Доверьтесь нам в выборе техники и наслаждайтесь
              качественными технологиями вместе с lisse-shop!
            </div>
          </div>
        </div>
      </section>
    </main>

    <footer class="footer">
      <div class="container">
        <p class="footer__copyright">Все права защищены</p>
        <a href="https://t.me/lisse_shop" class="footer__telegram">Наш Telegram</a>
      </div>
    </footer>
  </div>
</template>

<style scoped>
@import "@/assets/css/styles.css";

.main-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #4a4238;
}

.main {
  flex: 1;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Header Styles */
.header {
  background-color: #4a4238;
  padding: 20px 0;
  border-bottom: 1px solid rgba(230, 213, 184, 0.1);
}

.header__logo {
  display: flex;
  align-items: center;
}

.header__logo-image {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}

.header__logo-text {
  color: #ff6b35;
  font-size: 24px;
  font-weight: bold;
}

.header .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header__nav {
  display: flex;
  gap: 20px;
}

.header__nav-link {
  color: #e6d5b8;
  text-decoration: none;
  font-size: 16px;
  transition: color 0.3s ease, border-bottom 0.3s ease;
}

.header__nav-link:hover,
.header__nav-link.active {
  color: #ff6b35;
  border-bottom: 2px solid #ff6b35;
  padding-bottom: 3px;
}

/* Hero Section */
.hero {
  padding: 80px 0;
  background-image: linear-gradient(rgba(74, 66, 56, 0.8), rgba(74, 66, 56, 0.9));
  background-size: cover;
  background-position: center;
}

.hero .container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.hero__content {
  max-width: 600px;
  margin-right: 30px;
}

.hero__title {
  font-size: 48px;
  color: #ff6b35;
  margin-bottom: 20px;
  font-weight: 700;
  letter-spacing: 1px;
}

.hero__subtitle {
  font-size: 18px;
  line-height: 1.6;
  color: #e6d5b8;
  margin-bottom: 30px;
}

.hero__button {
  display: inline-block;
  padding: 12px 24px;
  background-color: #ff6b35;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.hero__button:hover {
  background-color: #e85a2c;
}

.hero__image-container {
  flex-shrink: 0;
}

.hero__image {
  max-width: 400px;
  height: auto;
  object-fit: contain;
  filter: drop-shadow(0 10px 15px rgba(0, 0, 0, 0.2));
}

/* About Section */
.about {
  padding: 80px 0;
  background-color: rgba(74, 66, 56, 0.95);
}

.about__title {
  font-size: 36px;
  color: #ffffff;
  text-align: center;
  margin-bottom: 50px;
  position: relative;
  padding: 0 20px;
}

.about__title:after {
  content: "";
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 3px;
  background-color: #ff6b35;
}

.about__content {
  display: flex;
  align-items: center;
  gap: 50px;
}

.about__image-container {
  flex-shrink: 0;
}

.about__image {
  max-width: 300px;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.about__text {
  font-size: 18px;
  line-height: 1.7;
  color: #e6d5b8;
}

.about__highlight {
  color: #ff6b35;
  font-weight: bold;
}

/* Footer Styles */
.footer {
  background-color: #4a4238;
  padding: 20px 0;
  color: #e6d5b8;
  border-top: 1px solid rgba(230, 213, 184, 0.1);
}

.footer .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer__copyright {
  font-size: 16px;
  margin: 0;
}

.footer__telegram {
  color: #e6d5b8;
  text-decoration: none;
  font-size: 16px;
  transition: color 0.3s ease;
}

.footer__telegram:hover {
  color: #ff6b35;
}

/* Responsive Styles */
@media (max-width: 992px) {
  .hero__content {
    max-width: 450px;
  }

  .hero__title {
    font-size: 42px;
  }

  .hero__image {
    max-width: 350px;
  }
}

@media (max-width: 768px) {
  .header .container {
    flex-direction: column;
    gap: 15px;
  }

  .header__nav {
    width: 100%;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .hero {
    padding: 50px 0;
  }

  .hero .container {
    flex-direction: column;
    text-align: center;
  }

  .hero__content {
    margin-right: 0;
    margin-bottom: 40px;
    max-width: 100%;
  }

  .hero__title {
    font-size: 36px;
  }

  .hero__subtitle {
    font-size: 16px;
  }

  .hero__button {
    padding: 10px 20px;
    font-size: 15px;
  }

  .hero__image {
    max-width: 300px;
  }

  .about {
    padding: 50px 0;
  }

  .about__title {
    font-size: 32px;
    margin-bottom: 40px;
  }

  .about__content {
    flex-direction: column;
    text-align: center;
    gap: 30px;
  }

  .about__image {
    margin-bottom: 0;
    max-width: 250px;
  }

  .about__text {
    font-size: 16px;
  }
}

@media (max-width: 480px) {
  .header__nav {
    gap: 10px;
    padding: 0 5px;
  }

  .header__nav-link {
    font-size: 13px;
  }

  .header__logo-text {
    font-size: 20px;
  }

  .header__logo-image {
    width: 40px;
    height: 40px;
  }

  .hero {
    padding: 40px 0;
  }

  .hero__title {
    font-size: 28px;
  }

  .hero__subtitle {
    font-size: 15px;
    line-height: 1.5;
  }

  .hero__button {
    padding: 8px 16px;
    font-size: 14px;
  }

  .hero__image {
    max-width: 250px;
  }

  .about__title {
    font-size: 26px;
  }

  .about__text {
    font-size: 15px;
    line-height: 1.6;
  }

  .about__image {
    max-width: 200px;
  }

  .footer .container {
    flex-direction: column;
    gap: 10px;
    text-align: center;
  }

  .footer__copyright,
  .footer__telegram {
    font-size: 14px;
  }
}
</style>
