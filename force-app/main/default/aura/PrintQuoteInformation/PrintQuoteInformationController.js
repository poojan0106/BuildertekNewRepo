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

    closeModel: function(component, event, helper) {
        $A.get("e.force:closeQuickAction").fire();
    },
    downloadFile:function(component, event, helper) {
        component.set("v.Spinner", true);

        var data= component.get("v.quoteLines");
        var action = component.get('c.getBlobBody');
        action.setParams({
            recordId: component.get("v.recordId"),
            templateId:component.get("v.selectedTemplate"),
            fileid:'',

        });

        action.setCallback(this, function(response) {
            var state = response.getState();
            var error = response.getError();

            console.log({state});
            console.log({error});
            console.log(response.getReturnValue());

            if (state === "SUCCESS") {
               console.log(response.getReturnValue());
               let fileBlob = response.getReturnValue();

               let downloadLink = document.createElement("a");
                downloadLink.href = "data:text/html;base64,"+fileBlob;
                downloadLink.download = "quote.pdf";
                downloadLink.click();
                component.set("v.Spinner", false);
            }else{
                var toastEvent = $A.get("e.force:showToast");
                toastEvent.setParams({
                    type: 'ERROR',
                    message: 'Something Went Wrong',
                    duration: '5000',
                });
                toastEvent.fire();
                component.set("v.Spinner", false);
            }
        });
        $A.enqueueAction(action);
    },
})