import './index.css';
import { useState } from 'react';
import { API_BASE_URL } from '../../config';
import Modal from '../../components/modal';

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch(API_BASE_URL + '/mails/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();
            if (response.ok) {
                setIsModalOpen(true);
                setFormData({
                    name: '',
                    email: '',
                    message: ''
                });
                setTimeout(() => {
                    setIsModalOpen(false);
                }, 2000);
            } else {
                alert('Failed to send message: ' + result.message);
            }
        } catch (error) {
            alert('An error occurred: ' + error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="contact-page">
            <h1>Contact Me</h1>
            <p>If you have any questions, feel free to reach out to me through this form.</p>
            <div className="form-container">
                <form className='form' onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name" className='name'>Name</label>
                        <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            required 
                            value={formData.name} 
                            onChange={handleChange} 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email" className='name'>Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            required 
                            value={formData.email} 
                            onChange={handleChange} 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message" className='name'>Message</label>
                        <textarea 
                            id="message" 
                            name="message" 
                            rows="5" 
                            required 
                            value={formData.message} 
                            onChange={handleChange} 
                        ></textarea>
                    </div>
                    <button type="submit" className="send-button" disabled={isLoading}>
                        {isLoading ? 'Sending...' : 'Send'}
                    </button>
                </form>
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h2>Thank You!</h2>
                <p>Your message has been sent successfully.</p>
            </Modal>
        </div>
    );
}

export default Contact;
