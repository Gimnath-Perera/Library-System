const BASE_URL = 'http://localhost:8080';
const fetchDashBoardData = async () => {
  let response = await fetch(`${BASE_URL}/api/admin/book`);
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
        book?.createdAt
      ).toDateString()}</td>
      <td class="px-4 py-3 text-xs">
        <span
          class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100"
          style='text-transform:capitalize'
        >
        ${book?.status}</span>
        </span>
      </td>
      <td class="px-4 py-3">
        <div class="flex items-center space-x-4 text-sm">
          <button
            class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
            aria-label="Edit"
          >
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
              ></path>
            </svg>
          </button>
          <button
            class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-red-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
            aria-label="Delete"
          >
            <svg
              class="w-5 h-5"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </td>
    </tr>
`
    )
    .join('');
  const bookCount = books.data.length;
  document
    .querySelector('#booking-table')
    .insertAdjacentHTML('afterbegin', bookList);
  document
    .querySelector('#booking-count')
    .insertAdjacentHTML(
      'afterbegin',
      `  Showing ${bookCount} of ${bookCount} results`
    );
  let studentResponse = await fetch(`${BASE_URL}/api/admin/student`);
  let students = await studentResponse.json();

  const studentCount = students.data.length;
  const issuedBookCount = books?.data?.filter(
    (book) => book.status === 'issued'
  ).length;
  const availableBookCount = books?.data?.filter(
    (book) => book.status === 'available'
  ).length;

  document
    .querySelector('#total-students')
    .insertAdjacentHTML('afterbegin', studentCount);
  document
    .querySelector('#total-books')
    .insertAdjacentHTML('afterbegin', bookCount);
  document
    .querySelector('#issued-books')
    .insertAdjacentHTML('afterbegin', issuedBookCount);
  document
    .querySelector('#available-books')
    .insertAdjacentHTML('afterbegin', availableBookCount);
};

const onBookSubmit = async () => {
  var formData = readFormData();
  console.log('>>===>> >>===>> formData', formData);
};

const readFormData = () => {
  var formData = {};
  formData['bookName'] = document.getElementById('bookName').value;
  formData['author'] = document.getElementById('author').value;
  formData['publishedYear'] = document.getElementById('publishedYear').value;
  formData['description'] = document.getElementById('description').value;
  formData['status'] = document.getElementById('status').value;
  formData['image'] = document.getElementById('image').value;
  return formData;
};

window.onload = fetchDashBoardData;
