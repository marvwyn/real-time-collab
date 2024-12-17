let ioInstance;

// Initialize Socket.IO and listen for events
export const initializeSocket = (io) => {
  ioInstance = io;

  io.on('connection', (socket) => {
    console.log(`New client connected: ${socket.id}`);

    // Join a document room
    socket.on('joinDocument', (documentId) => {
      socket.join(documentId);
      console.log(`Socket ${socket.id} joined document room: ${documentId}`);
    });

    // Listen for document updates from clients and broadcast it
    socket.on('documentUpdate', async (data) => {
      const { documentId, content } = data;

      try {
        // Update the document in the database
        await Document.findByIdAndUpdate(documentId, { content });

        // Emit the updated document to all clients in the room
        io.to(documentId).emit('documentUpdated', content);
      } catch (error) {
        console.error('Error updating document:', error);
      }
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
};

// Emit document updates from controller to connected clients
export const emitDocumentUpdate = (documentId, document) => {
  if (ioInstance) {
    ioInstance.to(documentId).emit('documentUpdated', document);
  }
};
