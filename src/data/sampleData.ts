import type { Thread } from "../types/types";

export const sampleThreads: Thread[] = [
  {
    id: "sample-1",
    title: "Har jag för många hattar?",
    category: "general",
    content: "Jag har 86 hattar och det börjar bli trångt att få plats med alla dem i min lägenhet. Hur har ni gjort som är i samma sits? Hyrt förråd?",
    creator: {
      id: "user-1",
      username: "User1",
      email: "user1@example.com"
    },
    creationDate: new Date().toISOString().split('T')[0],
    comments: [
      {
        id: "comment-1",
        threadId: "sample-1",
        author: "User2",
        content: "Nej bror man kan aldrig ha för många hattar",
        creationDate: new Date().toISOString().split('T')[0],
        replies: [
          {
            id: "comment-1-1",
            threadId: "sample-1",
            parentCommentId: "comment-1",
            author: "User3",
            content: "Sant bror",
            creationDate: new Date().toISOString().split('T')[0],
            replies: []
          }
        ]
      },
      {
        id: "comment-2",
        threadId: "sample-1",
        author: "User4",
        content: "Jag har bara 2 hattar. En för festligheter och en för intervjuer. det är lagom enligt min erfarenhet.",
        creationDate: new Date().toISOString().split('T')[0],
        replies: []
      },
      {
        id: "comment-3",
        threadId: "sample-1",
        author: "User5",
        content: "Jag har mina i frysen.",
        creationDate: new Date().toISOString().split('T')[0],
        replies: []
      }
    ]
  },
  {
    id: "sample-2", 
    title: "How to use TypeScript?",
    category: "QNA",
    content: "I'm learning TypeScript and would love some tips from experienced developers.",
    creator: {
      id: "user-2", 
      username: "Beginner",
      email: "beginner@example.com"
    },
    creationDate: new Date().toISOString().split('T')[0],
    comments: [
      {
        id: "comment-3",
        threadId: "sample-2",
        author: "TypeScriptPro",
        content: "Start with the basics: interfaces, types, and generics. The official handbook is excellent!",
        creationDate: new Date().toISOString().split('T')[0],
        replies: [
          {
            id: "comment-3-1",
            threadId: "sample-2",
            parentCommentId: "comment-3",
            author: "Beginner",
            content: "Thanks! I'll check out the handbook.",
            creationDate: new Date().toISOString().split('T')[0],
            replies: []
          }
        ]
      },
      {
        id: "comment-4",
        threadId: "sample-2",
        author: "CodeMentor",
        content: "I recommend practicing with small projects. Try converting a JavaScript project to TypeScript!",
        creationDate: new Date().toISOString().split('T')[0],
        replies: []
      }
    ]
  },
  {
    id: "sample-3",
    title: "Best practices for React development",
    category: "general",
    content: "What are some best practices you follow when developing React applications? Share your tips and tricks!",
    creator: {
      id: "user-3",
      username: "ReactDev",
      email: "reactdev@example.com"
    },
    creationDate: new Date().toISOString().split('T')[0],
    comments: [
      {
        id: "comment-6",
        threadId: "sample-3",
        author: "ReactExpert",
        content: "Always use functional components with hooks. Keep components small and focused on a single responsibility.",
        creationDate: new Date().toISOString().split('T')[0],
        replies: []
      }
    ]
  }
];
