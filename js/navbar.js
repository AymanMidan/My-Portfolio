// Fichier: js/navbar.js
document.addEventListener("DOMContentLoaded", function() {
    // On utilise Fetch API pour récupérer le composant
    fetch('navbar.html')
    .then(response => response.text())
    .then(data => {
        // Injection du HTML dans le placeholder
        document.getElementById('navbar-placeholder').innerHTML = data;
        
        // Logique pour mettre la bonne page en surbrillance (classe 'active')
        const currentPath = window.location.pathname.split("/").pop();
        const navLinks = document.querySelectorAll("#dynamicNavLinks .nav-link");
        
        navLinks.forEach(link => {
            const linkHref = link.getAttribute("href");
            // Si le lien correspond à la page actuelle, ou si on est à la racine et que le lien est index.html
            if (linkHref === currentPath || (currentPath === "" && linkHref === "index.html")) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });
    })
    .catch(error => console.error('Erreur lors du chargement de la navbar:', error));
});