import PostBody from "@/components/Posts/PostBody";
import PostHeader from "@/components/Posts/PostHeader";
import { client } from "@/lib/contentful/client";
import { useRouter } from "next/router";

const Post = ({ post, preview }) => {
  const router = useRouter();

  if (!post)
    return (
      <div>
        <p>Loading</p>
      </div>
    );

  return (
    <section className="section w-full ">
      {/* {preview && <PreviewAlert />} */}
      <div className="container w-full flex items-center justify-center">
        <article className="mx-auto w-full flex items-center justify-center">
          <div className="flex flex-col items-center justify-center p-4 prose w-full ">
            <PostHeader post={post} />
            <PostBody post={post} />
          </div>
        </article>
      </div>
    </section>
  );
};

export const getStaticProps = async ({ params }) => {
  const { slug } = params;
  console.log("slug\n", slug);
  const response = await client.getEntries({
    content_type: "post",
    "fields.slug": slug,
  });

  // Check if response contains items and items array is not empty
  if (!response?.items?.[0]) {
    return { notFound: true };
  }
  console.log("posts\n", response.items[0]);

  return {
    props: {
      post: response.items[0],
    },
    revalidate: 60,
  };
};

export const getStaticPaths = async () => {
  const response = await client.getEntries({ content_type: "post" });
  console.log("static res\n", response.items);
  const paths = response.items.map((item) => ({
    params: { slug: item.fields.slug },
  }));
  console.log("paths\n", paths);

  return {
    paths,
    fallback: true,
  };
};

export default Post;
