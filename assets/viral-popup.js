/**
 * Viral Popup - Newsletter Signup
 * Shows after 5 seconds on page
 */

class ViralPopup extends HTMLElement {
  constructor() {
    super();
    this.popupShown = false;
    this.popupClosed = false;
    this.storageKey = 'cozybooknook_popup_shown';
  }

  connectedCallback() {
    // Check if popup was already shown in this session
    if (sessionStorage.getItem(this.storageKey)) {
      return;
    }

    // Show popup after 5 seconds
    setTimeout(() => {
      if (!this.popupClosed) {
        this.showPopup();
      }
    }, 5000);

    // Setup close handlers
    this.setupCloseHandlers();
  }

  showPopup() {
    if (this.popupShown) return;
    
    this.popupShown = true;
    this.classList.add('visible');
    
    // Store in session storage
    sessionStorage.setItem(this.storageKey, 'true');
  }

  hidePopup() {
    this.classList.remove('visible');
    this.popupClosed = true;
  }

  setupCloseHandlers() {
    // Close on X button click
    const closeBtn = this.querySelector('.popup-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => this.hidePopup());
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.classList.contains('visible')) {
        this.hidePopup();
      }
    });
  }
}

customElements.define('viral-popup', ViralPopup);
