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
        document.getElementById('barcodeLabel').textContent = `Código de Barras: ${result.barcode}`;
        document.getElementById('barcodeImage').src = `data:image/png;base64,${result.imagemBase64}`;
    } else {
        alert('Erro ao gerar o código de barras. Tente novamente.');
    }
});
