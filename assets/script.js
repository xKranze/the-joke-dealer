// alert("Some jokes can be innapropriate, Click OK if you are 18+ of age!");

const notification =document.getElementById('notification');
const notificationClass= document.getElementById('div.notification');

notification.addEventListener('click',() => {
notification.classList.remove('notification')
notificationClass.classList.remove('notificationClass')

});  