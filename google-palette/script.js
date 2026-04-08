const palettes = [
    {
        title: "NeurIPS Deep Learning",
        desc: "High-tech teals and deep purples, perfect for neural network architectures.",
        colors: ["#231123", "#4A1942", "#893168", "#05D5FF", "#0A85A8", "#073B4C"]
    },
    {
        title: "CVPR Object Detection",
        desc: "Vibrant, distinct colors for bounding boxes and segmentation masks.",
        colors: ["#FF2A6D", "#05D9E8", "#FFC200", "#7B2CBF", "#01BAEF", "#FF8600"]
    },
    {
        title: "IEEE Trust",
        desc: "Formal and readable slate blues for statistical charts and bar graphs.",
        colors: ["#0F2537", "#1D3F5E", "#346288", "#5A8CAE", "#8BB1C9", "#BDD4E0"]
    },
    {
        title: "Matplotlib Viridis (Soft)",
        desc: "Perceptually uniform colormap, widely used in Python data science.",
        colors: ["#440154", "#414487", "#2A788E", "#22A884", "#7AD151", "#FDE725"]
    },
    {
        title: "ACM SIGGRAPH Gradient",
        desc: "Modern and creative tones for computer graphics and rendering papers.",
        colors: ["#1B263B", "#415A77", "#778DA9", "#E0E1DD", "#E63946", "#F1FAEE"]
    },
    {
        title: "Dark Mode Code Syntax",
        desc: "Editor-inspired palette for visualizing code structures or syntax trees.",
        colors: ["#282C34", "#E06C75", "#98C379", "#E5C07B", "#61AFEF", "#C678DD"]
    }
];

const grid = document.getElementById('palette-grid');
const snackbar = document.getElementById('snackbar');
let snackbarTimeout;

function getContrastYIQ(hexcolor){
    hexcolor = hexcolor.replace("#", "");
    if (hexcolor.length === 3) {
        hexcolor = hexcolor.split('').map(c => c + c).join('');
    }
    const r = parseInt(hexcolor.substr(0,2),16);
    const g = parseInt(hexcolor.substr(2,2),16);
    const b = parseInt(hexcolor.substr(4,2),16);
    const yiq = ((r*299)+(g*587)+(b*114))/1000;
    return (yiq >= 128) ? 'dark' : 'light';
}

function showSnackbar(message) {
    snackbar.textContent = message;
    snackbar.classList.add('show');
    clearTimeout(snackbarTimeout);
    snackbarTimeout = setTimeout(() => {
        snackbar.classList.remove('show');
    }, 3000);
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showSnackbar(`Color ${text} copied to clipboard`);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

function renderPalettes() {
    grid.innerHTML = '';
    palettes.forEach(palette => {
        const card = document.createElement('div');
        card.className = 'card';

        const content = document.createElement('div');
        content.className = 'card-content';
        
        content.innerHTML = `
            <h2 class="card-title google-sans">${palette.title}</h2>
            <p class="card-desc">${palette.desc}</p>
        `;

        const colorRow = document.createElement('div');
        colorRow.className = 'color-row';

        const colorChips = document.createElement('div');
        colorChips.className = 'color-chips';

        palette.colors.forEach((color) => {
            const block = document.createElement('div');
            block.className = 'color-block';
            block.style.backgroundColor = color;
            block.title = color;
            
            if (getContrastYIQ(color) === 'dark') {
                block.classList.add('light-text');
            }

            block.addEventListener('click', () => copyToClipboard(color));
            colorRow.appendChild(block);

            const chip = document.createElement('div');
            chip.className = 'chip';
            chip.textContent = color;
            chip.addEventListener('click', () => copyToClipboard(color));
            colorChips.appendChild(chip);
        });

        content.appendChild(colorRow);
        content.appendChild(colorChips);
        card.appendChild(content);
        grid.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', renderPalettes);