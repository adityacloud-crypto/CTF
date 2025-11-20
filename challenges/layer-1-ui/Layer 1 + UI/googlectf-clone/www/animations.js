// Enhanced animations for Google CTF clone

document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================
  // ANIMATED PIXEL BLOCKS (PICKLES)
  // ==========================================
  const decorations = document.querySelector('#pixelDecorations');
  if (decorations) {
    // Add more random floating pixel blocks
    for (let i = 0; i < 8; i++) {
      setTimeout(() => {
        const block = document.createElement('div');
        block.className = 'pixel-block floating';
        
        // Random colors
        const colorChoice = Math.random();
        if (colorChoice > 0.6) block.classList.add('green');
        else if (colorChoice > 0.3) block.classList.add('gray');
        
        // Random positioning
        block.style.top = Math.random() * 80 + 10 + '%';
        block.style.left = Math.random() * 80 + 10 + '%';
        
        // Random size
        const size = 60 + Math.random() * 40;
        block.style.width = size + 'px';
        block.style.height = size + 'px';
        
        // Random animation delay
        block.style.animationDelay = Math.random() * 3 + 's';
        
        decorations.appendChild(block);
      }, i * 200);
    }
  }
  
  // ==========================================
  // COUNTER ANIMATION
  // ==========================================
  const counters = document.querySelectorAll('.counter');
  counters.forEach(counter => {
    const target = parseInt(counter.getAttribute('data-target'));
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60 FPS
    let current = 0;
    
    const updateCounter = () => {
      current += increment;
      if (current < target) {
        counter.textContent = Math.floor(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
      }
    };
    
    // Start animation after a short delay
    setTimeout(updateCounter, 500);
  });
  
  // ==========================================
  // CURRENT TIME UPDATE
  // ==========================================
  const timeElement = document.getElementById('currentTime');
  if (timeElement) {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      const displayHours = hours % 12 || 12;
      const month = (now.getMonth() + 1).toString().padStart(2, '0');
      const day = now.getDate().toString().padStart(2, '0');
      const year = now.getFullYear().toString().slice(-2);
      
      timeElement.textContent = `${displayHours}:${minutes} ${ampm} ${month}/${day}/${year}`;
    };
    
    updateTime();
    setInterval(updateTime, 1000);
  }
  
  // ==========================================
  // GLITCH EFFECT ON TITLE
  // ==========================================
  const title = document.querySelector('.pixel-title');
  if (title) {
    // Random glitch effect every 10-15 seconds
    const randomGlitch = () => {
      title.style.animation = 'glitchTitle 0.5s ease-in-out';
      setTimeout(() => {
        title.style.animation = '';
      }, 500);
      
      // Schedule next glitch
      setTimeout(randomGlitch, (10 + Math.random() * 5) * 1000);
    };
    
    setTimeout(randomGlitch, 5000);
  }
  
  // ==========================================
  // INTERACTIVE CARD ANIMATIONS
  // ==========================================
  const cards = document.querySelectorAll('.faq-card, .challenge-card, .rule-item');
  cards.forEach((card, index) => {
    // Fade in animation
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      card.style.transition = 'opacity 0.5s, transform 0.5s';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 100 * index);
  });
  
  // ==========================================
  // PARALLAX EFFECT FOR BACKGROUND
  // ==========================================
  let mouseX = 0;
  let mouseY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX / window.innerWidth - 0.5;
    mouseY = e.clientY / window.innerHeight - 0.5;
  });
  
  const animateParallax = () => {
    const decorationBlocks = document.querySelectorAll('.pixel-block.floating');
    decorationBlocks.forEach((block, index) => {
      const speed = (index % 3 + 1) * 10;
      const x = mouseX * speed;
      const y = mouseY * speed;
      
      block.style.transform = `translate(${x}px, ${y}px)`;
    });
    
    requestAnimationFrame(animateParallax);
  };
  
  animateParallax();
  
  // ==========================================
  // FLAG ANIMATION INTERACTION
  // ==========================================
  const flag = document.querySelector('.animated-flag');
  if (flag) {
    flag.addEventListener('click', () => {
      flag.style.animation = 'none';
      setTimeout(() => {
        flag.style.animation = 'flagWave 3s ease-in-out infinite';
      }, 10);
    });
  }
  
  // ==========================================
  // BUTTON HOVER SOUND EFFECT (VISUAL)
  // ==========================================
  const buttons = document.querySelectorAll('.pixel-button');
  buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
      button.style.transform = 'translate(-2px, -2px)';
      button.style.boxShadow = '8px 8px 0 rgba(0,0,0,0.3)';
    });
    
    button.addEventListener('mouseleave', () => {
      button.style.transform = '';
      button.style.boxShadow = '';
    });
  });
  
  // ==========================================
  // CONSOLE EASTER EGGS
  // ==========================================
  console.log('%c> System Initialized', 'color: #9aff00; font-family: monospace; font-size: 16px; font-weight: bold;');
  console.log('%c> Welcome to HackWithIndia CTF', 'color: #000; font-family: monospace; font-size: 14px;');
  console.log('%c> Good luck, hacker!', 'color: #666; font-family: monospace; font-size: 12px;');
  console.log('%c> Hint: Sometimes the best flags are hidden in plain sight...', 'color: #9aff00; font-family: monospace; font-size: 10px; font-style: italic;');
  
  // ASCII Art in console
  console.log(`
    ⠀⠀⠀⠀⠀⠀⢀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⣀⠀⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⡇⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⠀⠀⠀CAPTURE THE FLAG⠀⣿⣿⣿⣿⡇⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⡇⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀
    ⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
  `);
  
  // ==========================================
  // PAGE TRANSITION EFFECTS
  // ==========================================
  const links = document.querySelectorAll('a:not([target="_blank"])');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      if (link.hostname === window.location.hostname) {
        e.preventDefault();
        
        document.body.style.transition = 'opacity 0.3s';
        document.body.style.opacity = '0';
        
        setTimeout(() => {
          window.location.href = link.href;
        }, 300);
      }
    });
  });
  
  // Fade in on page load
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s';
    document.body.style.opacity = '1';
  }, 100);
  
});
