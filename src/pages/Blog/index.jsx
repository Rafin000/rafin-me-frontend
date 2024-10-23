// Blog.js
import { useState, useEffect } from 'react';
import './index.css';
import BlogCard from './BlogCard';
import { API_BASE_URL, API_KEY } from '../../config';

function Blog() {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/blogs/?page=${currentPage}&per_page=10`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'API-KEY': API_KEY 
                    }
                });
    
                const result = await response.json();
                setPosts(result.data);
                setTotalPages(result.pages);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };
    
        fetchData();
    }, [currentPage]);


    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            setCurrentPage(newPage);
        }
    };

    return (
        <div className="blog-page">
            <header className="blog-header">
                Most things in my blog will be related to devOps and cloud service.
            </header>
            <div className="blog-body">
                {posts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                ))}
                <div className="pagination">
                    <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
                    <span>Page {currentPage} of {totalPages}</span>
                    <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
                </div>
            </div>
        </div>
    );
}

export default Blog;
