// Models
export interface INote {
  title: string;
  tags: string[];
  content: string;
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type TNewNote = Omit<INote, "createdAt" | "updatedAt">;
