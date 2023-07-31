({
	doInit : function(component, event, helper) {
        component.set("v.Spinner", true);
        var dbAction = component.get("c.getTemplates");
        dbAction.setCallback(this, function(response) {
            var state = response.getState();
            var error = response.getError();

            console.log({state});
            console.log({error});

            if (state === "SUCCESS") {
                console.log( response.getReturnValue());
                var result= response.getReturnValue();
                result.forEach(function(value){
                    console.log(value);
                    if(value.Name === 'Quote'){
                        component.set("v.selectedTemplate" ,value.Id);
                        helper.getTemplateBody(component, event, helper);
                    }
                })
                // component.set("v.templates", response.getReturnValue());
                component.set("v.Spinner", false);
            }
        });

        $A.enqueueAction(dbAction);

       
    },
    scrolldown: function(component, event, helper) {

        document.getElementById('footer').scrollIntoView();

    },
    scrollup: function(component, event, helper) {

        document.getElementById('header').scrollIntoView(true);

    },
    // preiewEmailTemplate: function(component, event, helper) {
    //     console.log('Preview email template');

    //     var selectedTemplate = component.get("v.selectedTemplate");
    //     console.log(selectedTemplate);
    //     if (selectedTemplate != undefined) {
    //         component.set("v.isTemplateSelected", true);
    //         // helper.getTemplateBody(component, event, helper);
    //         var recordId = component.get("v.recordId");
    //         var action = component.get("c.getQuoteLines");
    //         action.setParams({
    //             recordId: recordId,
    //             templateId: component.get("v.selectedTemplate")
    //         });
    //         action.setCallback(this, function(response) {
    //             var state = response.getState();
    //             if (state === "SUCCESS") {
    //                 var result = response.getReturnValue();
    //                 console.log('get template body');
    //                 console.log({ result });
    //                 component.set("v.quoteLines", result);
    //             }
    //         });
    //         $A.enqueueAction(action);
    //     }
    // },

    closeModel: function(component, event, helper) {
        // location.reload(); 
        $A.get("e.force:closeQuickAction").fire();

    },
    downloadFile:function(component, event, helper) {
        var data= component.get("v.quoteLines");
        console.log({data});
        
        // var hidden_a = document.createElement('a'); 
        // hidden_a.setAttribute('href', 'data:application/pdf;charset=utf-8,' + encodeURIComponent(data)); 
        // hidden_a.setAttribute('download', "text_file.pdf"); 
        // document.body.appendChild(hidden_a); hidden_a.click(); 

        // Create a new Blob object from the result attribute.
        // const blob = new Blob([data], { type: 'application/pdf' });

        // // Create a new anchor element with the download attribute set.
        // const a = document.createElement('a');
        // a.setAttribute('href', window.URL.createObjectURL(blob));
        // a.setAttribute('download', 'my-file.pdf');

        // // Append the anchor element to the document body.
        // document.body.appendChild(a);

        // // Click the anchor element to download the PDF file.
        // a.click();

        // // Remove the anchor element from the document body.
        // document.body.removeChild(a);

        let doc = new jsPDF(); 
        console.log({doc});
        doc.text(20, 20, 'Hello, this is a test PDF!');

        // Save the PDF
        doc.save('test.pdf');

        
    },

    afterScriptsLoaded:function(component, event, helper) {
        console.log('SCRIPT LOADED SUCCESFULLY::');
    }
})