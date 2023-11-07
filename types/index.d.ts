export {};

declare global {
  interface user {
    username: string;
    profilePicture: string;
  }

  interface category {
    id: number;
    name: string;
    color: string;
    picturePath: string;
  }

  interface tag {
    id: number;
    name: string;
  }

  interface post {
    id: number;
    user: user;
    dateCreated: Date;
    dateLastEdited: Date;
    category: category;
    tags: tag[];
    title: string;
    content: string;
    totalLikes: number;
    totalComments: number;
  }
}
