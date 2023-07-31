({
	doInit : function(component, event, helper) {
<<<<<<< HEAD
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
        
        // var hidden_a = document.createElement('a'); 
        // hidden_a.setAttribute('href', 'data:application/pdf;charset=utf-8,' + encodeURIComponent(data)); 
        // hidden_a.setAttribute('download', "text_file.pdf"); 
        // document.body.appendChild(hidden_a); hidden_a.click(); 


        // Get the HTML content of the page
        // const html = document.querySelector("body").innerHTML;

        const htmlContent = document.getElementById("contentToExport").innerHTML;

    // Create a new jsPDF instance
    const pdf = new jsPDF();

    // Convert the HTML content to PDF
    pdf.fromHTML(htmlContent, 15, 15, {
      width: 170,
    });

    // Save the PDF
    pdf.save("exported_file.pdf");


=======
        // var url = location.href;
        // var baseURL = url.substring(0, url.indexOf('/', 14));
        // component.set("v.BaseURL",baseURL);
        component.set("v.Spinner",true);
        window.setTimeout(
            $A.getCallback(function() {
                component.set("v.Spinner", false); 
                $A.get("e.force:closeQuickAction").fire();
            }), 7000
        );
>>>>>>> 5b0b506af52afeb167ca361ad895791a24ffaabf
    }
})