document.getElementById('contact-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const form = event.target;
    const formResponse = document.getElementById('form-response');
    const now = new Date().getTime();
    const submissionInterval = 60 * 60 * 1000;
    const lastSubmission = localStorage.getItem('lastSubmission');

    if (lastSubmission && now - lastSubmission < submissionInterval) {
        const timeLeft = Math.ceil((submissionInterval - (now - lastSubmission)) / (60 * 1000));
        formResponse.textContent = `You have submitted recently. Please wait ${timeLeft} minutes before submitting again.`;
        formResponse.style.color = 'red';
        return;
    }

    const formData = new FormData(form);

    try {
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
            formResponse.textContent = 'Your message has been sent successfully!';
            formResponse.style.color = 'green';
            localStorage.setItem('lastSubmission', now.toString());
            form.reset();
        } else {
            const errorData = await response.json();
            formResponse.textContent = errorData.error || 'Failed to send message. Please try again later.';
            formResponse.style.color = 'red';
        }
    } catch (error) {
        console.error('Error sending the form:', error);
        formResponse.textContent = 'An error occurred. Please try again.';
        formResponse.style.color = 'red';
    }
});


// Typing Animation
document.addEventListener('DOMContentLoaded', function() {
    const text = "Hi, I'm Tanishq Saini";
    const typingElement = document.getElementById('typing-text');
    let index = 0;
    let isDeleting = false;
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseTime = 2000;

    function type() {
        if (!isDeleting) {
            typingElement.textContent = text.substring(0, index);
            index++;
            if (index > text.length) {
                isDeleting = true;
                setTimeout(type, pauseTime);
            } else {
                setTimeout(type, typingSpeed);
            }
        } else {
            typingElement.textContent = text.substring(0, index);
            index--;
            if (index < 0) {
                isDeleting = false;
                setTimeout(type, pauseTime);
            } else {
                setTimeout(type, deletingSpeed);
            }
        }
    }

    type();
});