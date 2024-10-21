import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import MarkdownPreview from '@uiw/react-markdown-preview';
import axios from 'axios';
import './index.css'; 
import Tags from '../../../../components/tag';
import { API_BASE_URL , API_KEY} from '../../../../const';

const BlogDetails = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);

  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/blogs/${postId}`, {
          headers: {
            'Content-Type': 'application/json',
            'API-KEY': API_KEY,
          },
        });
        setPost(response.data.data);
      } catch (error) {
        console.error('Error fetching the blog post:', error);
      }
    };
  
    fetchPost();
  }, [postId]);

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <div className="blog-post-detail">
        <h1>{post.title}</h1>
        <div className='blog-post-detail-meta'>
            <div className='blog-post-detail-left'>
                <div>{new Date(post.created_at * 1000).toLocaleDateString('en-US', options)}</div>
                <div>By {post.author}</div>
            </div>
            {post.reading_time?
                    <div>{post.reading_time} minutes read</div>: ''
            }
        </div>
        <hr className="blog-post-divider" />
        {post.summary?
                <p>{post.summary}</p>: ''
        }
        {post.thumbnail_url?
                <img src='https://s3.brilliant.com.bd/rafin_storage/locust.png' alt={`${post.title} thumbnail`} />: ''
        }
        {post.thumbnail_url?
               <hr className="blog-post-divider" />: ''
        }
        <MarkdownPreview
            className="markdown-preview"
            source={post.content}
            rehypeRewrite={(node, index, parent) => {
                if (node.tagName === "a" && parent && /^h(1|2|3|4|5|6)/.test(parent.tagName)) {
                parent.children = parent.children.slice(1);
                }
            }}
        />
        <Tags tags={post.tags}/>
    </div>
  );
};

export default BlogDetails;
