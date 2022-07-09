const BASE_URL = 'http://localhost:8080';

const generateQRCode = () => {
  let book = document.getElementById('book-list').value;

  let qrcodeContainer = document.getElementById('qrcode');
  qrcodeContainer.innerHTML = '';
  new QRCode(qrcodeContainer, book);

  document.getElementById('qrcode-base').style.display = 'flex';
  document.getElementById('qrcode-container').style.display = 'block';
};

const fetchBookList = async () => {
  try {
    let response = await fetch(`${BASE_URL}/api/admin/book`);
    let books = await response.json();

    const bookList = books?.data
      .map(
        ({ bookName, id, author }) => `
        <option value="${id}">${bookName} by ${author}</option>
        `
      )
      .join('');

    document
      .querySelector('#book-list')
      .insertAdjacentHTML('afterbegin', bookList);
  } catch (err) {
    console.log(err);
  }
};

window.onload = fetchBookList;
