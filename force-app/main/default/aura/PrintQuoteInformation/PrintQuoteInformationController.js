({
	doInit : function(component, event, helper) {
        component.set("v.Spinner", true);
        var dbAction = component.get("c.getTemplates");
        // dbAction.setParams({
        //     recordId: component.get("v.recordId")
        // });
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
                })
                component.set("v.templates", response.getReturnValue());
                component.set("v.Spinner", false);
            }
        });

        $A.enqueueAction(dbAction);

        console.log(component.get('v.templates'));

        var recordId = component.get("v.recordId");
        var action = component.get("c.getQuoteLines");
        action.setParams({
            recordId: recordId,
            templateId: component.get("v.selectedTemplate")
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                var result = response.getReturnValue();
                console.log('get template body');
                console.log({ result });
                component.set("v.quoteLines", result);
            }
        });
        $A.enqueueAction(action);
    },
    scrolldown: function(component, event, helper) {

        document.getElementById('footer').scrollIntoView();

    },
    scrollup: function(component, event, helper) {

        document.getElementById('header').scrollIntoView(true);

    },
    preiewEmailTemplate: function(component, event, helper) {
        console.log('Preview email template');

        var selectedTemplate = component.get("v.selectedTemplate");
        console.log(selectedTemplate);
        if (selectedTemplate != undefined) {
            component.set("v.isTemplateSelected", true);
            // helper.getTemplateBody(component, event, helper);
            var recordId = component.get("v.recordId");
            var action = component.get("c.getQuoteLines");
            action.setParams({
                recordId: recordId,
                templateId: component.get("v.selectedTemplate")
            });
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    var result = response.getReturnValue();
                    console.log('get template body');
                    console.log({ result });
                    component.set("v.quoteLines", result);
                }
            });
            $A.enqueueAction(action);
            // helper.getProposalImagesList(component, event, helper);
            // setTimeout(function() {
            //     var wrapper = document.getElementById("signature-pad");
            //     if (wrapper != undefined) {
            //         var canvas = wrapper.querySelector("canvas");
            //         var signaturePad;

            //         // Adjust canvas coordinate space taking into account pixel ratio,
            //         // to make it look crisp on mobile devices.
            //         // This also causes canvas to be cleared.
            //         function resizeCanvas() {
            //             // When zoomed out to less than 100%, for some very strange reason,
            //             // some browsers report devicePixelRatio as less than 1
            //             // and only part of the canvas is cleared then.
            //             var ratio = Math.max(window.devicePixelRatio || 1, 1);
            //             canvas.width = canvas.offsetWidth * ratio;
            //             canvas.height = canvas.offsetHeight * ratio;
            //             canvas.getContext("2d").scale(ratio, ratio);
            //         }

            //         window.onresize = resizeCanvas;
            //         resizeCanvas();

            //         window.signaturePad = new SignaturePad(canvas);

            //         document.getElementById("btnClear").onclick = function(event) {
            //             event.preventDefault();
            //             console.log(window.signaturePad);
            //             window.signaturePad.clear();
            //         }
            //     }
            // }, 3000);
        }
    },

    closeModel: function(component, event, helper) {
        // location.reload(); 
        $A.get("e.force:closeQuickAction").fire();

    },
})