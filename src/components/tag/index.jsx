/* eslint-disable react/prop-types */
import './index.css'; 

const Tags = ({tags}) => {
  return (
    <div>
        <h3 className='tags-header'>Tags</h3>
        <div className="tag-list">
            {tags.length > 0 ? (
                tags.map((tag, index) => (
                <span key={index} className="tag">
                    {tag}
                </span>
                ))
            ) : (
                ' '
            )}
        </div>
    </div>
  );
};

export default Tags;
