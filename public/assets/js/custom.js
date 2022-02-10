

/* Menu Hover
  ------------------------------------------------------------- */
  $('#primary-menu li.parent').on('mouseenter',function(){
    $(this).find(".sub-menu").fadeIn();
    $(this).addClass('active');
  });
  $('#primary-menu li.parent').on('mouseleave',function(){
    $(this).find(".sub-menu").fadeOut();
    $(this).removeClass('active');
  });  

  $('#primary-menu-2 li.parent ul.sub-menu li').on('click',function(e){    
      e.stopPropagation();
  });
  




