// フォーカスされた位置の保存用変数
let focusedElementBeforeModal

//各要素のODMを取得
const modal = document.querySelector('.modal')
const modalOverlay = document.querySelector('.modal-overlay')
const modalToggle = document.querySelector('.modal-toggle')


const openModal = () => {
  //フォーカス中のDOMを保存する
  focusedElementBeforeModal = document.activeElement

  const focusableElementsString = 'a[href], area[href], input:not([disabled]), button:not([disabled]), object, embed, [tabindex="0"], [contenteditable]'
  let focusableElements = modal.querySelectorAll(focusableElementsString)

  focusableElements = [].slice.call(focusableElements)

  let firstTabStop = focusableElements[0]
  let lastTabStop = focusableElements[focusableElements.length -1]

  modal.classList.add('is-modal')
  modalOverlay.classList.add('is-modal-overlay')

  firstTabStop.focus()

  const trapTabKey = (e) => {
    if (e.keyCode === 9) {

      if(e.shiftKey) {
        if(document.activeElement === firstTabStop) {
          e.preventDefault()
          lastTabStop.focus()
        }
      } else {
        if (document.activeElement === lastTabStop) {
          e.preventDefault();
          firstTabStop.focus();
        }
      }
    }

    if (e.keyCode === 27) {
      closeModal();
    }
  }

  modal.addEventListener('keydown', trapTabKey)
  modalOverlay.addEventListener('click', closeModal)
  const closeBtn = modal.querySelector('.close');
  closeBtn.addEventListener('click', closeModal);
}

const closeModal = () => {
  // Hide the modal and overlay
  modal.classList.remove('is-modal')
  modalOverlay.classList.remove('is-modal-overlay')

  // Set focus back to element that had it before the modal was opened
  focusedElementBeforeModal.focus();
}

//  クリックイベント
modalToggle.addEventListener('click', openModal)