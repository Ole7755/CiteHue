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
const toast = document.getElementById('toast');
let toastTimeout;

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

function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
        toast.classList.remove('show');
    }, 2500);
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast(`Copied ${text}`);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

function renderPalettes() {
    grid.innerHTML = '';
    palettes.forEach(palette => {
        const card = document.createElement('div');
        card.className = 'palette-card';

        const header = document.createElement('div');
        header.className = 'palette-header';
        header.innerHTML = `
            <h2 class="palette-title">${palette.title}</h2>
            <p class="palette-desc">${palette.desc}</p>
        `;

        const colorsContainer = document.createElement('div');
        colorsContainer.className = 'colors-container';

        const codesContainer = document.createElement('div');
        codesContainer.className = 'color-codes';

        palette.colors.forEach((color, index) => {
            const block = document.createElement('div');
            block.className = 'color-block';
            block.style.backgroundColor = color;
            
            if (getContrastYIQ(color) === 'dark') {
                block.classList.add('light-text');
            }

            block.addEventListener('click', () => copyToClipboard(color));
            colorsContainer.appendChild(block);

            if (index === 0 || index === palette.colors.length - 1) {
                const codeSpan = document.createElement('span');
                codeSpan.textContent = color;
                codeSpan.addEventListener('click', () => copyToClipboard(color));
                codesContainer.appendChild(codeSpan);
            } else if (index === 1 && palette.colors.length > 2) {
                 if (!codesContainer.querySelector('.ellipsis')) {
                     const dotSpan = document.createElement('span');
                     dotSpan.className = 'ellipsis';
                     dotSpan.textContent = '...';
                     dotSpan.style.cursor = 'default';
                     codesContainer.appendChild(dotSpan);
                 }
            }
        });

        card.appendChild(header);
        card.appendChild(colorsContainer);
        card.appendChild(codesContainer);
        grid.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', renderPalettes);