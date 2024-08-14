
import './index.css';

function Contact() {

    return (
        <div className="contact-page">
            <h1>Contact Me</h1>
            <p>If you have any questions, feel free to reach out to me through this form.</p>
            <div className="form-container">
                <form className='form'>
                    <div className="form-group">
                        <label htmlFor="name" className='name'>Name</label>
                        <input type="text" id="name" name="name" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email" className='name'>Email</label>
                        <input type="email" id="email" name="email" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="message" className='name'>Message</label>
                        <textarea id="message" name="message" rows="5" required></textarea>
                    </div>
                    <button type="submit" className="send-button">Send</button>
                </form>
            </div>
        </div>
    );
}

export default Contact;
