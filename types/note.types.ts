type Note = {
  _id: string;
  title: string;
  content: string;
  type: "note" | "task" | "todo";
  isCompleted: boolean;
  priority: "low" | "medium" | "high";
  userID: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type { Note };
