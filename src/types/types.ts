export type User = {
  id: string;
  username: string;
  email: string;
};

export type Comment = {
  id: string;
  threadId: string;
  parentCommentId?: string; // For nested replies
  author: string;
  content: string;
  creationDate: string;
  replies?: Comment[]; // Nested replies
};

export type Thread = {
  id: string;
  title: string;
  category: "general" | "QNA";
  content: string;
  creator: User;
  creationDate: string;
  comments: Comment[];
};

export type QNAThread = Thread & {
  category: "QNA";
  isAnswered: boolean;
  commentAnswerId?: string;
};
