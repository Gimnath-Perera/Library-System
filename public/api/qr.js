function generateQRCode() {
  let book = document.getElementById('book').value;
  console.log('>>===>> >>===>> book', book);

  let qrcodeContainer = document.getElementById('qrcode');
  qrcodeContainer.innerHTML = '';
  new QRCode(qrcodeContainer, book);

  document.getElementById('qrcode-container').style.display = 'block';
}
