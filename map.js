/* =========================================
   1. THE DATA (Edit this to add depts)
   ========================================= */
const locations = [
    {
        id: 1,
        name: "Main Auditorium",
        type: "attraction", // 'attraction' or 'stair'
        x: 22.5,  // % from left
        y: 84.0,  // % from top
        attraction: "Inaugural Ceremony",
        stairs: "Ramps at main entry"
    },
    {
        id: 2,
        name: "Physics Block",
        type: "attraction",
        x: 65.2,
        y: 78.5,
        attraction: "Tesla Coil Demo",
        stairs: "Spiral stairs near Zoology junction"
    },
    {
        id: 3,
        name: "Central Circle",
        type: "attraction",
        x: 54.0,
        y: 45.0,
        attraction: "Meeting Point / Help Desk",
        stairs: "N/A"
    },
    // Add your new generated coordinates here...
];

/* =========================================
   2. THE LOGIC (Don't need to touch this)
   ========================================= */
const mapContainer = document.getElementById('map-container');
const pinsLayer = document.getElementById('pins-layer');
const infoCard = document.getElementById('info-card');

// Function to Render Pins
function renderPins() {
    pinsLayer.innerHTML = ''; // Clear existing
    locations.forEach(loc => {
        const pin = document.createElement('div');
        pin.className = loc.type === 'stair' ? 'pin stair-pin' : 'pin';
        
        // Set Position (Percentage based for responsiveness)
        pin.style.left = loc.x + '%';
        pin.style.top = loc.y + '%';
        
        // Click Event
        pin.onclick = (e) => {
            e.stopPropagation(); // Prevent map click
            showCard(loc);
        };
        
        pinsLayer.appendChild(pin);
    });
}

// Function to Show Info Card
function showCard(data) {
    document.getElementById('card-title').innerText = data.name;
    document.getElementById('card-attraction').innerText = data.attraction;
    document.getElementById('card-stairs').innerText = data.stairs;
    infoCard.classList.remove('hidden');
}

// Close Card Logic
document.getElementById('close-card').onclick = () => infoCard.classList.add('hidden');
mapContainer.onclick = () => infoCard.classList.add('hidden'); // Click map to close

/* =========================================
   3. DEVELOPER TOOL (Coordinate Finder)
   ========================================= */
const debugMode = document.getElementById('debugMode');

mapContainer.addEventListener('click', function(e) {
    if (!debugMode.checked) return;

    // Calculate percentage coordinates
    const rect = mapContainer.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    // Format for copy-pasting
    const output = `
    {
        name: "NEW DEPT",
        x: ${x.toFixed(1)},
        y: ${y.toFixed(1)},
        attraction: "...",
        stairs: "..."
    },`;

    console.log(output);
    alert(`Copied to Console!\nX: ${x.toFixed(1)}%, Y: ${y.toFixed(1)}%`);
});

// Start the engine
renderPins();
