$(document).ready(
    
function(){
$.validator.setDefaults({
   
    errorElement: "span",
    errorLabelContainer: "#errorLocation",
    errorClass: "help-block",
    highlight: function (element, errorClass, validClass) {
        // Only validation controls
        if (!$(element).hasClass('has-error')) {
            $(element).closest('.form-group').removeClass('has-success').addClass('has-error');
        } else {
            $(element).closest('.form-group').removeClass('has-error').removeClass('has-success').addClass('has-success');
        }
    },
    unhighlight: function (element, errorClass, validClass) {
        // Only validation controls
        if (!$(element).hasClass('has-success')) {
            $(element).closest('.form-group').removeClass('has-error').addClass('has-success');
        } else {
            $(element).closest('.form-group').removeClass('has-error').removeClass('has-success').addClass('has-success');
        }
    },
    errorPlacement: function(error, element) {

            error.insertAfter(element);
        
    }
});    
      
  $.validator.addMethod('extensionIndex', function(value, element,params) {
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
           return true;
       else 
           return false;
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

      
}, 'Your Free Length is too small, increase free length or decrease number of coils / wire diameter')*/

$("#extensionForm").validate(
            
        {
                      
            rules: {
                         
               eWireD: {
                    required: true,
                    extensionIndex: ['#extension-outer-diameter']
                },
               eWire_D: {
                    required: true
                },
                eWireDp: {
                    required:  true
                },
                eOuterD:{
                    required:  true,
                    extensionIndex: ['#extension-wire-diameter']
                },
                eOuter_D: {
                    required:  true
                },
                eOuterDp: {
                    required:  true
                },
                eFreeLH: {
                    required:  true
                },
                eFree_LH: {
                    required:  true
                },
                eFreeLHp: {
                    required:  true
                },
                eHookL: {
                    required:  true
                },
                eHook_L: {
                    required:  true
                },
                eHookLp: {
                    required:  true
                },
                eHookL2: {
                    required:  true
                },
                eHook_L2: {
                    required:  true
                },
                eHookLp2: {
                    required:  true
                }  
                
            },
            messages: {
               eWireD: {
                    required: 'Please enter the Wire Diameter'
                },
               eWire_D: {
                    required: 'Please enter the tolerance'
                },
                eWireDp: {
                    required:  'Please enter the tolerance'
                },
                OuterD:{
                    required:  'Please enter the Outer Diameter'
                },
                Outer_D: {
                    required:  'Please enter the tolerance'
                },
                OuterDp: {
                    required:  'Please enter the tolerance'
                },
                eFreeLH: {
                    required:  'Please enter the Free Length'
                },
                Free_LH: {
                    required:  'Please enter the tolerance'
                },
                eFreeLHp: {
                    required:  'Please enter the tolerance'
                },
                eHookL: {
                    required:  'Please enter the Compressable Coils'
                },
                eHook_L: {
                    required:  'Please enter the tolerance'
                },
                eHookLp: {
                    required:  'Please enter the tolerance'
                },            
                eHookL2: {
                    required:  'Please enter the Compressable Coils'
                },
                eHook_L2: {
                    required:  'Please enter the tolerance'
                },
                eHookLp2: {
                    required:  'Please enter the tolerance'
                }   
            },
            groups: {
                index: "eWireD eOuterD"
            }
         
});
});