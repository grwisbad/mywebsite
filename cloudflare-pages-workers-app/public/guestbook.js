document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('guestbook-form');
    const messagesDiv = document.getElementById('guestbook-messages');

    async function loadMessages() {
        const res = await fetch('/api/guestbook');
        const data = await res.json();
        messagesDiv.innerHTML = '';
        data.messages.forEach(msg => {
            const div = document.createElement('div');
            div.className = 'guestbook-message';
            div.innerHTML = `<span class="name">${msg.name}</span>
                <span class="date">${new Date(msg.created_at).toLocaleString()}</span>
                <div>${msg.message}</div>`;
            messagesDiv.appendChild(div);
        });
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('guest-name').value.trim();
        const message = document.getElementById('guest-message').value.trim();
        if (!name || !message) return;
        await fetch('/api/guestbook', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ name, message })
        });
        form.reset();
        loadMessages();
    });

    loadMessages();
});