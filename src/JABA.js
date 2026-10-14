const projects = [
    {
        title: "Portafolio de Arquitectura 2024",
        author: "Arq. Mauricio Ruiz Morales",
        category: "Portafolio PDF",
        description: "Vista previa del portafolio completo de proyectos.",
        pdf: "PDF´S/MUESTRA Portafolio Arq. Mauricio Ruiz 2024.pdf"
    }
];

        // === RENDERIZAR PROYECTOS ===
        function renderProjects() {
            const grid = document.getElementById('projectsGrid');
            if (!grid) return;

            grid.innerHTML = projects.map((p) => `
                <article class="project-card fade-in${p.pdf ? ' project-card--pdf' : ''}">
                    ${p.pdf
                        ? `<iframe class="project-pdf-preview" src="${p.pdf}#view=FitH" title="Vista previa de ${p.title}" loading="lazy"></iframe>`
                        : `<div class="project-image">${p.icon}</div>`}
                    <div class="project-body">
                        <span class="project-category">${p.category}</span>
                        <h3>${p.title}</h3>
                        <p>${p.description}</p>
                        ${p.pdf
                            ? `<a class="project-pdf-link" href="${p.pdf}" target="_blank" rel="noopener">Abrir PDF completo</a>`
                            : `<div class="project-meta">
                                <span>${p.author}</span>
                                <span>
                                    <span class="stars">${'★'.repeat(Math.round(p.rating))}${'☆'.repeat(5 - Math.round(p.rating))}</span>
                                    ${p.rating.toFixed(1)} (${p.votes})
                                </span>
                            </div>`}
                    </div>
                </article>
            `).join('');

            observeFadeIns();
        }

        // === PUNTUACIÓN ===
        let currentRating = 0;
        let totalVotes = 0;
        let sumRatings = 0;

        const stars = document.querySelectorAll('#ratingStars span');
        const ratingValue = document.getElementById('ratingValue');

        stars.forEach(star => {
            star.addEventListener('click', function() {
                const value = parseInt(this.dataset.value);
                currentRating = value;
                totalVotes++;
                sumRatings += value;

                // Actualizar estrellas visuales
                stars.forEach((s, i) => {
                    s.classList.toggle('active', i < value);
                });

                // Actualizar promedio
                const avg = (sumRatings / totalVotes).toFixed(1);
                ratingValue.textContent = avg;

                // Actualizar contador de votos
                this.parentElement.parentElement.querySelector('span:last-child').textContent = `(${totalVotes} votos)`;

                // Animación de confirmación
                this.style.transform = 'scale(1.3)';
                setTimeout(() => { this.style.transform = 'scale(1)'; }, 200);
            });

            // Hover effect
            star.addEventListener('mouseenter', function() {
                const value = parseInt(this.dataset.value);
                stars.forEach((s, i) => {
                    s.style.color = i < value ? '#f0b429' : '#ddd';
                });
            });

            star.addEventListener('mouseleave', function() {
                stars.forEach((s, i) => {
                    s.style.color = i < currentRating ? '#f0b429' : '#ddd';
                });
            });
        });

        

        // === UTILIDADES ===
        function escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }

        // === ANIMACIONES FADE-IN ===
        function observeFadeIns() {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, { threshold: 0.1 });

            document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
        }

        // === INICIALIZACIÓN ===
        document.addEventListener('DOMContentLoaded', () => {
            renderProjects();
            observeFadeIns();
        });