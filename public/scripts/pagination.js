document.querySelector("#pages").addEventListener("click", event => {
    event.preventDefault()
    const page = document.querySelectorAll(".page-item")
    console.log(page)
    
    //document.getElementById("demo").innerHTML = "Hello World";
  });