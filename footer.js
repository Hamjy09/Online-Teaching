function injectFooter() {
  try {
    // ================= Footer Section ==============
    const footerTemplate = `
        <footer class="footer-section">
          <section class="book-appointment">
            <h2>Book Appointment</h2>
            <div class="contact">
              <a class="whatsapp" href="https://wa.link/vd0psj" target="_blank">
                <img class="contact-icon" src="Icons/whatsapp.svg" alt="whatsApp Icon">
                <p>+923362822631</p>
              </a>
              <a class="gmail" href="mailto:Fatima.kermani@gmail.com" target="_blank">
                <img class="contact-icon" src="Icons/gmail.svg" alt="Gmail Icon">
                <p>Fatima.kermani@gmail.com</p>
              </a>
            </div>
          </section>
          <section class="fee">
            <h2>Consultation Fee</h2>
            <div>
            <p>Online: Rs. 4,500</p>
            <p>In-Clinic: Rs. 4,500</p>
            <p>Follow ups: Rs. 3,500</p>
            </div>
          </section>
          <section class="social-links">
            <h2>Follow</h2>

            <div class="social">
              <a class="linkedin" href="https://www.linkedin.com/in/fatima-akhund-93514410b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank">
                <img class="social-icon" src="Icons/linkedin.svg" alt="linkedin Icon">
              </a>
              <a class="oladoc" href="https://oladoc.com/pakistan/karachi/dr/dermatologist/fatima-akhund/735833" target="_blank">
                <img class="social-icon" src="Icons/oladoc.svg" alt="oladoc Icon">
              </a>
              <a class="instagram" href="https://www.instagram.com/dr.fatimaakhund?igsh=b3QzNjNvdGdja2g3" target="_blank">
                <img class="social-icon" src="Icons/instagram.svg" alt="Instagram Icon">
              </a>
            </div>
          </section>
        </footer>
      `;

    document.body.insertAdjacentHTML("beforeend", footerTemplate);
  } catch (error) {
    console.error("Footer injection failed:", error);
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", injectFooter);
} else {
  injectFooter(); // If DOM already loaded
}
