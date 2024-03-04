import Link from "next/link";
import ContentfulImage from "../UI/ContentfulImage";
import Avatar from "../UI/Avatar";
import DateComponent from "../UI/DateComponent";

const PostCard = ({ post }) => {
  const { title, slug, exercept, coverImage, author, date } = post.fields;

  return (
    <div className="rounded-md overflow-hidden shadow-md max-w-md">
      <Link href={`/posts/${slug}`} aria-label={title}>
        <div className="mb-2 w-full h-96 object-contain">
          <ContentfulImage
            alt={`Cover Image for ${title}`}
            src={coverImage.fields.file.url}
            width={coverImage.fields.file.details.image.width}
            height={coverImage.fields.file.details.image.height}
          />
        </div>
        <div className="p-4">
          <h3 className="text-xl mb-1 leading-snug font-bold">{title}</h3>
          <div className="text-sm mb-4 text-gray-400">
            <DateComponent dateString={date} />
          </div>
          <p className="text-base mb-4">{exercept}</p>
          <Avatar name={author.fields.name} picture={author.fields.picture} />
        </div>
      </Link>
    </div>
  );
};

export default PostCard;
