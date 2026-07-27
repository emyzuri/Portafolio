/**
 * Multi-Page Portfolio Logic - Emily Zurita
 */

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const navLinks = document.querySelector('.nav-links');

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // Toast Notification Handler
  window.copyText = (text, typeName = 'Dato') => {
    navigator.clipboard.writeText(text).then(() => {
      showToast(`¡${typeName} copiado al portapapeles!`);
    }).catch(() => {
      showToast(`Copiado: ${text}`);
    });
  };

  function showToast(message) {
    const toast = document.getElementById('toastNotification');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  }

  // Contact Form Submission Handler (Direct Background Fetch + Mailto Backup)
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const submitBtn = document.getElementById('submitBtn');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="ri-loader-4-line ri-spin"></i> Enviando...';
      }

      const name = document.getElementById('senderName')?.value || '';
      const email = document.getElementById('senderEmail')?.value || '';
      const message = document.getElementById('senderMessage')?.value || '';

      // 1. Direct Background API Send to FormSubmit
      fetch('https://formsubmit.co/ajax/emilyzurita17@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: name,
          email: email,
          message: message,
          _subject: `Propuesta de Trabajo para Emily Zurita de ${name}`
        })
      })
      .then(response => response.json())
      .then(data => {
        showToast("¡Mensaje enviado directamente a emilyzurita17@gmail.com!");
        contactForm.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<i class="ri-check-line"></i> ¡Enviado con Éxito!';
          setTimeout(() => {
            submitBtn.innerHTML = '<i class="ri-send-plane-fill"></i> Enviar Mensaje Directo';
          }, 3000);
        }
      })
      .catch(error => {
        // Fallback: Open Mailto Draft immediately
        const mailtoUrl = `mailto:emilyzurita17@gmail.com?subject=${encodeURIComponent('Propuesta de Trabajo de ' + name)}&body=${encodeURIComponent('Nombre: ' + name + '\nCorreo: ' + email + '\n\nMensaje:\n' + message)}`;
        window.location.href = mailtoUrl;

        showToast("Abriendo borrador de correo prellenado para emilyzurita17@gmail.com...");
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<i class="ri-send-plane-fill"></i> Enviar Mensaje Directo';
        }
      });
    });
  }
});
