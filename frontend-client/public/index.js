const app = new AppContainer
const saveButton = document.getElementById("create-new-apt-btn")

app.getTestTimes()
app.getUnassignedPatients()
saveButton.addEventListener("click", function(event){Appointment.createNewAppointment(event)})


const openmodal = document.querySelectorAll('.modal-open')
const overlay = document.querySelector('.modal-overlay')
const closemodal = document.querySelectorAll('.modal-close')

for (let i = 0; i < openmodal.length; i++) {
      openmodal[i].addEventListener('click', function(event){
    	toggleModal()
      })
}
overlay.addEventListener('click', toggleModal)
for (let i = 0; i < closemodal.length; i++) {
      closemodal[i].addEventListener('click', toggleModal)
    }
    
    document.onkeydown = function(evt) {
      evt = evt || window.event
      let isEscape = false
      if ("key" in evt) {
    	isEscape = (evt.key === "Escape" || evt.key === "Esc")
      } else {
    	isEscape = (evt.keyCode === 27)
      }
      if (isEscape && document.body.classList.contains('modal-active')) {
    	toggleModal()
      }
    };
    
    
    function toggleModal () {
      const body = document.querySelector('body')
      const modal = document.querySelector('.modal')
      modal.classList.toggle('opacity-0')
      modal.classList.toggle('pointer-events-none')
      body.classList.toggle('modal-active')
    }
