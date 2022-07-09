const BASE_URL = 'http://localhost:8080';
const fetchMyBooks = async () => {
  const user = JSON.parse(localStorage.getItem('user'));

  let response = await fetch(`${BASE_URL}/api/student/book/${user.id}`);
  let books = await response.json();
  const bookList = books?.data
    .map(
      (book) => `
      <tr class="text-gray-700 dark:text-gray-400">
      <td class="px-4 py-3">
        <div class="flex items-center text-sm">
          <!-- Avatar with inset shadow -->
          <div
            class="relative hidden w-8 h-8 mr-3 rounded-full md:block"
          >
            <img
              class="object-cover w-full h-full rounded-md"
              src="https://i.ibb.co/TkpfpW2/bk.png"
              alt=""
              loading="lazy"
            />
            <div
              class="absolute inset-0 rounded-full shadow-inner"
              aria-hidden="true"
            ></div>
          </div>
          <div>
            <p class="font-semibold">${book?.bookName}</p>
            <p class="text-xs text-gray-600 dark:text-gray-400">
              BKN-${book?.id}
            </p>
          </div>
        </div>
      </td>
      <td class="px-4 py-3 text-sm">Mr. ${book?.author}</td>

      <td class="px-4 py-3 text-sm">${new Date(
        book?.publishedYear
      ).toDateString()}</td>

      <td class="px-4 py-3 text-xs">
        <span
          class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100"
          style='text-transform:capitalize'
        >
        ${book?.status}</span>
        </span>
      </td>
    </tr>
`
    )
    .join('');
  const bookCount = books.data.length;
  document
    .querySelector('#mybook-table')
    .insertAdjacentHTML('afterbegin', bookList);
  document
    .querySelector('#mybook-count')
    .insertAdjacentHTML(
      'afterbegin',
      `  Showing ${bookCount} of ${bookCount} results`
    );
};

window.onload = fetchMyBooks;
