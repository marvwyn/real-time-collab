import Document from '../models/Document.js'; 
import { emitDocumentUpdate } from '../socket/documentHandlers.js'; 
// Controller to create a new document
export const createDocument = async (req, res) => {
  const { title, content } = req.body;

  try {
    const newDocument = new Document({
      title,
      content,
      createdBy: req.userId, 
    });

    await newDocument.save();
    res.status(201).json({ message: 'Document created successfully', document: newDocument });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// Controller to get a document by its ID
export const getDocument = async (req, res) => {
  const { documentId } = req.params;

  try {
    const document = await Document.findById(documentId);
    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    res.status(200).json(document);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const updateDocument = async (req, res) => {
  const { documentId } = req.params;
  const { title, content } = req.body;

  try {
    const document = await Document.findByIdAndUpdate(
      documentId,
      { title, content },
      { new: true }
    );
    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    emitDocumentUpdate(documentId, document);

    res.status(200).json({ message: 'Document updated successfully', document });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const deleteDocument = async (req, res) => {
  const { documentId } = req.params;

  try {
    const document = await Document.findByIdAndDelete(documentId);
    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    res.status(200).json({ message: 'Document deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
