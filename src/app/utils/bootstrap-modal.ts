export function hideModal(modal: HTMLElement) {
  (window as any).bootstrap.Modal.getInstance(modal).hide();
}
