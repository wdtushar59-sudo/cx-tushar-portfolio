document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const toggle = document.querySelector('.site-header__toggle');
  const menu = document.querySelector('.site-header__menu');
  if(toggle) {
    toggle.addEventListener('click', () => {
      if(menu.style.display === 'flex') {
        menu.style.display = 'none';
      } else {
        menu.style.display = 'flex';
        menu.style.flexDirection = 'column';
        menu.style.background = 'rgba(0,0,0,0.4)';
        menu.style.position = 'absolute';
        menu.style.top = '64px';
        menu.style.right = '20px';
        menu.style.padding = '12px';
        menu.style.borderRadius = '8px';
      }
    });
  }

  // Simple fade in on scroll (CSS class add)
  const faders = document.querySelectorAll('.feature-card, .section-header, .partners, .cta');
  const appearOptions = {threshold: 0.15, rootMargin: "0px 0px -50px 0px"};
  const appearOnScroll = new IntersectionObserver(function(entries, observer){
    entries.forEach(entry => {
      if(!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, appearOptions);
  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });
});




(function () {
  const textElements = document.querySelectorAll(".typewriter__text");
  const texts = [
    "Schedule meetings and send invites automatically",
    "Generate weekly sales summary report",
    "Create CRM contact from emails"
  ];

  const typingSpeed = 70;   // typing speed (ms per character)
  const deletingSpeed = 40; // deleting speed (ms per character)
  const delayBetween = 1500; // pause before switching text

  textElements.forEach((textElement, index) => {
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
      const currentText = texts[textIndex];

      if (!isDeleting) {
        // typing
        textElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;

        if (charIndex === currentText.length) {
          isDeleting = true;
          setTimeout(typeEffect, delayBetween);
          return;
        }
      } else {
        // deleting
        textElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;

        if (charIndex === 0) {
          isDeleting = false;
          textIndex = (textIndex + 1) % texts.length; // loop
        }
      }

      const speed = isDeleting ? deletingSpeed : typingSpeed;
      setTimeout(typeEffect, speed);
    }

    // Start each animation with a small delay so they don’t sync perfectly
    setTimeout(typeEffect, index * 500);
  });
})();






document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".ai-powered__messages");
  const allMessages = Array.from(document.querySelectorAll(".ai-powered__message"));
  const typingSpeed = 40;
  const delayBetween = 600;

  const messages = allMessages.reverse();
  let animationStarted = false;

  function typeMessage(index) {
    const msg = messages[index];
    const textEl = msg.querySelector(".ai-powered__message-text");
    const fullText = textEl.dataset.text;
    let charIndex = 0;

    const newMsg = msg.cloneNode(true);
    const newTextEl = newMsg.querySelector(".ai-powered__message-text");
    newTextEl.textContent = "";
    container.appendChild(newMsg);
    newMsg.classList.add("active");

    const interval = setInterval(() => {
      newTextEl.textContent = fullText.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === fullText.length) {
        clearInterval(interval);
        container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
        setTimeout(() => {
          if (index + 1 < messages.length) typeMessage(index + 1);
        }, delayBetween);
      }
    }, typingSpeed);
  }

  // 👇 Observer to trigger only when visible
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !animationStarted) {
        animationStarted = true;
        container.classList.add("visible");
        setTimeout(() => typeMessage(0), 1200); // wait for slide-up
      }
    });
  }, { threshold: 0.4 });

  observer.observe(container);
});





document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".ai-features__card");

  const handleScroll = () => {
    const viewportHeight = window.innerHeight;

    cards.forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      const nextCard = cards[index + 1];

      if (nextCard) {
        const nextRect = nextCard.getBoundingClientRect();

        if (nextRect.top < viewportHeight * 0.8) {
          const scaleDown = 1 - (1 - nextRect.top / (viewportHeight * 0.8)) * 0.5;
          card.style.transform = `scale(${scaleDown})`;
          card.style.opacity = `1`;
          card.style.zIndex = 1;
        } else {
          card.style.transform = `scale(1)`;
          card.style.opacity = `1`;
          card.style.zIndex = 2;
        }
      } else {
        card.style.transform = `scale(1)`;
        card.style.opacity = `1`;
      }
    });
  };

  window.addEventListener("scroll", handleScroll);
  handleScroll();
});






$(document).ready(function () {
  const autoplaySpeed = 4000; // 4 seconds
  const $slider = $(".product-features__slider");
  const $descriptions = $(".product-features__description");

  // Initialize Slick
  $slider.on("init", function (event, slick) {
    // Add progress bars to dots
    $(".slick-dots li").each(function () {
      $(this).append('<div class="progress-bar"></div>');
    });

    startProgressBar();
    updateActiveDescription(0); // set first description active
  });

  $slider.slick({
    dots: true,
    arrows: false,
    infinite: true,
    fade: true,
    autoplay: true,
    autoplaySpeed: autoplaySpeed,
    speed: 800,
    cssEase: "linear",
  });

  // Progress Bar Logic
  function startProgressBar() {
    let currentDot = $(".slick-dots li.slick-active .progress-bar");
    $(".progress-bar").css({ width: "0%" });
    currentDot.animate({ width: "100%" }, autoplaySpeed, "linear");
  }

  $slider.on("beforeChange", function () {
    $(".progress-bar").stop(true, true).css({ width: "0%" });
  });

  $slider.on("afterChange", function (event, slick, currentSlide) {
    startProgressBar();
    updateActiveDescription(currentSlide);
  });

  // ✅ Function to sync description with current slide
  function updateActiveDescription(index) {
    $descriptions.removeClass("active");
    $descriptions.eq(index).addClass("active");
  }
});





$(document).ready(function(){
  $('.testimonials__grid').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: true,
    arrows: false,
    dots: false,
    speed: 8000,              
    autoplay: true,
    autoplaySpeed: 0,         
    cssEase: 'linear',        
    pauseOnHover: false,
    pauseOnFocus: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1 }
      }
    ]
  });
});





// Accordion Toggle Logic
const faqItems = document.querySelectorAll('.ai-faq__item');

faqItems.forEach(item => {
  const btn = item.querySelector('.ai-faq__question');
  btn.addEventListener('click', () => {
    // Close others
    faqItems.forEach(i => {
      if (i !== item) i.classList.remove('ai-faq__item--active');
    });
    // Toggle current
    item.classList.toggle('ai-faq__item--active');
  });
});
