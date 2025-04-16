document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll("section[id]");
  
  window.addEventListener("scroll", navHighlighter);
  
  function navHighlighter() {
    let scrollY = window.pageYOffset;
    
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute("id");
      
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        document.querySelector(".nav-links a[href*=" + sectionId + "]").classList.add("active");
      } else {
        document.querySelector(".nav-links a[href*=" + sectionId + "]").classList.remove("active");
      }
    });
  }
  
  const cards = document.querySelectorAll('.experience-card, .project-card, .skill-card');
  
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });
  
  cards.forEach(card => {
    card.style.opacity = 0;
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
  });

  const WORKER_URL = 'https://guestbook-worker.ericvla2468.workers.dev/api/comments';

  async function fetchComments() {
    const response = await fetch(WORKER_URL);
    const comments = await response.json();
    document.getElementById('comments').innerHTML = comments.map(
      c => `<div class="comment"><strong>${c.author}</strong>: ${c.content}<small>${new Date(c.created_at).toLocaleString()}</small></div>`
    ).join('');
  }

  async function addComment(event) {
    event.preventDefault();
    const author = document.getElementById('author').value;
    const content = document.getElementById('content').value;
    const button = document.querySelector('#comment-form button');

    button.disabled = true;
    button.textContent = 'Submitting...';

    try {
      await fetch(WORKER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ author, content }),
      });

      document.getElementById('author').value = '';
      document.getElementById('content').value = '';
      button.textContent = 'Add Comment';
      button.disabled = false;
      fetchComments();
    } catch (error) {
      button.textContent = 'Add Comment';
      button.disabled = false;
      alert('There was an error submitting your comment. Please try again.');
    }
  }

  document.getElementById('comment-form').addEventListener('submit', addComment);
  fetchComments();
});