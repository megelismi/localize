import React from 'react';
import { Modal } from 'react-bootstrap';

const LoadingModal = () => {
  return (
    <div class="modal fade bd-example-modal-sm" tabindex="-1" role="dialog" aria-hidden="true">
      <div class="modal-dialog modal-sm">
        <div class="modal-content">
          Loading...
        </div>
      </div>
    </div>
  )
}

export default LoadingModal;
