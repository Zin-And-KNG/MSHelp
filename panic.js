  // Add event listener on keydown
  document.addEventListener('keydown', (event) => {
    var name = event.key;
    var code = event.code;
    //Panic on keypress
     if (code === 'Backquote'){
         alert("workin");
     }
  }, false);