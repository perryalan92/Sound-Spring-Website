$(document).ready(
    
function(){


$.validator.setDefaults({
   
onkeyup: function(element) { $(element).valid(); },
onfocusout: function(element) { $(element).valid(); },
    
    errorElement: "span",
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
        
            error.insertAfter($(element))
        
    }
});    
  $.validator.addMethod('compressionIndex', function(value, element,params) {
   var thisValue = value
   var otherValue = $('[name="' + params[0] + '"]').val()
   
         
     
  
   //check input   
   if(thisValue!='' && otherValue!=''){
        //dynamically assign variables
      if(element.id == 'compression-outer-diameter'){
           outerDiameter = parseFloat(thisValue) 
           wireDiameter = parseFloat(otherValue)    
       }
       else if(element.id == 'compression-wire-diameter'){
            wireDiameter = parseFloat(thisValue)    
            outerDiameter = parseFloat(otherValue)          
       }
       else{
           wireDiameter =parseFloat($('#compression-wire-diameter'))
           outerDiameter = parseFloat($('#compression-outer-diameter'))     
       }
       
       //MATH
       var meanDiameter = outerDiameter - wireDiameter

       var index = meanDiameter / wireDiameter    

       
                  if (4<=index && index<=15){

                if(!$(element).data('reval')) {
                    
                    var fields = $(params[1], element.form);
                    fields.data('reval', true).valid();
                    fields.data('reval', false);
                }
           document.getElementById('compression-index-field').innerHTML=index.toFixed(2).toString()
     
           return "true";
       }
       else {
                if(!$(element).data('reval')) {
                    
                    var fields = $(params[1], element.form);
                    fields.data('reval', true).valid();
                    fields.data('reval', false);
                }
           
           document.getElementById('compression-index-field').innerHTML= index.toFixed(2).toString()
           
           
           return false;
       }

       

   }
      else
      {
       return true}

      
}, 'Adjust Wire Diameter and Outer Diameter so index is between 4 and 15')
    
  $.validator.addMethod('compressionFreeLength', function(value, element ,params) {
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
       else{
            numCoils =       parseFloat($('#compression-active-coils'))    
           wireDiameter=   parseFloat($('#compression-wire-diameter'))        
           freeLength =     parseFloat($('#compression-free-length'))
       }
       
       
       //MATH
       var totalDeadLength = numCoils * wireDiameter
       
        var maxTravel =  .85 *(freeLength -  totalDeadLength)
        if(compressUnits==0){
            document.getElementById('compression-maximum-compression-field').innerHTML=maxTravel.toFixed(2).toString().concat(' in.')           
        }
        else if(compressUnits==1){
             document.getElementById('compression-maximum-compression-field').innerHTML=maxTravel.toFixed(2).toString().concat(' mm.')               
        } else
        {}

        
       //RETURN
       if (totalDeadLength<=freeLength){
                       if(!$(element).data('freereval')) {
                
                var fields = $(params[2], element.form);
                fields.data('freereval', true).valid();
                fields.data('freereval', false);
            }
           return true
       } else{
           if(!$(element).data('freereval')) {
                
                var fields = $(params[2], element.form);
                fields.data('freereval', true).valid();
                fields.data('freereval', false);
            }
           return false
       }

   }
  else
    return true

      
}, 'Free length smaller than fully compressed spring. Increase Free Length or decrease Wire Diameter/Compressable Coils.')
    
  $.validator.addMethod('compressionRate', function() {
  //fields
var young = $('#compression-wire-type').val()
var wireDiameter = $('#compression-wire-diameter').val()
var outerDiameter = $('#compression-outer-diameter').val()
var numberCoils = $('#compression-active-coils').val()

if(//check if fields filled out
    young!=''&&
    wireDiameter!=''&&
    outerDiameter!=''&&
   numberCoils!=''
){
       

     youngNum = parseFloat(young)
     wireDiameterNum = parseFloat(wireDiameter)
     outerDiameterNum = parseFloat(outerDiameter)
     numberCoilsNum = parseFloat(numberCoils)
 var meanDiameter = outerDiameterNum - wireDiameterNum   
    
    //check units used 
    if(compressUnits == 0){
        var rate =((youngNum * Math.pow(wireDiameterNum, 3)) / ( 8 * numberCoilsNum * Math.pow(meanDiameter, 3))).toFixed(4).toString().concat(' lb./in.')
        document.getElementById('compression-rate-field').innerHTML = rate        
    } else if(compressUnits==1){
        
        var rate =  (1000* (youngNum * Math.pow(wireDiameterNum, 3)) / ( 8 * numberCoils * Math.pow(meanDiameter, 3))).toFixed(4).toString().concat(' N/m')
        document.getElementById('compression-rate-field').innerHTML = rate
        
    }
    
} 

return true
    


   }, '?') 
    
    
$("#compressForm").validate(
            
        {
            rules: {
                
               compression_wire_type:{
                   required: true,
                  
                   compressionRate: true
               },  
               WireD: {
                   required: true,
                   compressionIndex: ['OuterD','.index'],
                   compressionFreeLength: ['#compression-free-length','#compression-active-coils','.freelength'],
                   compressionRate: true

                    
                },
               Wire_D: {
                    required: true
                   
                },
                WireDp: {
                    required:  true
                },
                OuterD:{

                    compressionIndex: ['WireD','.index'],
                    required: true,
                    compressionRate: true

                },
                Outer_D: {
                    required:  true
                },
                OuterDp: {
                    required:  true
                },
                FreeL: {
                    required:  true,
                    compressionFreeLength: ['#compression-wire-diameter','#compression-active-coils','.freelength'],
                    compressionRate: true
                },
                Free_L: {
                    required:  true
                },
                FreeLp: {
                    required:  true
                },
                ActiveC: {
                    required:  true,
                    compressionFreeLength: ['#compression-wire-diameter', '#compression-free-length','.freelength'],
                    compressionRate: true
                },
                Active_C: {
                    required:  true
                },
                ActiveCp: {
                    required:  true
                }            
                
            },
            messages: {
               wire: {
                    required: 'Please enter the Wire Diameter'
                },
               Wire_D: {
                    required: 'Please enter the tolerance'
                },
                WireDp: {
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
                FreeL: {
                    required:  'Please enter the Free Length'
                },
                Free_L: {
                    required:  'Please enter the tolerance'
                },
                FreeLp: {
                    required:  'Please enter the tolerance'
                },
                ActiveC: {
                    required:  'Please enter the Compressable Coils'
                },
                Active_C: {
                    required:  'Please enter the tolerance'
                },
                ActiveCp: {
                    required:  'Please enter the tolerance'
                }            
                
            }
         
});
});