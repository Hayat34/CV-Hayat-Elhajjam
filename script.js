/* =========================================================
   JS léger pour animer chaque .fade-in à l’entrée dans le
   viewport & ajouter un décalage progressif.
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {

  // 1️⃣  Sélection de tous les éléments à animer
  const items = document.querySelectorAll('.fade-in');

  // 2️⃣  Création d’un IntersectionObserver (supporté Edge 15+, Firefox 55+…)
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');   // déclenche l’animation CSS
          observer.unobserve(entry.target);        // stoppe l’observation une fois visible
        }
      });
    },
    {threshold:0.15}  // élément considéré « visible » dès 15 % d’apparition
  );

  // 3️⃣  On attache l’observer à chaque élément et on définit un délai perso
  items.forEach((el, idx) => {
    el.style.transitionDelay = `${idx * 0.08}s`;   // décalage progressif
    observer.observe(el);
  });

  // 4️⃣  (option sympa) Copier le N° de téléphone au clic
  const telLink = document.querySelector('a[href^="tel:"]');
  telLink?.addEventListener('click', e => {
    e.preventDefault();
    navigator.clipboard.writeText('06 67 83 68 98').then(()=>{
      alert('📋 Numéro copié dans le presse-papier !');
    });
  });
});
