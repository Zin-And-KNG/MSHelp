document.addEventListener('keydown', (event) => {
    var name = event.key;
    var code = event.code;
    
    if(name == k){
      alert("is working");
    }
  }, false);
  function myFunction(x) {
    x.classList.toggle("change");
  }