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

  //Comment Section Logic
  const WORKER_URL = 'https://guestbook-worker.ericvla2468.workers.dev/api/comments';

  async function fetchComments() {
    const response = await fetch(WORKER_URL);
    const comments = await response.json();
    const commentsSection = document.getElementById('comments');
    commentsSection.innerHTML = comments.map(comment => `
      <div class="comment">
        <p><strong>${comment.author}</strong>: ${comment.content}</p>
        <small>${new Date(comment.created_at).toLocaleString()}</small>
      </div>
    `).join('');
  }

  async function addComment(event) {
    event.preventDefault();
    const author = document.getElementById('author').value;
    const content = document.getElementById('content').value;

    await fetch(WORKER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ author, content }),
    });

    document.getElementById('author').value = '';
    document.getElementById('content').value = '';
    fetchComments();
  }

  document.getElementById('comment-form').addEventListener('submit', addComment);
  fetchComments();
});