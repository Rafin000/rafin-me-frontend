import { useState } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import './index.css';
import RichTextEditor from '../../components/MyEditor';

const Admin = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [title, setTitle] = useState('');

  const handleEditorChange = (state) => {
    setEditorState(state);
  };

  const handleSubmit = async () => {
    const rawContentState = convertToRaw(editorState.getCurrentContent());
    const htmlContent = draftToHtml(rawContentState);

    const postData = {
      title: title,
      content: htmlContent,
      author: 'Admin'
    };

    try {
      const response = await fetch('http://localhost:5000/api/v1/blog-service/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      });

      if (response.ok) {
        console.log('Successfully created blog post');
        // Reset title and editorState after successful submission
        setTitle('');
        setEditorState(EditorState.createEmpty()); // Clear editor content
      } else {
        console.error('Failed to create blog post');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="admin-page">
      <h2>Create a New Blog Post</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className='admin-editor'>
        <RichTextEditor editorState={editorState} onChange={handleEditorChange} />
      </div>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default Admin;
