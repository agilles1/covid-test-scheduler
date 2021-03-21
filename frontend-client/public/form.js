const openmodal = document.getElementById("create-apt-btn")
const overlay = document.querySelector('.modal-overlay')
const closemodal = document.getElementById('modal-close')

openmodal.addEventListener('click', toggleModal)
overlay.addEventListener('click', toggleModal)
closemodal.addEventListener('click', toggleModal)

function toggleModal () {
  const body = document.querySelector('body')
  const modal = document.querySelector('.modal')
  modal.classList.toggle('opacity-0')
  modal.classList.toggle('pointer-events-none')
  body.classList.toggle('modal-active')
}