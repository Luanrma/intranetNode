const searchTopic = document.querySelector("#search-topic")

searchTopic.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
   event.preventDefault();
   //searchTopic.innerHTML = "teste" 
   window.location.href = `/search-topics?search=${searchTopic.value}`;
  }
});