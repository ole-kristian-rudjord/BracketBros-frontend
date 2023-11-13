<script setup lang="ts">
import { toast } from 'vue3-toastify';
import { defaultToastOptions } from '@/constants';

const route = useRoute();

const post = ref<post | null>(null);
const comments = ref<comment[] | null>(null);

const title = ref('BracketBros');

watch(
  post,
  (newValue) => {
    if (newValue?.title) {
      title.value = `${newValue.title} - BracketBros`;
    }
  },
  { immediate: true }
);

useHead({
  title: title,
});

onMounted(async () => {
  const postId = Number(route.params.id);

  if (!isNaN(postId)) {
    const { data: postData, error: postError } = await getPostById(postId);
    if (postError) {
      console.error('Error fetching post:', postError);
      toast.error('Error fetching post', defaultToastOptions.error);
    } else {
      post.value = postData;
      const { data: commentsData, error: commentsError } = await getComments(
        postId
      );
      if (commentsError) {
        console.error('Error fetching comments:', commentsError);
        toast.error('Error fetching comments', defaultToastOptions.error);
      } else {
        //comments.value = commentsData;
        comments.value = [
          {
            user: {
              username: 'hackerman',
              profilePicture: null,
              creationdate: "2023-11-12T20:27:12.6032792",
              posts: null,
              likedPosts: null,
              comments: null,
              likedComments: null,

            },
            commentReplies: [
              {
                user: {
                  username: 'theboss',
                  profilePicture: null,
                  creationdate: "2023-11-12T20:27:12.6032792",
                  posts: null,
                  likedPosts: null,
                  comments: null,
                  likedComments: null,
                },
                commentReplies: [
                  {
                    user: {
                      username: 'theboss',
                      profilePicture: null,
                      creationdate: "2023-11-12T20:27:12.6032792",
                      posts: null,
                      likedPosts: null,
                      comments: null,
                      likedComments: null,
                    },
                    commentReplies: [],
                    commentId: 70,
                    content: 'You make it look so easy.',
                    totalLikes: 15,
                    dateCreated: '2023-11-12T20:27:12.6032792',
                    dateLastEdited: null,
                    postId: 22,
                    isLiked: false,
                  },
                ],
                commentId: 70,
                content: 'You make it look so easy.',
                totalLikes: 15,
                dateCreated: '2023-11-12T20:27:12.6032792',
                dateLastEdited: null,
                postId: 22,
                isLiked: false,
              },
              {
                user: {
                  username: 'theboss',
                  profilePicture: null,
                  creationdate: "2023-11-12T20:27:12.6032792",
                  posts: null,
                  likedPosts: null,
                  comments: null,
                  likedComments: null,
                },
                commentReplies: [],
                commentId: 70,
                content: 'You make it look so easy.',
                totalLikes: 15,
                dateCreated: '2023-11-12T20:27:12.6032792',
                dateLastEdited: null,
                postId: 22,
                isLiked: false,
              },
            ],
            commentId: 43,
            content: "Spectacular This shows you've really been thinking.",
            totalLikes: 781,
            dateCreated: '2023-11-12T20:27:12.6032672',
            dateLastEdited: null,
            postId: 22,
            isLiked: false,
          },
          {
            user: {
              username: 'theboss',
              profilePicture: null,
              creationdate: "2023-11-12T20:27:12.6032792",
              posts: null,
              likedPosts: null,
              comments: null,
              likedComments: null,
            },
            commentReplies: [],
            commentId: 70,
            content: 'You make it look so easy.',
            totalLikes: 15,
            dateCreated: '2023-11-12T20:27:12.6032792',
            dateLastEdited: null,
            postId: 22,
            isLiked: false,
          },
          {
            user: {
              username: 'theboss',
              profilePicture: null,
              creationdate: "2023-11-12T20:27:12.6032792",
              posts: null,
              likedPosts: null,
              comments: null,
              likedComments: null,
            },
            commentReplies: [],
            commentId: 79,
            content: "You're on the ball today.",
            totalLikes: 194,
            dateCreated: '2023-11-12T20:27:12.6032821',
            dateLastEdited: null,
            postId: 22,
            isLiked: false,
          },
          {
            user: {
              username: 'theboss',
              profilePicture: null,
              creationdate: "2023-11-12T20:27:12.6032792",
              posts: null,
              likedPosts: null,
              comments: null,
              likedComments: null,
            },
            commentReplies: [],
            commentId: 95,
            content:
              "This is a winner! You've shown a lot of patience with this.",
            totalLikes: 819,
            dateCreated: '2023-11-12T20:27:12.6032872',
            dateLastEdited: null,
            postId: 22,
            isLiked: false,
          },
        ];
      }
    }
  } else {
    console.error('Invalid Post ID');
    toast.error('Invalid Post ID', defaultToastOptions.error);
  }
});
</script>

<template>
  <div class="d-flex flex-column align-center w-100 py-12 px-4">
    <post-component v-if="post" :post="post" :expandContent="true" :preventHighlighting="true"></post-component>
    <div class="d-flex flex-column w-100 my-4" style="max-width: 700px">
      <comment-component v-for="(comment, index) in comments" :key="index" :comment="comment"
        class="w-100 mb-4"></comment-component>
    </div>
  </div>
</template>
