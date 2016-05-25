$(document).ready(function() {
    $('select').material_select();
    $('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrain_width: false, // Does not change width of dropdown to that of the activator
      hover: true, // Activate on hover
      gutter: 0, // Spacing from edge
      belowOrigin: true, // Displays dropdown below the button
      alignment: 'right' // Displays dropdown with edge aligned to the left of button
    }
  );
   $(".button-collapse").sideNav({
   	  menuWidth: 300, // Default is 240
      edge: 'right', // Choose the horizontal origin
      closeOnClick: false // Closes side-nav on <a> clicks, useful for Angular/Meteor
   });
   // like button change color
   $(".like-button").click(function(e){
   		if($(this).hasClass("grey")){
   			$(this).removeClass("grey");
   			$(this).addClass("deep-purple");
   			Materialize.toast('Product Liked', 4000, 'rounded');
   		}
   });

   // change chevron
   $(".collapsible-header").click(function(){
   	 $(this).find('.change').toggleClass('mdi-chevron-left mdi-chevron-down');
   });
 
  });

// scroll fire for post 
var options = [    
    {selector: '#post', offset: 200, callback: 'Materialize.showStaggeredList("#post")' },
  ];
  Materialize.scrollFire(options);

  // for filter effect
   
var dropdownFilter = {
  
  // Declare any variables we will need as properties of the object
  
  $filters: null,
  $reset: null,
  groups: [],
  outputArray: [],
  outputString: '',
  
  // The "init" method will run on document ready and cache any jQuery objects we will need.
  
  init: function(){
    var self = this; // As a best practice, in each method we will asign "this" to the variable "self" so that it remains scope-agnostic. We will use it to refer to the parent "dropdownFilter" object so that we can share methods and properties between all parts of the object.
    
    self.$filters = $('#filters');
    self.$container = $('#designs');
    
    self.$filters.find('fieldset').each(function(){
      self.groups.push({
        $dropdown: $(this).find('select'),
        active: ''
      });
    });
    
    self.bindHandlers();
  },
  
  // The "bindHandlers" method will listen for whenever a select is changed. 
  
  bindHandlers: function(){
    var self = this;
    
    // Handle select change
    
    self.$filters.on('change', 'select', function(e){
      e.preventDefault();
      
      self.parseFilters();
    });
    
  },
  
  // The parseFilters method pulls the value of each active select option
  
  parseFilters: function(){
    var self = this;
 
    // loop through each filter group and grap the value from each one.
    
    for(var i = 0, group; group = self.groups[i]; i++){
      group.active = group.$dropdown.val();
    }
    
    self.concatenate();
  },
  
  // The "concatenate" method will crawl through each group, concatenating filters as desired:
  
  concatenate: function(){
    var self = this;
    
    self.outputString = ''; // Reset output string
    
    for(var i = 0, group; group = self.groups[i]; i++){
      self.outputString += group.active;
    }
    
    // If the output string is empty, show all rather than none:
    
    !self.outputString.length && (self.outputString = 'all'); 
    
    //console.log(self.outputString); 
    
    // ^ we can check the console here to take a look at the filter string that is produced
    
    // Send the output string to MixItUp via the 'filter' method:
    
	  if(self.$container.mixItUp('isLoaded')){
    	self.$container.mixItUp('filter', self.outputString);
	  }
  }
};
  
// On document ready, initialise our code.

$(function(){
      
  // Initialize dropdownFilter code
      
  dropdownFilter.init();
      
  // Instantiate MixItUp
      
  $('#designs').mixItUp({
    controls: {
      enable: false // we won't be needing these
    },
    callbacks: {
      onMixFail: function(){
        alert('No items were found matching the selected filters.');
      }
    }
  });    
});
