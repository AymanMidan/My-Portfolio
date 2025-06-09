/**
 * Système de gestion des thèmes et palettes de couleurs
 * Permet de basculer entre mode clair/sombre et différentes palettes de couleurs
 */

// Initialisation des variables
let currentTheme = localStorage.getItem('theme') || 'dark';
let currentPalette = localStorage.getItem('palette') || 'blue';
const hourBasedTheme = localStorage.getItem('hourBasedTheme') === 'true';

// Fonction pour appliquer le thème et la palette
function applyThemeAndPalette() {
    document.documentElement.setAttribute('data-theme', currentTheme);
    document.documentElement.setAttribute('data-palette', currentPalette);
    
    // Mise à jour de l'état visuel des contrôles
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        if (currentTheme === 'light') {
            themeToggle.classList.add('light');
        } else {
            themeToggle.classList.remove('light');
        }
    }
    
    // Mise à jour des options de palette
    const paletteOptions = document.querySelectorAll('.palette-option');
    if (paletteOptions.length > 0) {
        paletteOptions.forEach(option => {
            const palette = option.getAttribute('data-palette');
            if (palette === currentPalette) {
                option.classList.add('active');
            } else {
                option.classList.remove('active');
            }
        });
    }
    
    // Ajouter une animation de transition
    document.body.classList.add('theme-transition');
    setTimeout(() => {
        document.body.classList.remove('theme-transition');
    }, 500);
}

// Fonction pour basculer entre les thèmes
function toggleTheme() {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', currentTheme);
    applyThemeAndPalette();
}

// Fonction pour changer de palette
function changePalette(palette) {
    currentPalette = palette;
    localStorage.setItem('palette', palette);
    applyThemeAndPalette();
}

// Fonction pour activer/désactiver le thème basé sur l'heure
function toggleHourBasedTheme() {
    hourBasedTheme = !hourBasedTheme;
    localStorage.setItem('hourBasedTheme', hourBasedTheme);
    
    if (hourBasedTheme) {
        setThemeBasedOnHour();
    }
    
    // Mise à jour visuelle du bouton
    const hourToggle = document.querySelector('.hour-toggle');
    if (hourToggle) {
        if (hourBasedTheme) {
            hourToggle.classList.add('active');
        } else {
            hourToggle.classList.remove('active');
        }
    }
}

// Fonction pour définir le thème en fonction de l'heure
function setThemeBasedOnHour() {
    if (!hourBasedTheme) return;
    
    const hour = new Date().getHours();
    
    // Matin (6h-12h): Palette bleue, thème clair
    if (hour >= 6 && hour < 12) {
        currentTheme = 'light';
        currentPalette = 'blue';
    }
    // Après-midi (12h-18h): Palette orange, thème clair
    else if (hour >= 12 && hour < 18) {
        currentTheme = 'light';
        currentPalette = 'orange';
    }
    // Soirée (18h-22h): Palette violette, thème sombre
    else if (hour >= 18 && hour < 22) {
        currentTheme = 'dark';
        currentPalette = 'purple';
    }
    // Nuit (22h-6h): Palette verte, thème sombre
    else {
        currentTheme = 'dark';
        currentPalette = 'green';
    }
    
    applyThemeAndPalette();
}

// Fonction pour créer les contrôles de thème
function createThemeControls() {
    // Création du conteneur principal
    const themeControls = document.createElement('div');
    themeControls.className = 'theme-controls';
    
    // Création du toggle pour le thème clair/sombre
    const themeToggle = document.createElement('div');
    themeToggle.className = 'theme-toggle';
    if (currentTheme === 'light') {
        themeToggle.classList.add('light');
    }
    themeToggle.title = 'Basculer entre mode clair et sombre';
    themeToggle.addEventListener('click', toggleTheme);
    
    // Création des options de palette
    const paletteOptions = document.createElement('div');
    paletteOptions.className = 'palette-options';
    
    const palettes = [
        { name: 'blue', color: '#007BFF' },
        { name: 'purple', color: '#8A2BE2' },
        { name: 'green', color: '#28a745' },
        { name: 'orange', color: '#fd7e14' }
    ];
    
    palettes.forEach(palette => {
        const option = document.createElement('div');
        option.className = 'palette-option palette-' + palette.name;
        option.setAttribute('data-palette', palette.name);
        option.style.backgroundColor = palette.color;
        option.title = 'Palette ' + palette.name;
        
        if (currentPalette === palette.name) {
            option.classList.add('active');
        }
        
        option.addEventListener('click', () => changePalette(palette.name));
        paletteOptions.appendChild(option);
    });
    
    // Création du toggle pour le thème basé sur l'heure
    const hourToggleContainer = document.createElement('div');
    hourToggleContainer.className = 'hour-toggle-container';
    hourToggleContainer.style.display = 'flex';
    hourToggleContainer.style.alignItems = 'center';
    hourToggleContainer.style.gap = '5px';
    
    const hourToggle = document.createElement('div');
    hourToggle.className = 'theme-toggle hour-toggle';
    if (hourBasedTheme) {
        hourToggle.classList.add('active');
    }
    hourToggle.title = 'Activer/désactiver le thème basé sur l\'heure';
    hourToggle.addEventListener('click', toggleHourBasedTheme);
    
    const hourLabel = document.createElement('span');
    hourLabel.textContent = 'Auto';
    hourLabel.style.fontSize = '12px';
    hourLabel.style.color = 'var(--text-primary)';
    
    hourToggleContainer.appendChild(hourToggle);
    hourToggleContainer.appendChild(hourLabel);
    
    // Assemblage des contrôles
    themeControls.appendChild(themeToggle);
    themeControls.appendChild(paletteOptions);
    themeControls.appendChild(hourToggleContainer);
    
    // Ajout au document
    document.body.appendChild(themeControls);
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    // Appliquer le thème et la palette
    applyThemeAndPalette();
    
    // Créer les contrôles de thème
    createThemeControls();
    
    // Si le thème basé sur l'heure est activé, l'appliquer
    if (hourBasedTheme) {
        setThemeBasedOnHour();
        
        // Mettre à jour le thème toutes les heures
        setInterval(setThemeBasedOnHour, 3600000); // 3600000 ms = 1 heure
    }
    
    // Easter egg dans la console
    console.log("%c👋 Salut recruteur !", "font-size: 24px; font-weight: bold; color: #007BFF;");
    console.log("%cRavi de te voir explorer mon code ! Tu as trouvé un easter egg.", "font-size: 16px; color: #28a745;");
    console.log("%cSi tu cherches un développeur passionné et attentif aux détails, tu es au bon endroit !", "font-size: 14px; color: #fd7e14;");
    console.log("%cN'hésite pas à explorer les autres fonctionnalités cachées du site...", "font-size: 14px; color: #8A2BE2;");
    console.log("%cIndice : essaie de trouver l'intrus dans la page des compétences 😉", "font-size: 14px; font-style: italic; color: #dc3545;");
});
