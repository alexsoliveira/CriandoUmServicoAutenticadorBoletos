document.getElementById('barcodeForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const dataVencimento = document.getElementById('dataVencimento').value;
    const valor = parseFloat(document.getElementById('valor').value);

    const response = await fetch('http://localhost:7002/api/barcode-generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ dataVencimento, valor })
    });

    if (response.ok) {
        const result = await response.json();
        const barcodeLabel = document.getElementById('barcodeLabel');
        barcodeLabel.textContent = `Código de Barras: ${result.barcode}`;
        document.getElementById('barcodeImage').src = `data:image/png;base64,${result.imagemBase64}`;
        document.getElementById('validateButton').disabled = false;
        barcodeLabel.style.color = ''; // Reset color
    } else {
        alert('Erro ao gerar o código de barras. Tente novamente.');
    }
});

document.getElementById('validateButton').addEventListener('click', async function () {
    const barcodeLabel = document.getElementById('barcodeLabel');
    const barcode = barcodeLabel.textContent.replace('Código de Barras: ', '');

    if (!barcode) {
        alert('Nenhum código de barras para validar.');
        return;
    }

    const response = await fetch('http://localhost:7179/api/barcode-validate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ barcode })
    });

    if (response.ok) {
        const result = await response.json();
        if (result.valido) {
            barcodeLabel.style.color = 'green';
            alert('Código de barras válido!');
        } else {
            barcodeLabel.style.color = 'red';
            alert('Código de barras inválido!');
        }
    } else {
        alert('Erro ao validar o código de barras. Tente novamente.');
    }
});
