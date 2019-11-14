/* Toggle mobile menu open / closed */
$(document).ready(function(){
    $(".hamburgerMenu, .mobileClick").click(function(){
        $("div.mobileMenu").slideToggle();
    });
});

/* hide initial recall info panel and show recall results, or show error message */
$(document).ready(function(){
    $("#checkRecall1").click(function(){
		if ((document.getElementById('VINLookup1').value === '') && (document.getElementById('error1').innerHTML === '')) { 
   $('#error1').append('This VIN appears incorrect. Please try again.');
    } else {
		/* ---#### CODE TO TRIGGER RECALL CHECK GOES HERE ####--- */
	
        $(".Vin-Check-1, .Vin-Check-2").toggleClass("hide");
      }
    });
});

$(document).ready(function(){
    $("#checkRecall2").click(function(){
		if ((document.getElementById('VINLookup2').value === '') && (document.getElementById('error2').innerHTML === '')) { 
   $('#error2').append('This VIN appears incorrect. Please try again.');
    } else {
		console.log("test");
		/* ---#### CODE TO TRIGGER RECALL CHECK GOES HERE ####--- */

	      }
    });
});


/* toggle airbag FAQ categories with plus / minus symbol */

$(document).ready(function(){
    $('.abFaq').click(function(){
  if($(this).attr("class") == "abFaq faqMinus") {
    $(".abFaq").attr("class", "abFaq faqPlus");
    $(".option-"+$(this).attr("option")).hide();
    $(this).attr("class", "abFaq faqPlus");
  } else {
    $(".abFaq").attr("class", "abFaq faqPlus");
      $(".options").hide();
      $(".option-"+$(this).attr("option")).slideDown(400);
      $(this).attr("class", "abFaq faqMinus");
  }
});
});

/* toggle Mazda Takata Recall Action Plan */

$(document).ready(function(){
    $(".rapClick").click(function(){
        $(".rapToggle").slideToggle();
    });
});

/* code to close panels from within */

$(document).ready(function(){
    $('.faqPanel').click(function(){
        $(".options").slideUp(400);
        $(".abFaq").attr("class", "abFaq faqPlus");
        $('.question').removeClass('show');
        $('.answer').addClass('hide');
		    $('.question').find('span').html('+');
    });
});

/* toggle questions and answers with plus / minus symbol */
$( '.question' ).click(function() {
   $(this).toggleClass('show');
   $(this).next().toggleClass('hide');
   if ($(this).attr('class') !== 'question') {
     $(this).find('span').html('-');
   } else {
     $(this).find('span').html('+');
   }
});

/* Anchor tag smooth scrolling */

$(document).ready(function() {
	$(document).on( "click", 'a[href^="#"]', function(e) {
		e.preventDefault();
		var target = this.hash,
		$target = $(target); 
		$('html, body').animate({ scrollTop: $target.offset().top}, 1000); 
	}); 
});


$("a[href='#returnTop']").click(function() {
  $("html, body").animate({ scrollTop: 0 }, 500);
  return false;
}); 





