import { useDroppable } from "@dnd-kit/core";

export const Droppable = ({
  children,
  id,
  columnId,
}: {
  children: React.ReactNode;
  id: string;
  columnId: string;
}) => {
  const { setNodeRef } = useDroppable({
    id,
    data: { columnId },
  });

  return <div ref={setNodeRef}>{children}</div>;
};
