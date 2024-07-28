// import { useState, useEffect } from 'react';
// import './index.css';
// // import { Link } from 'react-router-dom';

// function Blog() {
//     const [posts, setPosts] = useState([]);

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await fetch('http://localhost:5000/api/v1/blog-service/blog');
//                 const result = await response.json();
//                 setPosts(result.data);
//             } catch (error) {
//                 console.error('Error fetching posts:', error);
//             }
//         };

//         fetchData();
//     }, []);

//     const options = {
//       year: 'numeric', 
//       month: 'short', 
//       day: 'numeric',
//     };

//     const tags = ['advanced', 'age', 'automation', 'bash', 'beginner', 'best_practice', 'cmd', 'custom', 'debugging', 'decentralized_data', 'decode', 'developer', 
//       'development', 'docker', 'dx', 'encoded', 'federated_learning', 'gcp', 'git', 'git_blame', 'github', 'graph_neural_networks', 'local_development', 'logging', 
//       'pgAdmin', 'postgresql', 'privacy_preserving', 'productivity', 'programming', 'prompt', 'python', 'rage', 'requests', 'tutorials', 'urllib3', 'windows']

//     return (
//       <div className="blog-page">
//           <header className="blog-header">
//               Most things in my blog will be related to devOps and cloud service.
//           </header>
//           <div className="blog-body">
//               {posts.map((post) => (
//                   <div className="blog-post" key={post.id}>
//                       <p className='blog-post-date'>{new Date(post.created_at * 1000).toLocaleDateString('en-US', options)}</p>
//                       <a href={`${post.id}`} className='blog-post-title'>{post.title}</a>
//                   </div>
//               ))}
//               <div className="blog-tags">
//                 {tags.map((tag) => (
//                   <a key={tag} href={`#${tag}`} className="blog-tag">
//                     #{tag}
//                   </a>
//                 ))}
//               </div>
//           </div>
//       </div>
//     );
// }

// export default Blog;


import { useState, useEffect } from 'react';
import './index.css';

function Blog() {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/v1/blog-service/blog?page=${currentPage}&per_page=10`);
                const result = await response.json();
                setPosts(result.data);
                setTotalPages(result.pages);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchData();
    }, [currentPage]);

    const options = {
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
    };

    const tags = ['advanced', 'age', 'automation', 'bash', 'beginner', 'best_practice', 'cmd', 'custom', 'debugging', 'decentralized_data', 'decode', 'developer', 
      'development', 'docker', 'dx', 'encoded', 'federated_learning', 'gcp', 'git', 'git_blame', 'github', 'graph_neural_networks', 'local_development', 'logging', 
      'pgAdmin', 'postgresql', 'privacy_preserving', 'productivity', 'programming', 'prompt', 'python', 'rage', 'requests', 'tutorials', 'urllib3', 'windows']

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
                  <div className="blog-post" key={post.id}>
                      <p className='blog-post-date'>{new Date(post.created_at * 1000).toLocaleDateString('en-US', options)}</p>
                      <a href={`${post.id}`} className='blog-post-title'>{post.title}</a>
                  </div>
              ))}
              <div className="blog-tags">
                {tags.map((tag) => (
                  <a key={tag} href={`#${tag}`} className="blog-tag">
                    #{tag}
                  </a>
                ))}
              </div>
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
