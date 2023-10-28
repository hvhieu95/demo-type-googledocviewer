import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import documents from '../Data/documents';

import { DocumentType } from '../Data/documents';

interface DocumentContextProps {
  documents: DocumentType[];
  setDocuments: (documents: DocumentType[]) => void;
}

const DocumentContext = createContext<DocumentContextProps | undefined>(undefined);

interface DocumentProviderProps {
  children: ReactNode;
}

export const DocumentProvider: React.FC<DocumentProviderProps> = ({ children }) => {
  const [documentsState, setDocumentsState] = useState<DocumentType[]>(() => {
    const savedDocuments = localStorage.getItem("documents");
    return savedDocuments ? JSON.parse(savedDocuments) : documents;
  });

  useEffect(() => {
    const savedDocuments = localStorage.getItem("documents");
    if (savedDocuments) {
      setDocumentsState(JSON.parse(savedDocuments));
    }
  }, []);

  const setDocuments = (updatedDocuments: DocumentType[]) => {
    setDocumentsState(updatedDocuments);
    localStorage.setItem("documents", JSON.stringify(updatedDocuments));
  };

  return (
<DocumentContext.Provider value={{ documents: documentsState, setDocuments }}>
      {children}
    </DocumentContext.Provider>
  );
};

export const useDocuments = () => {
  const context = useContext(DocumentContext);
  if (context === undefined) {
    throw new Error('useDocuments must be used within a DocumentProvider');
  }
  return context;
};
