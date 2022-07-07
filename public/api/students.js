const BASE_URL = 'http://localhost:8080';
const fetchBooks = async () => {
  let response = await fetch(`${BASE_URL}/api/admin/student`);
  let students = await response.json();
  const studentList = students?.data
    .map(
      (student) => `
      <tr class="text-gray-700 dark:text-gray-400">
      <td class="px-4 py-3">
        <div class="flex items-center text-sm">
          <!-- Avatar with inset shadow -->
          <div
            class="relative hidden w-8 h-8 mr-3 rounded-lg md:block"
          >
            <img
              class="object-cover w-full h-full rounded-lg"
              src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=200&fit=max&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
              alt=""
              loading="lazy"
            />
            <div
              class="absolute inset-0 rounded-full shadow-inner"
              aria-hidden="true"
            ></div>
          </div>
          <div>
            <p class="font-semibold">${student?.fullName}</p>
            <p class="text-xs text-gray-600 dark:text-gray-400">
              ${student?.level}
            </p>
          </div>
        </div>
      </td>
      <td class="px-4 py-3 text-sm">${student?.email}</td>

      <td class="px-4 py-3 text-sm">
      ${student?.address}
      </td>
      <td class="px-4 py-3 text-sm">${new Date(
        student?.createdAt
      ).toDateString()}</td>
      <td class="px-4 py-3 text-xs">
        <span
          class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100"
          style='text-transform:capitalize'
        >
         ${student?.status}
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

  const studentCount = students.data.length;
  document
    .querySelector('#student-table')
    .insertAdjacentHTML('afterbegin', studentList);
  document
    .querySelector('#student-count')
    .insertAdjacentHTML(
      'afterbegin',
      `  Showing ${studentCount} of ${studentCount} results`
    );
};

window.onload = fetchBooks;
