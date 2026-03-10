if (!customElements.get('conversion-tracker')) {
  class ConversionTracker extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      this.trackProductView();
      this.trackAddToCart();
      this.trackInventoryChecks();
    }

    trackProductView() {
      const productId = this.dataset.productId;
      const productTitle = this.dataset.productTitle;

      if (window.fbq) {
        window.fbq('track', 'ViewContent', {
          content_ids: [productId],
          content_name: productTitle,
          content_type: 'product'
        });
      }
    }

    trackAddToCart() {
      const form = this.querySelector('form[data-type="add-to-cart-form"]');
      if (!form) return;

      form.addEventListener('submit', (e) => {
        const variantId = form.querySelector('input[name="id"]').value;
        const quantity = form.querySelector('input[name="quantity"]').value;
        const productTitle = this.dataset.productTitle;

        if (window.fbq) {
          window.fbq('track', 'AddToCart', {
            content_ids: [variantId],
            content_name: productTitle,
            content_type: 'product',
            value: quantity,
            currency: 'USD'
          });
        }
      });
    }

    trackInventoryChecks() {
      const scarcityBadges = this.querySelectorAll('.product-badges__badge--scarcity');
      if (scarcityBadges.length > 0 && window.fbq) {
        window.fbq('track', 'ViewContent', {
          content_type: 'product',
          value: 1,
          currency: 'USD'
        });
      }
    }
  }

  customElements.define('conversion-tracker', ConversionTracker);
}

if (!customElements.get('rating-display')) {
  class RatingDisplay extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      this.enhanceRatingDisplay();
    }

    enhanceRatingDisplay() {
      const rating = this.querySelector('.product-card__rating-value');
      if (!rating) return;

      const ratingValue = parseFloat(rating.textContent);
      if (ratingValue >= 4.5) {
        rating.classList.add('rating-excellent');
      } else if (ratingValue >= 4) {
        rating.classList.add('rating-great');
      } else if (ratingValue >= 3) {
        rating.classList.add('rating-good');
      }
    }
  }

  customElements.define('rating-display', RatingDisplay);
}

if (!customElements.get('inventory-alert')) {
  class InventoryAlert extends HTMLElement {
    constructor() {
      super();
    }

    connectedCallback() {
      this.observeInventoryChanges();
    }

    observeInventoryChanges() {
      const badge = this.querySelector('.product-badges__badge--scarcity');
      if (!badge) return;

      const inventoryText = badge.textContent.trim();
      const quantity = parseInt(inventoryText.match(/\d+/)[0]);

      if (quantity <= 5) {
        badge.classList.add('urgent');
      } else if (quantity <= 10) {
        badge.classList.add('warning');
      }
    }
  }

  customElements.define('inventory-alert', InventoryAlert);
}
