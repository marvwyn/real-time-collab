const socket = io();

// Join the room for the document
socket.emit('joinDocument', documentId);

// DOM elements
const titleInput = document.getElementById('title');
const contentTextarea = document.getElementById('documentContent');
const saveButton = document.getElementById('saveBtn');

// Listen for document updates from the server
socket.on('documentUpdated', (updatedContent) => {
  contentTextarea.value = updatedContent.content;
  titleInput.value = updatedContent.title;
});

// Save document to the server
saveButton.addEventListener('click', () => {
  const title = titleInput.value;
  const content = contentTextarea.value;

  // Emit document update event to the server
  socket.emit('updateDocument', { documentId, title, content });
});
