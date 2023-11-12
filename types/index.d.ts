export {};

declare global {
  interface user {
    username: string;
    profilePicture: string | null;
  }

  interface category {
    categoryId: number;
    name: string;
    color: string;
    url: string;
  }

  interface tag {
    tagId: number;
    name: string;
  }

  interface post {
    id: number;
    user: user;
    dateCreated: string;
    dateLastEdited: string;
    category: category;
    tags: tag[];
    title: string;
    content: string;
    totalLikes: number;
    totalComments: number;
  }

  interface comment {
    commentId: number;
    content: string;
    totalLikes: number;
    dateCreated: string;
    dateLastEdited: string | null;
    postId: number;
    user: user;
    isLiked: boolean;
    commentReplies: comment[];
  }
}
