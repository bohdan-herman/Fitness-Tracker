import React from "react";

const Modal = ({
  isOpen = false,
  onClose,
  title = "",
  children,
  footer = null,
  size = "md",
  className = "",
}) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const sizeClass = `modal--${size}`;

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className={`modal ${sizeClass} ${className}`}>
        <div className="modal__header">
          <h2 className="modal__title h2">{title}</h2>
          <button
            className="modal__close-btn btn-icon"
            onClick={onClose}
            type="button"
            aria-label="Close modal"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className="modal__content">{children}</div>

        {footer && <div className="modal__footer">{footer}</div>}
      </div>
    </div>
  );
};

export default Modal;
