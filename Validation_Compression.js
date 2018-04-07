$(document).ready(
    
function(){
$.validator.setDefaults({
    
   
    errorElement: "span",
    errorClass: "help-block",
    highlight: function (element) {
        $(element).closest('.form-group').addClass('has-error');
    },

    unhighlight: function (element) {
        $(element).closest('.form-group').removeClass('has-error');
    },

    errorPlacement: function(error, element) {
        if($(element).closest('.form-group').length) {
            error.insertAfter(element.parent());
        } else {
            error.insertAfter(element);
        }
    }
});    
      
   $.validator.addMethod('compressionIndex', function(value, element,params) {
    alert('hi')
   var thisValue = value
   var otherValue = $(params[0]).val()
     
  
   //check input   
   if(thisValue!='' && otherValue!=''){
        //dynamically assign variables
       if(element.id == 'extension-outer-diameter'){
           outerDiameter = parseFloat(thisValue) 
           wireDiameter = parseFloat(otherValue)    
       }
       else if(element.id == 'extension-wire-diameter'){
            wireDiameter = parseFloat(thisValue)    
            outerDiameter = parseFloat(otherValue)          
       }
       else{return false}
       //warning TO REMOVE 
         
       //MATH
       var meanDiameter = outerDiameter - wireDiameter

       var index = meanDiameter / wireDiameter
       //WARNING
       /*
              alert('validation: compressionIndex '+
           'meanDiameter:'+meanDiameter+
             'wireDiameter:'+wireDiameter
             +'index:'+index
             +'4<=index<=15:'+(4<=index && index<=15)) 
        */
       //RETURN
       if (4<=index && index<=15)
           return true
       else 
           return false
   }
      else
      {return true}

      
}, 'Your Wire Diameter is too large or Outer Diameter is too small')
    /*
  $.validator.addMethod('compressionFreeLength', function(value, element,params) {
   var thisValue = value
   var otherValue = $(params[0]).val()
   var otherValue2 = $(params[1]).val()   
   
   //check input   
   if(thisValue!='' && otherValue!='' && otherValue2!=''){
        //dynamically assign variables
       if(element.id == 'compression-free-length'){
           freeLength = parseFloat(thisValue) 
           numCoils = parseFloat(otherValue2)    
           wireDiameter = parseFloat(otherValue)    
       }
       else if(element.id == 'compression-wire-diameter'){
            wireDiameter = parseFloat(thisValue)    
           freeLength = parseFloat(otherValue)                     
            numCoils = parseFloat(otherValue2)    
       }
       else if(element.id == 'compression-active-coils'){
           numCoils =       parseFloat(thisValue)    
           wireDiameter=   parseFloat(otherValue)        
           freeLength =     parseFloat(otherValue2) 
       }
       else{return false}
       //warning TO REMOVE 
       
       alert('validation: compressionFreeLength '+
           'freeLength:'+freeLength+
             'wireDiameter:'+wireDiameter
             +'numCoils:'+numCoils
             +'test:'+(numCoils * wireDiameter<freeLength))   
        
       //MATH
       var totalDeadLength = numCoils * wireDiameter

        
       //RETURN
       if (totalDeadLength<freeLength)
           return true
       else 
           return false
   }
      else
      {return true}

      
}, 'Increase free length or decrease number of coils / wire diameter')
*/
$("#compressForm").validate(
            
        {
                      
            rules: {
                         
               WireD: {
                    required: true,
                    compressionIndex: ['#compression-outer-diameter'],
                    //compressionFreeLength: ['#compression-free-length',
                     //                       '#compression-active-coils']
                },
               Wire_D: {
                    required: true
                },
                WireDp: {
                    required:  true
                },
                OuterD:{
                    required:  true,
                    compressionIndex: ['#compression-wire-diameter']

                },
                Outer_D: {
                    required:  true
                },
                OuterDp: {
                    required:  true
                },
                FreeL: {
                    required:  true,
                    //compressionFreeLength: ['#compression-wire-diameter',
                    //                        '#compression-active-coils']
                },
                Free_L: {
                    required:  true
                },
                FreeLp: {
                    required:  true
                },
                ActiveC: {
                    required:  true,
                    //compressionFreeLength: ['#compression-wire-diameter',
                     //                       '#compression-free-length']
                },
                Active_C: {
                    required:  true
                },
                ActiveCp: {
                    required:  true
                }            
                
            },
            messages: {
               WireD: {
                    notEmpty: 'Please enter the Wire Diameter'
                },
               Wire_D: {
                    notEmpty: 'Please enter the tolerance'
                },
                WireDp: {
                    notEmpty:  'Please enter the tolerance'
                },
                OuterD:{
                    notEmpty:  'Please enter the Outer Diameter'
                },
                Outer_D: {
                    notEmpty:  'Please enter the tolerance'
                },
                OuterDp: {
                    notEmpty:  'Please enter the tolerance'
                },
                FreeL: {
                    notEmpty:  'Please enter the Free Length'
                },
                Free_L: {
                    notEmpty:  'Please enter the tolerance'
                },
                FreeLp: {
                    notEmpty:  'Please enter the tolerance'
                },
                ActiveC: {
                    notEmpty:  'Please enter the Compressable Coils'
                },
                Active_C: {
                    notEmpty:  'Please enter the tolerance'
                },
                ActiveCp: {
                    notEmpty:  'Please enter the tolerance'
                }            
                
            },
            groups: {
                index: "WireD OuterD",
                freeLength:"WireD FreeL ActiveC"
            }
         
});
});