// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header background change on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = '#0a0f0a';
    } else {
        header.style.background = '#0a0f0a';
    }
});

// Form submission
const registrationForm = document.getElementById('registrationForm');
if (registrationForm) {
  registrationForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Zbieranie danych z formularza
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);

    // Walidacje (jak u Ciebie)
    if (!data.firstName || !data.lastName || !data.email || !data.phone || !data.faculty || !data.major || !data.year) {
      alert('Proszę wypełnić wszystkie wymagane pola.');
      return;
    }
    if (!data.age) {
      alert('Musisz być pełnoletni, aby uczestniczyć w wycieczce.');
      return;
    }
    if (!data.terms) {
      alert('Proszę zaakceptować regulamin wyjazdu.');
      return;
    }
    if (!data.rodo) {
      alert('Proszę zaakceptować RODO wyjazdu.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      alert('Proszę podać prawidłowy adres email.');
      return;
    }
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{9,}$/;
    if (!phoneRegex.test(data.phone)) {
      alert('Proszę podać prawidłowy numer telefonu.');
      return;
    }

    // UI przycisku
    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn ? submitBtn.textContent : '';
    if (submitBtn) {
      submitBtn.textContent = 'Wysyłanie...';
      submitBtn.disabled = true;
    }

    // Budujemy FormData do wysyłki (TOGO użyjemy!)
    const sheetFormData = new FormData();
    sheetFormData.set('timestamp', new Date().toLocaleString('pl-PL'));
    sheetFormData.set('firstName', data.firstName);
    sheetFormData.set('lastName', data.lastName);
    sheetFormData.set('email', data.email);
    sheetFormData.set('phone', data.phone);
    sheetFormData.set('faculty', data.faculty);
    sheetFormData.set('major', data.major);
    sheetFormData.set('year', data.year);
    sheetFormData.set('dietary', data.dietary || 'Brak');
    sheetFormData.set('age', data.age ? 'Tak' : 'Nie');
    sheetFormData.set('terms', data.terms ? 'Tak' : 'Nie');
    sheetFormData.set('rodo', data.rodo ? 'Tak' : 'Nie');

    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwW-GL8ZUwPa8XCgiGMjsDDG0Y4T58lCugmC5nvZrZpcEyd5zT1tiCOsmYCm-gFl5Kf/exec';

    // KLUCZOWA ZMIANA: wysyłamy FormData, bez nagłówków, no-cors
    fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      body: sheetFormData
    })
    .then(() => {
      alert(`Dziękujemy za zgłoszenie, ${data.firstName} ${data.lastName}! Wkrótce otrzymasz potwierdzenie na adres ${data.email}. Pamiętaj o wpłaceniu kwoty 449 zł do 24 września 2025.`);
      this.reset();
    })
    .catch((err) => {
      console.error('Błąd wysyłki:', err);
      alert('Wystąpił błąd podczas wysyłania formularza. Spróbuj ponownie lub skontaktuj się z organizatorami.');
    })
    .finally(() => {
      if (submitBtn) {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    });
  });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.about-card, .detail-card, .contact-card, .rule-item, .timeline-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add some spooky effects
document.addEventListener('DOMContentLoaded', () => {
    // Random forest sounds effect (visual only)
    const createMysteryEffect = () => {
        const effects = ['🌲', '🦉', '👁️', '🔍', '❓'];
        const effect = document.createElement('div');
        effect.textContent = effects[Math.floor(Math.random() * effects.length)];
        effect.style.position = 'fixed';
        effect.style.left = Math.random() * window.innerWidth + 'px';
        effect.style.top = Math.random() * window.innerHeight + 'px';
        effect.style.fontSize = '2rem';
        effect.style.opacity = '0.3';
        effect.style.pointerEvents = 'none';
        effect.style.zIndex = '1';
        effect.style.animation = 'float 3s ease-in-out forwards';
        
        document.body.appendChild(effect);
        
        setTimeout(() => {
            effect.remove();
        }, 3000);
    };
    
    // Create mystery effects occasionally
    setInterval(createMysteryEffect, 10000);
});

// Add CSS for floating animation
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0% {
            opacity: 0;
            transform: translateY(20px);
        }
        50% {
            opacity: 0.3;
            transform: translateY(-20px);
        }
        100% {
            opacity: 0;
            transform: translateY(-40px);
        }
    }
`;
document.head.appendChild(style);