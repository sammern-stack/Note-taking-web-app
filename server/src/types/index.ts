// Models
export interface INote {
  title: string;
  tags: string[];
  content: string;
  isArchived: boolean;
  createdAt: Date;
  updatedAt: Date;
}
