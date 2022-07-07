const BASE_URL = 'http://localhost:8080';
const fetchBooks = async () => {
  let response = await fetch(`${BASE_URL}/api/admin/book`);
  let books = await response.json();
  const bookList = books?.data
    .map(
      (book) => `
  <div
    class="max-w-xs p-6 rounded-md shadow-md dark:bg-gray-900 dark:text-gray-50"
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

window.onload = fetchBooks;
