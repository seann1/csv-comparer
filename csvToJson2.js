(function() {
  var script = document.createElement('script');
  script.src = 'http://code.jquery.com/jquery-1.11.0.min.js';
  script.type = 'text/javascript';
  document.getElementsByTagName('head')[0].appendChild(script);


      $.ajax({
          type: "GET",
          url: "majorsFromxml.json",
          dataType: "text",
          success: function(data) {consoleLogger(data);}
       });

  function consoleLogger(data) {
        console.log(data);
  };
})();