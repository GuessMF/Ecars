import React, {useState} from "react";
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
interface Photo {
  id: string;
  url: string;
}
interface PhotoListProps {
  photos: Photo[];
}

const PhotoList: React.FC<PhotoListProps> = ({photos}) => {
  const [orderedPhotos, setOrderedPhotos] = useState(photos);

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const reorderedPhotos = Array.from(orderedPhotos);
    const [removed] = reorderedPhotos.splice(result.source.index, 1);
    reorderedPhotos.splice(result.destination.index, 0, removed);

    setOrderedPhotos(reorderedPhotos);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="photos">
        {(provided) => (
          <ul {...provided.droppableProps} ref={provided.innerRef}>
            {orderedPhotos.map((photo, index) => (
              <Draggable key={photo.id} draggableId={photo.id} index={index}>
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <img src={photo.url} alt={`Photo ${index + 1}`} />
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default PhotoList;
