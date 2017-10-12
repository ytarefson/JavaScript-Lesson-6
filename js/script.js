$(document).ready( function() {
 
  $.ajax({
    type: "POST",
    url: 'js/products.json',
    
    dataType: "json",
    success: function(data) {
      
      for (var i = 1; i < data.length; i++) {

        var slide = '<div class="slide">';
        slide +=  '<img src="'+ data[i].href +'">';
        slide += '<span class="productName">'+data[i].name+'</span>';
        slide += '<span class="productPrice">'+data[i].price+'</span>';
        slide += '</div>';      
        $('.owl-carousel').append(slide);
      }

      $('.owl-carousel').owlCarousel( {
        items: 6,
        margin: 10,
        loop: true,
        stagePadding: 10,
        center: false,
        autoplay: true,
        autoplayTimeout: 2000,
        fluidSpeed: 1
      });
    },
  });

  $('.userInput').focus(function() {
  	$(this).parent().addClass('active');
  	}).blur(function() {
  		$(this).slideDown().parent().removeClass('active');  		
  })

  $('.formBox').on('submit', function(event) {
    var name = $('#name');
    var mail = $('#email');
    var phone = $('#phone');
    var msg = $('#msg');

    var namePattern = /\w/igm;
    var mailPattern = /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/igm;
    var phonePattern = /\+\d{6,9}/;

    var errorText = '<p>';
    errorText += validateName();
    errorText += validateMail();
    errorText += validatePhone();
    errorText += validateMsg();
    errorText += '</p>';
    
      if( name.val().search(namePattern) != 0 || mail.val().search(mailPattern) != 0 || phone.val().search(phonePattern) != 0 || msg.val() == '' ){
        event.preventDefault(); 
        $('div#dialog p').text('');
        $('div#dialog p').append(errorText);
        $('#dialog').dialog({
          title: 'Error'
        })
      }
 
    function validateName() {
      var pattern = /\w/igm;
      var input = $('#name');
      var answer = '';
      
      if (input.val() != '') {
        if (input.val().search(pattern) == 0 ) { 
          answer = 'Name is correct <br>';
        } else {
          answer = 'Put a correct name<br>';
        }
      } else {
        answer = 'Name cant be empty<br>';
      }
      return answer;
    };
   function validateMail() {
      var pattern = /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/igm;
      var input = $('#email');
      var answer = '';
      if (input.val() != '') {
        if (input.val().search(pattern) == 0 ) { 
          answer = 'e-mail is correct<br>';
        } else {
          answer = 'Put a correct e-mail<br>';
        }
      } else {
        answer = 'E-mail cant be empty<br>';
      }
      return answer;
    };
    function validatePhone() {
      var pattern = /\+\d{6,9}/;
      var input = $('#phone');
      var answer = '';
      if (input.val() != '') {
        if (input.val().search(pattern) == 0 ) { 
          answer = 'Phone number is correct<br>';
        } else {
          answer = 'Put a correct phone number<br>';
        }
      } else {
        answer = 'Phone number cant be empty<br>';
      }
      return answer;
    };
    function validateMsg() {
      
      var input = $('#msg');
      var answer = 'Message is fine<br>';
      if (input.val() == '') {
        answer = 'Message cant be empty<br>';
      }
      return answer;
    };
  });
});