import React, { createContext, useContext, useEffect, useState } from "react";
import type { Thread, Comment } from "../types/types";
import { saveToStorage, loadFromStorage } from "../utils/storage";
import { sampleThreads } from "../data/sampleData";

type ForumContextType = {
  threads: Thread[];
  addThread: (thread: Thread) => void;
  addComment: (threadId: string, comment: Comment) => void;
  addReply: (threadId: string, parentCommentId: string, reply: Comment) => void;
  getThreadById: (id: string) => Thread | undefined;
};

const ForumContext = createContext<ForumContextType | undefined>(undefined);

export const ForumProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [threads, setThreads] = useState<Thread[]>(() => {
    const stored = loadFromStorage<Thread[]>("threads", []);
    if (stored.length === 0) {
      saveToStorage("threads", sampleThreads);
      return sampleThreads;
    }
    return stored;
  });

  useEffect(() => {
    saveToStorage("threads", threads);
  }, [threads]);

  const addThread = (thread: Thread) => {
    setThreads((prev) => [...prev, thread]);
  };

  const addComment = (threadId: string, comment: Comment) => {
    setThreads((prev) =>
      prev.map((t) =>
        t.id === threadId ? { ...t, comments: [...t.comments, { ...comment, replies: [] }] } : t
      )
    );
  };

  const addReply = (threadId: string, parentCommentId: string, reply: Comment) => {
    const addReplyToComment = (comments: Comment[]): Comment[] => {
      return comments.map(comment => {
        if (comment.id === parentCommentId) {
          return {
            ...comment,
            replies: [...(comment.replies || []), { ...reply, replies: [] }]
          };
        } else if (comment.replies && comment.replies.length > 0) {
          return {
            ...comment,
            replies: addReplyToComment(comment.replies)
          };
        }
        return comment;
      });
    };

    setThreads((prev) =>
      prev.map((t) =>
        t.id === threadId ? { ...t, comments: addReplyToComment(t.comments) } : t
      )
    );
  };

  const getThreadById = (id: string) => threads.find((t) => t.id === id);

  return (
    <ForumContext.Provider value={{ threads, addThread, addComment, addReply, getThreadById }}>
      {children}
    </ForumContext.Provider>
  );
};

export const useForum = () => {
  const context = useContext(ForumContext);
  if (!context) throw new Error("useForum must be used inside ForumProvider");
  return context;
};
