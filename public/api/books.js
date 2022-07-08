const BASE_URL = 'http://localhost:8080';
const fetchBooks = async () => {
  let response = await fetch(`${BASE_URL}/api/admin/book`);
  let books = await response.json();

  let availableBooks = books.data.filter((book) => book.status === 'Available');
  const bookList = availableBooks
    .map(
      (book) => `
  <div
    class="max-w-xs p-6 rounded-md shadow-md dark:bg-gray-900 dark:text-gray-50"
    style='cursor:pointer;'
    onclick='handleBookSelection(${book?.id});'
  >
    <img
      src=${book?.image}
      alt="book-img"
      class="object-cover object-center w-full rounded-md h-72 dark:bg-gray-500"
    />
    <div class="mt-6 mb-2">
      <span
        class="block text-xs font-medium tracking-widest uppercase dark:text-violet-400"
      >
        BKN-${book?.id}
      </span>
      <h2 class="text-xl font-semibold tracking-wide">
        ${book?.bookName}
      </h2>
    </div>
    <p class="dark:text-gray-100">
      Mauris et lorem at elit tristique dignissim et ullamcorper
      elit. In sed feugiat mi. Etiam ut lacinia dui.
    </p>
  </div>
`
    )
    .join('');

  document
    .querySelector('#book-container')
    .insertAdjacentHTML('afterbegin', bookList);
};

const handleBookSelection = async (bookId) => {
  const userResponse = confirm('Do you want to borrow this book?');
  const user = JSON.parse(localStorage.getItem('user'));
  if (!userResponse) return;

  const payload = {
    student: user?.id,
    book: bookId,
  };
  const response = await fetch(`${BASE_URL}/api/admin/booking`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const result = await response.json();
  window.location.reload();
};

window.onload = fetchBooks;
