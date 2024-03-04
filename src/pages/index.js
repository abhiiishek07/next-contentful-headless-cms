import { client } from "@/lib/contentful/client";
import PostCard from "@/components/Posts/PostCard";

export const getStaticProps = async () => {
  const response = await client.getEntries({ content_type: "post" });

  return {
    props: {
      posts: response.items,
      revalidate: 60,
    },
  };
};

export default function Home({ posts }) {
  return (
    <div className="min-h-full w-full flex items-center justify-center my-8">
      <div className="max-w-3xl w-full flex  gap-4">
        {posts.map((post, index) => (
          <PostCard key={post.fields.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
