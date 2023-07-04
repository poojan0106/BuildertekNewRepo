({
    doInitHelper : function(component, event, helper) {
        component.set('v.Spinner', true);
        var action = component.get("c.getPricebookList");
        action.setParams({
            recordId:component.get("v.quoteId")
        })
        action.setCallback(this, function(response){
            var result = response.getReturnValue();
            // console.log(component.get('v.getPhase') , 'getPhase::::::;');
            let projectHavePricebook=result[0].defaultValue;
            console.log(Object.keys(projectHavePricebook).length);
            var pricebookOptions = [];
            if(Object.keys(projectHavePricebook).length !=0){

                pricebookOptions.push({ key: projectHavePricebook.Name, value: projectHavePricebook.Id });
                result[0].priceWrapList.forEach(function(element){
                    if(projectHavePricebook.Id !== element.Id){
                        pricebookOptions.push({ key: element.Name, value: element.Id });
                    }else{
                        pricebookOptions.push({ key: "None", value: "" });
                    }
                });
                component.set('v.selectedPricebookId' , projectHavePricebook.Id);

            }else{
                pricebookOptions.push({ key: "None", value: "" });
                result[0].priceWrapList.forEach(function(element){
                    pricebookOptions.push({ key: element.Name, value: element.Id });
                });
            }
            if(component.get('v.selectedPricebookId')!= undefined){
                var selectedPricebook = component.find("selectedPricebook").get("v.value");
                helper.changePricebookHelper(component, event, helper , selectedPricebook);
            }else{
                 component.set('v.Spinner', false);    
            }
            component.set("v.pricebookoptions", pricebookOptions);
            // component.set('v.Spinner', false);    
        });
        $A.enqueueAction(action);

        //create a action tgetQuoteLineGroups and set callback without parameters
        var action1 = component.get("c.getQuoteLineGroups");
        action1.setCallback(this, function(response){
            var result = response.getReturnValue();
            var quoteLineGroupOptions = [];
            var selectedProducts = [];


            // var phaseValue= component.get('v.getPhase');
            // if(phaseValue != undefined){

            // }else{
                result.forEach(element => {
                    quoteLineGroupOptions.push({ key: element.Name, value: element.Id });
                });

            // }
            
            component.set("v.quoteLineGroupOptions", quoteLineGroupOptions);
            // console.log({quoteLineGroupOptions});
            component.set("v.selectedQuoteLineGroupId", '');
        });  
        $A.enqueueAction(action1);      
    }, 

    changePricebookHelper : function(component, event, helper , priceBookId){
        component.find("selectAll").set("v.checked", false);
        component.set('v.Spinner', true);
        component.set("v.sProductFamily", '');
        component.set("v.sProductName", '');
        // var selectedPricebook = component.find("selectedPricebook").get("v.value");
        console.log('selectedPricebook => '+priceBookId);
        if (priceBookId != '') {
            
            var action = component.get("c.getProductsthroughPriceBook2");
            action.setParams({
                "pbookId": priceBookId 
            });
            action.setCallback(this, function(response) {
                var rows = response.getReturnValue();
                if (response.getState() == "SUCCESS" && rows != null) {
                    console.log('quoteLineList ==> ',{rows});
                    component.set("v.quoteLineList", rows);
                    component.set("v.tableDataList", rows);
                    var productFamilySet = new Set();
                    rows.forEach(element => {
                        if (element.Family != undefined && element.Family != '') {
                            productFamilySet.add(element.Family);
                        }
                    });
                    var productFamilyList = [];
                    productFamilyList.push({
                        key: '-- All Product Family --',
                        value: ''
                    });
                    productFamilySet.forEach(function(value) {
                        productFamilyList.push({
                            key: value,
                            value: value
                        });
                    });
                    console.log(component.get('v.getPhase') , 'getPhase::::::;');
                    if(component.get('v.getPhase') != undefined){
                        var quotelineGroupOptions = component.get("v.quoteLineGroupOptions");
                        console.log('quoteLineGroupOptions ==>', component.get("v.quoteLineGroupOptions"));
                        var name = '';
                        quotelineGroupOptions.forEach(function(element){
                            if(element.value == component.get('v.getPhase')){
                                name = element.key;
                            }
                        });
                        var productFamily = '';
                        productFamilyList.forEach(function(element){
                            if(element.key == name){
                                productFamily = element.value;
                            }
                        });
                        console.log('productFamily from phase ==> ',{productFamily});
                        if(productFamily != ''){
                            console.log('inside if');
                            component.set("v.sProductFamily", productFamily);
                            helper.searchInDatatableHelper(component, event, helper);
                        }
                    }
                    console.log('productFamilyList ==> ',{productFamilyList});
                    component.set("v.productFamilyOptions", productFamilyList);
                }
                component.set('v.Spinner', false);
            });
            $A.enqueueAction(action);
        } else {
            component.set("v.quoteLineList", []);
            component.set("v.tableDataList", []);
            component.set('v.Spinner', false);
        }
    }, 

    searchInDatatableHelper : function(component, event, helper){

        if (component.get("v.selectedPricebookId") != '') {
            let sProductFamily = component.get("v.sProductFamily");
            let sProductName = component.get("v.sProductName");

            var quoteLineList = component.get("v.quoteLineList");
            var tableDataList = [];

            if (sProductFamily != undefined && sProductFamily != '' && sProductName != undefined && sProductName != '') {
                quoteLineList.forEach(element => {
                    if (element.Family != undefined && element.Family != '') {
                        if (element.Family.toLowerCase().includes(sProductFamily.toLowerCase()) && element.Name.toLowerCase().includes(sProductName.toLowerCase())) {
                            tableDataList.push(element);
                        }
                    }
                });
            } else if (sProductFamily != undefined && sProductFamily != '') {
                quoteLineList.forEach(element => {
                    if (element.Family != undefined && element.Family != '') {
                        if (element.Family.toLowerCase().includes(sProductFamily.toLowerCase())) {
                            tableDataList.push(element);
                        }
                    }
                });
            } else if (sProductName != undefined && sProductName != '') {
                quoteLineList.forEach(element => {
                    if (element.Name.toLowerCase().includes(sProductName.toLowerCase())) {
                        tableDataList.push(element);
                    }
                });
            } else{
                tableDataList = quoteLineList;
            }
            var checkAll = true;
            tableDataList.forEach(element => {
                if (!element.Selected) {
                    checkAll = false
                }
            });
            if (tableDataList.length > 0) {
                component.find("selectAll").set("v.checked", checkAll);
            } else{
                component.find("selectAll").set("v.checked", false);
            }
            component.set("v.tableDataList", tableDataList);
        }
    }, 

    goToEditModalHelper: function(component, event, helper) {
        var quoteLineList = component.get("v.quoteLineList");
        console.log('quoteLineList => ',{quoteLineList});
        var selectedProducts = [];
        var phaseValue= component.get('v.getPhase');
        //find No Grouping from quoteLineGroupOptions and store it's Id in noGroupingId
        var noGroupingId = '';
        var quoteLineGroupOptions = component.get("v.quoteLineGroupOptions");
        //iterate through quoteLineGroupOptions and find first No Grouping
        quoteLineGroupOptions.forEach(element => {
            if (element.key == 'No Grouping') {
                noGroupingId = element.value;
            }
        });
        quoteLineList.forEach(element => {
            console.log(phaseValue);
            console.log(phaseValue!= undefined);
            if(element.Selected){
                selectedProducts.push({
                    'Id':element.Id,
                    'Name': element.Name,
                    'buildertek__Unit_Price__c': element.UnitPrice,
                    'buildertek__Grouping__c': element.Phase ? element.Phase : noGroupingId,
                    'buildertek__Quantity__c': '1',
                    'buildertek__Additional_Discount__c': element.Discount ? element.Discount : 0,
                    'buildertek__Unit_Cost__c': element.UnitCost ? element.UnitCost : element.UnitPrice,
                    'buildertek__Markup__c': element.MarkUp ? element.MarkUp : 0,
                    'buildertek__Product__c': element.Id,
                    'buildertek__Size__c': element.Size,
                    'buildertek__Description__c': element.Description ? element.Description : element.Name,
                    'buildertek__Product_Family__c': element.Family ? element.Family : 'No Grouping'
                })
            }

            // =====BUIL-3198 ====
            /*if (element.Selected && phaseValue != undefined) {
                console.log(phaseValue != undefined);
                    selectedProducts.push({
                        'Id':element.Id,
                        'Name': element.Name,
                        'buildertek__Unit_Price__c': element.UnitPrice,
                        'buildertek__Grouping__c': phaseValue,
                        'buildertek__Quantity__c': '1',
                        'buildertek__Additional_Discount__c': element.Discount ? element.Discount : 0,
                        'buildertek__Unit_Cost__c': element.UnitCost ? element.UnitCost : element.UnitPrice,
                        'buildertek__Markup__c': element.MarkUp ? element.MarkUp : 0,
                        'buildertek__Product__c': element.Id,
                        'buildertek__Size__c': element.Size,
                        'buildertek__Description__c': element.Description ? element.Description : element.Name,
                        'buildertek__Product_Family__c': element.Family ? element.Family : 'No Grouping'
                    })
            }else if(element.Selected){
                selectedProducts.push({
                    'Id':element.Id,
                    'Name': element.Name,
                    'buildertek__Unit_Price__c': element.UnitPrice,
                    'buildertek__Grouping__c': element.Phase ? element.Phase : noGroupingId,
                    'buildertek__Quantity__c': '1',
                    'buildertek__Additional_Discount__c': element.Discount ? element.Discount : 0,
                    'buildertek__Unit_Cost__c': element.UnitCost ? element.UnitCost : element.UnitPrice,
                    'buildertek__Markup__c': element.MarkUp ? element.MarkUp : 0,
                    'buildertek__Product__c': element.Id,
                    'buildertek__Size__c': element.Size,
                    'buildertek__Description__c': element.Description ? element.Description : element.Name,
                    'buildertek__Product_Family__c': element.Family ? element.Family : 'No Grouping'
                })
            }*/

            // ====BUIL-3198===
            
        });
        console.log('selectedProducts => ',{selectedProducts});
        component.set("v.selectedProducts", selectedProducts);
        if (selectedProducts.length > 0) {
            component.set("v.selecteProducts", false);
        }else{
            var toastEvent = $A.get("e.force:showToast");
            toastEvent.setParams({
                title: 'Error',
                message: 'Please select at least one Product.',
                duration: ' 5000',
                key: 'info_alt',
                type: 'error',
                mode: 'pester'
            });
            toastEvent.fire();
        }
    },
})