// Planet mapping for URL hash functionality
const planetMap = {
    'solanium': 'solanium',
    'ethereus': 'ethereus',
    'zano': 'zano',
    'ferrum': 'ferrum',
    'lumina': 'lumina',
    'titanox': 'titanox',
    'base': 'base',
    'voidara': 'voidara'
};

// Function to select a planet by ID
function selectPlanet(planetId) {
    const planetInput = document.getElementById(planetId);
    if (planetInput) {
        planetInput.checked = true;
    }
}

// Function to update URL hash when planet is selected
function updateHash(planetId) {
    window.location.hash = planetId;
}

// Add event listeners to all planet radio buttons
document.addEventListener('DOMContentLoaded', function() {
    // Add click event listeners to planet labels
    Object.keys(planetMap).forEach(planetId => {
        const planetLabel = document.querySelector(`label[for="${planetId}"]`);
        const planetInput = document.getElementById(planetId);

        if (planetLabel && planetInput) {
            planetLabel.addEventListener('click', function() {
                setTimeout(() => updateHash(planetId), 10);
            });

            planetInput.addEventListener('change', function() {
                if (this.checked) {
                    updateHash(planetId);
                }
            });
        }
    });

    // Handle initial page load with hash
    function handleHashChange() {
        const hash = window.location.hash.substring(1);
        if (hash && planetMap[hash]) {
            selectPlanet(hash);
        }
    }

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);

    // Handle initial load
    handleHashChange();
});
