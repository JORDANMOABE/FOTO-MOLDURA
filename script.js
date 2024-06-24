document.getElementById('upload').addEventListener('change', handleImages, false);
document.getElementById('apply-frame').addEventListener('click', applyFrame);
document.getElementById('download-all').addEventListener('click', downloadAllImages);

function handleImages(event) {
    const files = event.target.files;
    const previewSection = document.getElementById('preview-section');
    const errorMessage = document.getElementById('error-message');
    const applyFrameButton = document.getElementById('apply-frame');
    previewSection.innerHTML = '';
    errorMessage.style.display = 'none';

    if (!files.length) {
        return;
    }

    Array.from(files).forEach(file => {
        if (!file.type.startsWith('image/')) {
            errorMessage.textContent = 'Por favor, faça upload de arquivos de imagem válidos.';
            errorMessage.style.display = 'block';
            return;
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.src = e.target.result;
            img.classList.add('preview-img');
            img.onload = function() {
                const previewContainer = document.createElement('div');
                previewContainer.classList.add('preview-container');
                previewContainer.appendChild(img);
                previewSection.appendChild(previewContainer);
            };
        };
        reader.readAsDataURL(file);
    });

    applyFrameButton.style.display = 'inline-block';
}

function applyFrame() {
    const previewSection = document.getElementById('preview-section');
    const downloadAllButton = document.getElementById('download-all');
    const images = previewSection.getElementsByTagName('img');
    const frame = new Image();
    frame.src = 'moldura.png'; // Certifique-se de que o arquivo 'moldura.png' está na mesma pasta

    frame.onload = function() {
        Array.from(images).forEach(img => {
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.width = img.naturalWidth;
            canvas.height = img.naturalHeight;
            context.drawImage(img, 0, 0);
            context.drawImage(frame, 0, 0, img.naturalWidth, img.naturalHeight);

            img.style.display = 'none';
            img.parentElement.appendChild(canvas);
        });
        downloadAllButton.style.display = 'inline-block';
    };
}

function downloadAllImages() {
    const previewSection = document.getElementById('preview-section');
    const canvases = previewSection.getElementsByTagName('canvas');
    Array.from(canvases).forEach((canvas, index) => {
        const link = document.createElement('a');
        link.download = `foto-com-moldura-${index + 1}.png`;
        link.href = canvas.toDataURL();
        link.click();
    });
}
