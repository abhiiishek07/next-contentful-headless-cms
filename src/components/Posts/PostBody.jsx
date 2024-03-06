import RichText from "./RichText";

const PostBody = ({ post }) => {
  const { content } = post?.fields;

  return (
    <div className="mx-4 prose">
      <RichText content={content} />
    </div>
  );
};

export default PostBody;
