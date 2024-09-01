import { DndContext } from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Card, Typography } from 'antd';
import React, { useState } from 'react';

const { Title } = Typography;

// Initial data
const initialData = {
  lists: [
    {
      id: 'list-1',
      title: 'To Do',
      cards: [
        { id: 'card-1', content: 'Task 1' },
        { id: 'card-2', content: 'Task 2' },
      ],
    },
    {
      id: 'list-2',
      title: 'In Progress',
      cards: [{ id: 'card-3', content: 'Task 3' }],
    },
    {
      id: 'list-3',
      title: 'Done',
      cards: [],
    },
  ],
};

const SortableCard = props => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: props.id,
    });

  return (
    <Card
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        ...props.style,
        transform: transform
          ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
          : undefined,
        transition,
      }}
    >
      {props.content}
    </Card>
  );
};

const DndTest = () => {
  const [data, setData] = useState(initialData);

  const handleDragEnd = event => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldListIndex = data.lists.findIndex(list =>
        list.cards.some(card => card.id === active.id)
      );
      const newListIndex = data.lists.findIndex(list =>
        list.cards.some(card => card.id === over.id)
      );

      const oldList = data.lists[oldListIndex];
      const newList = data.lists[newListIndex];

      const activeCard = oldList.cards.find(card => card.id === active.id);
      const newCardList = newList.cards.filter(card => card.id !== active.id);

      const updatedOldList = {
        ...oldList,
        cards: oldList.cards.filter(card => card.id !== active.id),
      };

      const updatedNewList = {
        ...newList,
        cards: [...newCardList, activeCard],
      };

      setData({
        lists: data.lists.map((list, index) =>
          index === oldListIndex
            ? updatedOldList
            : index === newListIndex
            ? updatedNewList
            : list
        ),
      });
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div style={{ display: 'flex', overflowX: 'auto', padding: 16 }}>
        {data.lists.map(list => (
          <div
            key={list.id}
            style={{
              width: 300,
              marginRight: 16,
              backgroundColor: '#f4f4f4',
              borderRadius: 4,
              padding: 8,
            }}
          >
            <Title level={4}>{list.title}</Title>
            <SortableContext
              items={list.cards.map(card => card.id)}
              strategy={verticalListSortingStrategy}
            >
              {list.cards.map(card => (
                <SortableCard
                  key={card.id}
                  id={card.id}
                  content={card.content}
                />
              ))}
            </SortableContext>
          </div>
        ))}
      </div>
    </DndContext>
  );
};

export default DndTest;
