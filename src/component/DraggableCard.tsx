import React, { useState } from "react";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";

type ShapeType = "square" | "circle" | "triangle";
type DraggableCardProps = {
  shape: ShapeType;
  onRemove: () => void;
  position: { x: number; y: number };
  onUpdatePosition: (position: { x: number; y: number }) => void;
  text:string;
  onTextChange: (text: string) => void;
  size:{width:number,height:number}
  onResize: (size: { width: number; height: number }) => void;
};
const DraggableCard = ({ shape, onRemove,position,onUpdatePosition, text, onTextChange,size ,onResize}: DraggableCardProps) => {
  const [cardText, setCardText] = useState<string>("text");
  const [disableDragging, setDisableDragging] = useState<boolean>(false);

  const shapeStyles = {
    square: {},
    circle: {
      borderRadius: "50%",
    },
    triangle: {
      clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
    },
  };
  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCardText(event.target.value);
  };

  const handleStart = () => {
    setDisableDragging(true);
  };
  const handleDrag = (e: any, data: any) => {
    onUpdatePosition({ x: data.x, y: data.y });
  };
  const handleStop = () => {
    setDisableDragging(false);
  };

  const handleResize = (event: any, { size }: { size: { width: number, height: number } }) => {
    onResize(size);
  }
  
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Delete") {
      onRemove();
    }
  };

  return (
    <div className=" draggable-container">
      <Draggable
        disabled={disableDragging}
        onStart={handleStart}
        onStop={handleStop}
        position={position}
        onDrag={handleDrag}
      >
        <div onKeyDown={handleKeyDown} tabIndex={0}>
          <ResizableBox
            resizeHandles={["nw", "ne", "sw", "se", "n", "e", "s", "w"]}
            width={size.width}
            height={size.height}
            onResize={handleResize}
            style={{
              ...shapeStyles[shape],
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "lightblue",
              border: "1px solid blue",
            }}
          >
            <textarea
            value={text}
            onChange={(e) => onTextChange(e.target.value)}
              style={{
                ...shapeStyles[shape],
                backgroundColor: "lightblue",
                resize: "none",
                border: "none",
                outline: "none",
                flex: 1,
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            />
          </ResizableBox>
        </div>
      </Draggable>
    </div>
  );
};

export default React.memo(DraggableCard);
