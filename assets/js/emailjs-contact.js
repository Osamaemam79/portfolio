(function () {
  const PUBLIC_KEY = 'ZHepplAU1wf0MxY3q';
  const SERVICE_ID = 'service_yuitdna';
  const TEMPLATE_ID = 'template_qthprqq';

  if (!window.emailjs) {
    console.warn('EmailJS SDK not loaded.');
    return;
  }

  emailjs.init(PUBLIC_KEY);

  document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const btn = form.querySelector('button[type="submit"]');
      const name = (form.querySelector('[name="name"]') || {}).value || '';
      const email = (form.querySelector('[name="email"]') || {}).value || '';
      const phone = (form.querySelector('[name="phone"]') || {}).value || '';
      const message = (form.querySelector('[name="message"]') || {}).value || '';

      if (!name.trim() || !email.trim() || !message.trim()) {
        alert('Please fill all fields.');
        return;
      }

      btn.disabled = true;
      const prev = btn.textContent;
      btn.textContent = 'Sending...';

      const templateParams = {
        name: name,
        email: email,
        message: `You received a new message from your GitHub portfolio website:
        Name: ${name}
        Phone: ${phone}
        Email: ${email}
        Message:
        ${message}`,
        title: 'New message from ' + name,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      // تحضير الخيارات لضمان إرسال المفتاح حتى لو فشل التمرير التلقائي
      emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
        .then(function (response) {
          alert('Message sent — thank you!');
          form.reset();
        }, function (error) {
          console.error('EmailJS send error:', error);
          alert('Failed to send message. Please try again later.');
        })
        .finally(function () {
          btn.disabled = false;
          btn.textContent = prev;
        });
    });
  });
})();