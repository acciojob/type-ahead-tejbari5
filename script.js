//your JS code here. If required.
const typeaheadInput = document.querySelector('#typeahead');
const suggestionsList = document.querySelector('#suggestions-list');

let timeoutId;

// Helper function to clear the suggestions list
function clearSuggestions() {
  suggestionsList.innerHTML = '';
}

// Helper function to handle API response
function handleApiResponse(data) {
  // Clear any previously displayed suggestions
  clearSuggestions();

  // Create list items for each suggestion
  for (let suggestion of data) {
    const li = document.createElement('li');
    li.textContent = suggestion;
    suggestionsList.appendChild(li);
  }
}

// Function to make API request
function getSuggestions(query) {
  const url = `https://api.frontendexpert.io/api/fe/glossary-suggestions?text=${query}`;
  fetch(url)
    .then(response => response.json())
    .then(data => handleApiResponse(data))
    .catch(error => console.error(error));
}

// Event listener for typing into the typeahead input field
typeaheadInput.addEventListener('input', () => {
  // Clear any previous timeout
  clearTimeout(timeoutId);

  // Start new timeout to make API request after 500ms of no typing
  timeoutId = setTimeout(() => {
    const query = typeaheadInput.value.trim();
    if (query !== '') {
      getSuggestions(query);
    } else {
      clearSuggestions();
    }
  }, 500);
});

// Event listener for clicking on a suggestion
suggestionsList.addEventListener('click', (event) => {
  const clickedListItem = event.target;
  typeaheadInput.value = clickedListItem.textContent;
  clearSuggestions();
});