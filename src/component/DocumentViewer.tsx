import React, { useState, useEffect, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import DraggableCard from "./DraggableCard";
import Content from "../component/Content";
import { useDocuments } from "../Context/DocumentContext";
import { useNavigate } from "react-router-dom";


type ShapeType = {
  type: "square" | "circle" | "triangle";
  position: { x: number; y: number };
  size: { width: number; height: number };
  text: string;
};

type State = {
  fileType: "pdf" | "xlsx" | "docx" | "image" | "ppt";
  viewerHeight: string;
  shapes: Array<"square" | "circle" | "triangle">;
  selectedShapeIndex: number | null;
};
type DocumentType = {
  id: string;
  name: string;
  uri: string;
  fileType: "pdf" | "xlsx" | "docx" | "ppt";
};

interface DocumentViewerProps {
  updateDocumentsState?: (updatedDocuments: DocumentType[]) => void;
}

const DocumentViewer = ({ updateDocumentsState }: DocumentViewerProps) => {
  const { id } = useParams<{ id: string }>();
  const [document, setDocument] = useState<DocumentType | null>(null);
  const [viewerHeight, setViewerHeight] = useState<string>("100%");
  const [shapes, setShapes] = useState<ShapeType[]>([]);
  const docViewerRef = useRef<HTMLDivElement>(null);
  const [comment, setComment] = useState<string>("");
  const [assign, setAssign] = useState<string>("");
  const [status, setStatus] = useState<string>("");
  const { documents: globalDocuments, setDocuments: setGlobalDocuments } =
    useDocuments();

  const navigate = useNavigate();

  useEffect(() => {
    const foundDocument = globalDocuments.find((doc) => doc.id === id);
    if (foundDocument) {
      setDocument(foundDocument);
      setAssign(foundDocument.assign || "");
      setStatus(foundDocument.status || "");
    } else {
      setDocument(null);
    }

    const savedData = localStorage.getItem(`documentData_${id}`);
    if (savedData) {
      const { shapes, comment, assign, status } = JSON.parse(savedData);
      setShapes(shapes);
      setComment(comment);
      setAssign(assign);
      setStatus(status);
    }
  }, [id, globalDocuments]);
  const handleSave = useCallback(() => {
    if (document && (shapes.length > 0 || comment || assign || status)) {
      const dataToSave = { shapes, comment, assign, status };
      localStorage.setItem(`documentData_${id}`, JSON.stringify(dataToSave));
      alert("データが保存されました!");

      const updatedDocument = { ...document, assign, status };
      const updatedGlobalDocuments = globalDocuments.map((doc) =>
        doc.id === id ? updatedDocument : doc
      );
      setGlobalDocuments(updatedGlobalDocuments);
    } else {
      alert("データが保存されていません!");
    }
  }, [
    id,
    shapes,
    comment,
    assign,
    status,
    document,
    globalDocuments,
    setGlobalDocuments,
  ]);
  useEffect(() => {
    const updateViewerHeight = () => {
      if (docViewerRef.current) {
        const documentHeight = docViewerRef.current.scrollHeight;
        switch (document?.fileType) {
          case "pdf":
            setViewerHeight(`${documentHeight}px`);
            break;
          case "xlsx":
          case "docx":
          case "ppt":
            setViewerHeight("500vh");
            break;
          default:
            break;
        }
      }
    };
    updateViewerHeight();
    window.addEventListener("resize", updateViewerHeight);

    return () => {
      window.removeEventListener("resize", updateViewerHeight);
    };
  }, [document]);

  if (!document) {
    return <div>Không tìm thấy tài liệu</div>;
  }

  const addShape = (shapeType: "square" | "circle" | "triangle") => {
    const newShape = {
      type: shapeType,
      position: { x: 0, y: 0 },
      size: { width: 150, height: 150 },
      text: "",
    };
    setShapes((prevShapes) => [...prevShapes, newShape]);
  };

  const onUpdateShapePosition = (
    index: number,
    position: { x: number; y: number }
  ) => {
    setShapes((prevShapes) => {
      const newShapes = [...prevShapes];
      newShapes[index] = { ...newShapes[index], position };
      return newShapes;
    });
  };

  const updateShapeText = (index: number, text: string) => {
    setShapes((prevShapes) => {
      const newShapes = [...prevShapes];
      newShapes[index] = { ...newShapes[index], text };
      return newShapes;
    });
  };

  const updatedShapeSize = (
    index: number,
    size: { width: number; height: number }
  ) => {
    setShapes((prevShapes) => {
      const newShapes = [...prevShapes];
      newShapes[index] = { ...newShapes[index], size };
      return newShapes;
    });
  };

  const removeShape = (indexToRemove: number) => {
    const newShapes = shapes.filter((_, index) => index !== indexToRemove);
    setShapes(newShapes);
    localStorage.setItem(`shapes_${id}`, JSON.stringify(newShapes));
  };

  const handleBackHome = () => {
    navigate(-1);
  };

  const googleDocsUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(
    document.uri
  )}&embedded=true`;

  return (
    <>
      <div className={`viewer-with-draggable ${document.fileType}`}>
        <div className="right-panel">
          <iframe
            src={googleDocsUrl}
            width="100%"
            height="100%"
            frameBorder="0"
          />
          {/* <GoogleDocsViewer width="100%" height="100%" fileUrl={document.uri} /> */}
        </div>

        <div className="left-panel">
          <div className="shapes-container">
            {shapes.map((shape, index) => (
              <DraggableCard
                key={index}
                shape={shape.type}
                position={shape.position}
                size={shape.size}
                onResize={(size) => updatedShapeSize(index, size)}
                text={shape.text}
                onTextChange={(newText) => updateShapeText(index, newText)}
                onRemove={() => removeShape(index)}
                onUpdatePosition={(position: { x: number; y: number }) =>
                  onUpdateShapePosition(index, position)
                }
              />
            ))}
          </div>
          <div className="button-shape-container">
            <button onClick={() => addShape("square")}>square</button>
            <button onClick={() => addShape("circle")}>circle</button>
            <button onClick={() => addShape("triangle")}>triangle</button>
          </div>

          <Content
            comment={comment}
            assign={assign}
            status={status}
            onChangeAssign={setAssign}
            onChangeStatus={setStatus}
            onChangeComment={setComment}
          />
        </div>
      </div>

      <footer>
        <button className="button-backhome" onClick={handleBackHome}>
          Back
        </button>
        <button className="button-save" onClick={handleSave}>
          Save
        </button>
      </footer>
    </>
  );
};

export default DocumentViewer;
