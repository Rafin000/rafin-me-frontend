/* eslint-disable react/prop-types */
import './index.css'

const BlogCard = ({ post }) => {
    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    };

    return (
        <div className="blog-post" key={post.id}>
            <p className='blog-post-date'>
                {new Date(post.created_at * 1000).toLocaleDateString('en-US', options)}
            </p>
            <div className='blog-post-content'>
                <a href={`${post.id}`} className='blog-post-title'>{post.title}</a>
                <div className='blog-post-author-read'>
                    <div>{post.author}</div>
                    <div>{post.reading_time} minutes read</div>
                </div>
            </div>
        </div>
    );
};

export default BlogCard;
