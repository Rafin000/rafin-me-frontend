/* eslint-disable react/prop-types */
import './index.css'
import { Link } from 'react-router-dom';

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
                <Link to={`/blogs/${post.id}`} className='blog-post-title'>{post.title}</Link>
                <div className='blog-post-author-read'>
                    <div>{post.author}</div>
                    <div>{post.reading_time} minutes read</div>
                </div>
            </div>
        </div>
    );
};


export default BlogCard;