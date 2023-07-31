({
	
	init: function(component, event, helper) {
	    component.set("v.isOpen", true);
	    component.set("v.Spinner",true);
	     var url = location.href;
        var baseURL = url.substring(0, url.indexOf('--', 0));
        component.set("v.BaseURLs",baseURL);
       
	   
	    helper.getEmailSubmittal(component, event, helper);
	    
	},
	
	 /* Created by Model Start */
    openModel: function(component, event, helper) {
        // for Display Model,set the "isOpen" attribute to "true"
        component.set("v.isOpen", true);
    },
    
    closeModel: function(component, event, helper) {
        // for Hide/Close Model,set the "isOpen" attribute to "Fasle"  
        // component.set("v.isOpen", false);
        
        var action = component.get("c.getListViews");
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                var listviews = response.getReturnValue();
                // var url = location.href;
                // var baseURL = url.substring(0, url.indexOf('--', 0));
                 var baseURL = component.get("v.BaseURLs");
                window.open(baseURL+'.lightning.force.com/lightning/r/'+escape(component.get("v.RecordId"))+'/related/buildertek__Submittals__r/view','_parent');
            }
        });
        $A.enqueueAction(action);
    },
    
    
    saveModel: function(component, event, helper) {
        // for Hide/Close Model,set the "isOpen" attribute to "Fasle" 
        helper.sendEmailSubmittal(component, event, helper);
         
    },
    
    handleCheck : function(component, event, helper) {
        var checkbox = event.getSource();  
        var Submittals = component.get("v.objInfo");
	    for(var i=0 ; i < Submittals.length;i++){
	        console.log('=========> ',i +' '+ Submittals.length);
	        if(Submittals[i].buildertekSubmittalRecord.Id == checkbox.get("v.text") && Submittals[i].SubmittalCheck == false){
	            Submittals[i].SubmittalCheck = true;
	            if(Submittals.length > 1){
	                component.find("checkContractor")[i].set("v.value", true);
	            }
	            else{
	                component.find("checkContractor").set("v.value", true);
	            }
	        }
	        else if(Submittals[i].buildertekSubmittalRecord.Id == checkbox.get("v.text") && Submittals[i].SubmittalCheck == true){
	             Submittals[i].SubmittalCheck = false;
	        }
	    }
    },
    
    selectAll : function(component, event, helper) {        
        var selectedHeaderCheck = event.getSource().get("v.value"); 
		var Submittals = component.get("v.objInfo");
        var getAllId = component.find("checkContractor"); 
        if(Submittals != null){
            if(Submittals.length > 1){
                if(! Array.isArray(getAllId)){
                   if(selectedHeaderCheck == true){ 
                      component.find("checkContractor").set("v.value", true); 
                      component.set("v.selectedCount", 1);
                   }else{
                       component.find("checkContractor").set("v.value", false);
                       component.set("v.selectedCount", 0);
                   }
                }
                else{ 
                    if (selectedHeaderCheck == true) {
                        for (var i = 0; i < getAllId.length; i++) {
        					component.find("checkContractor")[i].set("v.value", true); 
        					var checkbox = component.find("checkContractor")[i].get("v.text");  
                    	        Submittals[i].SubmittalCheck = true;
                    	    
                        }
                    } 
                    else{
                        for (var i = 0; i < getAllId.length; i++) {
            				component.find("checkContractor")[i].set("v.value", false); 
            				
            				var checkbox = component.find("checkContractor")[i].get("v.text"); 
            				var Submittals = component.get("v.objInfo");
            	                Submittals[i].SubmittalCheck = false;
                       }
                   } 
                } 
            }
            else{
                var i=0;
                    if (selectedHeaderCheck == true) {
                        	component.find("checkContractor").set("v.value", true); 
        					var checkbox = component.find("checkContractor").get("v.text");  
                    	        Submittals[i].SubmittalCheck = true;
                    	    
                        
                    } 
                    else{
                       		component.find("checkContractor").set("v.value", false); 
            				
            				var checkbox = component.find("checkContractor").get("v.text"); 
            				var Submittals = component.get("v.objInfo");
            	                Submittals[i].SubmittalCheck = false;
                       
                   } 
            }
        }
     
    },
    
    
})