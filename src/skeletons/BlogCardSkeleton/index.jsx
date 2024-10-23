import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './index.css';

const BlogCardSkeleton = () => (
    <div className="blog-post">
        <div className="blog-post-date">
            <Skeleton width={100} height={16} />
        </div>
        <div className='blog-post-content'>
            <div className='blog-post-title'>
                <Skeleton width={400} height={16} />
            </div>
            <div className='blog-post-author-read'>
                <Skeleton width={100} height={16} />
                <Skeleton width={120} height={16} />
            </div>
        </div>
    </div>
);

export default BlogCardSkeleton;