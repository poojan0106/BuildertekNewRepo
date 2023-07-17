/* globals bryntum : true */
import { formatJSDatatoApexData } from "../gantt_componentHelper";
export default base => class GanttToolbar extends base {
    static get $name() {
        return 'GanttToolbar';
    }

    // Called when toolbar is added to the Gantt panel
    set parent(parent) {
        super.parent = parent;

        const me = this;

        me.gantt = parent;

        parent.project.on({
            load: 'updateStartDateField',
            refresh: 'updateStartDateField',
            thisObj: me
        });

        parent.project.stm.on({
            recordingStop: 'updateUndoRedoButtons',
            restoringStop: 'updateUndoRedoButtons',
            stmDisabled: 'updateUndoRedoButtons',
            queueReset: 'updateUndoRedoButtons',
            thisObj: me
        });

        me.styleNode = document.createElement('style');
        document.head.appendChild(me.styleNode);
    }

    get parent() {
        return super.parent;
    }

    static get defaultConfig() {
        return {
            items: [
                {
                    type: 'buttonGroup',
                    items: [
                        {
                            type: 'button',
                            color: 'b-green',
                            ref: 'addTaskButton',
                            icon: 'b-fa b-fa-plus',
                            text: 'Create',
                            tooltip: 'Create new task',
                            onAction: 'up.onAddTaskClick'
                        }
                    ]
                },
                {
                    type: 'buttonGroup',
                    items: [
                        {
                            type: 'button',
                            color: 'b-blue',
                            ref: 'editTaskButton',
                            icon: 'b-fa b-fa-pen',
                            text: 'Edit',
                            tooltip: 'Edit selected task',
                            onAction: 'up.onEditTaskClick'
                        },
                        {
                            type: 'button',
                            color: 'b-blue',
                            ref: 'undoBtn',
                            icon: 'b-icon b-fa b-fa-undo',
                            tooltip: 'Undo',
                            disabled: true,
                            width: '2em',
                            onAction: 'up.onUndoClick'
                        },
                        {
                            type: 'button',
                            color: 'b-blue',
                            ref: 'redoBtn',
                            icon: 'b-icon b-fa b-fa-redo',
                            tooltip: 'Redo',
                            disabled: true,
                            width: '2em',
                            onAction: 'up.onRedoClick'
                        }
                    ]
                },
                {
                    type: 'buttonGroup',
                    items: [
                        {
                            type: 'button',
                            color: 'b-blue',
                            ref: 'expandAllButton',
                            icon: 'b-fa b-fa-angle-double-down',
                            tooltip: 'Expand all',
                            onAction: 'up.onExpandAllClick'
                        },
                        {
                            type: 'button',
                            color: 'b-blue',
                            ref: 'collapseAllButton',
                            icon: 'b-fa b-fa-angle-double-up',
                            tooltip: 'Collapse all',
                            onAction: 'up.onCollapseAllClick'
                        }
                    ]
                },
                {
                    type: 'buttonGroup',
                    items: [
                        {
                            type: 'button',
                            color: 'b-blue',
                            ref: 'zoomInButton',
                            icon: 'b-fa b-fa-search-plus',
                            tooltip: 'Zoom in',
                            onAction: 'up.onZoomInClick'
                        },
                        {
                            type: 'button',
                            color: 'b-blue',
                            ref: 'zoomOutButton',
                            icon: 'b-fa b-fa-search-minus',
                            tooltip: 'Zoom out',
                            onAction: 'up.onZoomOutClick'
                        },
                        {
                            type: 'button',
                            color: 'b-blue',
                            ref: 'zoomToFitButton',
                            icon: 'b-fa b-fa-compress-arrows-alt',
                            tooltip: 'Zoom to fit',
                            onAction: 'up.onZoomToFitClick'
                        },
                        {
                            type: 'button',
                            color: 'b-blue',
                            ref: 'previousButton',
                            icon: 'b-fa b-fa-angle-left',
                            tooltip: 'Previous time span',
                            onAction: 'up.onShiftPreviousClick'
                        },
                        {
                            type: 'button',
                            color: 'b-blue',
                            ref: 'nextButton',
                            icon: 'b-fa b-fa-angle-right',
                            tooltip: 'Next time span',
                            onAction: 'up.onShiftNextClick'
                        }
                    ]
                },
                {
                    type: 'buttonGroup',
                    items: [
                        {
                            type: 'button',
                            color: 'b-blue',
                            ref: 'featuresButton',
                            icon: 'b-fa b-fa-tasks',
                            text: 'Features',
                            tooltip: 'Toggle features',
                            toggleable: true,
                            menu: {
                                onItem: 'up.onFeaturesClick',
                                onBeforeShow: 'up.onFeaturesShow',
                                items: [
                                    {
                                        text: 'Draw dependencies',
                                        feature: 'dependencies',
                                        checked: false
                                    },
                                    {
                                        text: 'Task labels',
                                        feature: 'labels',
                                        checked: false
                                    },
                                    {
                                        text: 'Project lines',
                                        feature: 'projectLines',
                                        checked: false
                                    },
                                    {
                                        text: 'Highlight non-working time',
                                        feature: 'nonWorkingTime',
                                        checked: false
                                    },
                                    {
                                        text: 'Enable cell editing',
                                        feature: 'cellEdit',
                                        checked: false
                                    },
                                    {
                                        text: 'Show baselines',
                                        feature: 'baselines',
                                        checked: false
                                    },
                                    {
                                        text: 'Show rollups',
                                        feature: 'rollups',
                                        checked: false
                                    },
                                    {
                                        text: 'Show progress line',
                                        feature: 'progressLine',
                                        checked: false
                                    },
                                    {
                                        text: 'Hide schedule',
                                        cls: 'b-separator',
                                        subGrid: 'normal',
                                        checked: false
                                    }
                                ]
                            }
                        },
                        {
                            type: 'button',
                            color: 'b-blue',
                            ref: 'settingsButton',
                            icon: 'b-fa b-fa-cogs',
                            text: 'Settings',
                            tooltip: 'Adjust settings',
                            toggleable: true,
                            menu: {
                                type: 'popup',
                                anchor: true,
                                cls: 'settings-menu',
                                layoutStyle: {
                                    flexDirection: 'column'
                                },
                                onBeforeShow: 'up.onSettingsShow',

                                items: [
                                    {
                                        type: 'slider',
                                        ref: 'rowHeight',
                                        text: 'Row height',
                                        width: '12em',
                                        showValue: true,
                                        min: 30,
                                        max: 70,
                                        onInput: 'up.onSettingsRowHeightChange'
                                    },
                                    {
                                        type: 'slider',
                                        ref: 'barMargin',
                                        text: 'Bar margin',
                                        width: '12em',
                                        showValue: true,
                                        min: 0,
                                        max: 10,
                                        onInput: 'up.onSettingsMarginChange'
                                    }
                                ]
                            }
                        },
                        {
                            type: 'button',
                            color: 'b-blue',
                            ref: 'saveDataButton',
                            icon: 'b-fa b-fa-save',
                            text: 'Save Changes',
                            onAction: 'up.onSaveClick'
                        },
                        {
                            type: 'button',
                            text: 'Export Schedule',
                            color: 'b-blue',
                            ref: 'excelExportBtn',
                            icon: 'b-fa-file-export',
                            onAction: 'up.onExportclick'
                        },
                        {
                            type: 'button',
                            color: 'b-blue',
                            ref: 'criticalPathsButton',
                            icon: 'b-fa b-fa-fire',
                            text: 'Critical paths',
                            tooltip: 'Highlight critical paths',
                            toggleable: true,
                            onAction: 'up.onCriticalPathsClick'
                        }
                    ]
                },
                {
                    type: 'datefield',
                    ref: 'startDateField',
                    label: 'Project start',
                    // required  : true, (done on load)
                    flex: '1 2 17em',
                    listeners: {
                        change: 'up.onStartDateChange'
                    }
                },
                {
                    type: 'textfield',
                    ref: 'filterByName',
                    cls: 'filter-by-name',
                    flex: '1 1 12.5em',
                    // Label used for material, hidden in other themes
                    label: 'Find tasks by name',
                    // Placeholder for others
                    placeholder: 'Find tasks by name',
                    clearable: true,
                    keyStrokeChangeDelay: 100,
                    triggers: {
                        filter: {
                            align: 'end',
                            cls: 'b-fa b-fa-filter'
                        }
                    },
                    onChange: 'up.onFilterChange'
                }
            ]
        };
    }

    updateUndoRedoButtons() {
        const
            { stm } = this.gantt.project,
            { undoBtn, redoBtn } = this.widgetMap,
            redoCount = stm.length - stm.position;

        undoBtn.badge = stm.position || '';
        redoBtn.badge = redoCount || '';

        undoBtn.disabled = !stm.canUndo;
        redoBtn.disabled = !stm.canRedo;
    }

    updateStartDateField() {
        const startDateField = this.widgetMap.startDateField;

        startDateField.value = this.gantt.project.startDate;

        // This handler is called on project.load/propagationComplete, so now we have the
        // initial start date. Prior to this time, the empty (default) value would be
        // flagged as invalid.
        startDateField.required = true;
    }

    // region controller methods

    async onAddTaskClick() {
        const
            { gantt } = this,
            added = gantt.taskStore.rootNode.appendChild({ name: 'New task', duration: 1 });

        // run propagation to calculate new task fields
        await gantt.project.propagate();

        // scroll to the added task
        await gantt.scrollRowIntoView(added);

        gantt.features.cellEdit.startEditing({
            record: added,
            field: 'name'
        });
    }

    onEditTaskClick() {
        const { gantt } = this;

        if (gantt.selectedRecord) {
            gantt.editTask(gantt.selectedRecord);
        }
        else {
            bryntum.gantt.Toast.show('First select the task you want to edit');
        }
    }

    onExpandAllClick() {
        this.gantt.expandAll();
    }

    onCollapseAllClick() {
        this.gantt.collapseAll();
    }

    onZoomInClick() {
        this.gantt.zoomIn();
    }

    onZoomOutClick() {
        this.gantt.zoomOut();
    }

    onZoomToFitClick() {
        this.gantt.zoomToFit({
            leftMargin: 50,
            rightMargin: 50
        });
    }

    onShiftPreviousClick() {
        this.gantt.shiftPrevious();
    }

    onShiftNextClick() {
        this.gantt.shiftNext();
    }

    onStartDateChange({ value, oldValue }) {
        if (!oldValue) { // ignore initial set
            return;
        }

        this.gantt.startDate = bryntum.gantt.DateHelper.add(value, -1, 'week');

        this.gantt.project.setStartDate(value);
    }

    onFilterChange({ value }) {
        if (value === '') {
            this.gantt.taskStore.clearFilters();
        }
        else {
            value = value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

            this.gantt.taskStore.filter({
                filters: task => task.name && task.name.match(new RegExp(value, 'i')),
                replace: true
            });
        }
    }

    onFeaturesClick({ source: item }) {
        const { gantt } = this;

        if (item.feature) {
            const feature = gantt.features[item.feature];
            feature.disabled = !feature.disabled;
        }
        else if (item.subGrid) {
            const subGrid = gantt.subGrids[item.subGrid];
            subGrid.collapsed = !subGrid.collapsed;
        }
    }

    onFeaturesShow({ source: menu }) {
        const { gantt } = this;

        menu.items.forEach(item => {
            const { feature } = item;

            if (feature) {
                // a feature might be not presented in the gantt
                // (the code is shared between "advanced" and "php" demos which use a bit different set of features)
                if (gantt.features[feature]) {
                    item.checked = !gantt.features[feature].disabled;
                }
                // hide not existing features
                else {
                    item.hide();
                }
            }
            else {
                item.checked = gantt.subGrids[item.subGrid].collapsed;
            }
        });
    }

    onSettingsShow({ source: menu }) {
        const { gantt } = this,
            { widgetMap } = menu;

        widgetMap.rowHeight.value = gantt.rowHeight;
        widgetMap.barMargin.value = gantt.barMargin;
        widgetMap.barMargin.max = (gantt.rowHeight / 2) - 5;
    }

    onSettingsRowHeightChange({ value }) {
        this.gantt.rowHeight = value;
        this.widgetMap.settingsButton.menu.widgetMap.barMargin.max = (value / 2) - 5;
    }

    onSettingsMarginChange({ value }) {
        this.gantt.barMargin = value;
    }

    onCriticalPathsClick({ source }) {
        this.gantt.features.criticalPaths.disabled = !source.pressed;
    }

    onUndoClick() {
        if (this.gantt.project.stm.canUndo) {
            this.gantt.project.stm.undo();
        }
    }

    onRedoClick() {
        if (this.gantt.project.stm.canRedo) {
            this.gantt.project.stm.redo();
        }
    }

    onSaveClick() {
        try {
            var libraryDataList = [];
            console.log('this.gantt.TaskModel ', JSON.parse(JSON.stringify(this.gantt.tasks)));
            console.log('this.gantt.data ', JSON.parse(JSON.stringify(this.gantt.data)));
            var taskData = JSON.parse(this.gantt.taskStore.json)
            var dependenciesData = JSON.parse(this.gantt.dependencyStore.json)
            var resourceData = JSON.parse(this.gantt.assignmentStore.json)
            console.log('taskData-->', taskData)
            console.log('dependenciesData-->', dependenciesData)
            console.log('resourceData-->', resourceData)
            for (let i = 0; i < this.gantt.data.length; i++) {
                const data = this.gantt.data[i]._data;
                libraryDataList.push(data);
            }
            console.log('JON Task date ', JSON.parse(JSON.stringify(libraryDataList)));

            var rowData = [];
            if (this.gantt.data) {
                if (this.gantt.data.length > 1) {
                    function getChildren(data) {
                        if (data.children) {
                            for (var i = 0; i < data.children.length; i++) {
                                getChildren(data.children[i])
                            }
                        } else {
                            rowData.push(data)
                        }
                    }
                    getChildren(taskData[0])
                    console.log('rowData-->', rowData)
                    // console.log(rowData)
                    var updateDataList = [];
                    var updateDataCloneList = [];
                    var insertData = [];
                    for (var i = 0; i < rowData.length; i++) {
                        var updateData = {}
                        var updateDataClone = {}
                        var endDate
                        if (rowData[i]['name'] != 'Milestone Complete') {
                            endDate = new Date(rowData[i].endDate);
                            endDate.setDate(endDate.getDate() - 1)
                        } else {
                            endDate = new Date(rowData[i].endDate);
                            //endDate.setDate(endDate.getDate() + 1)
                        }

                        rowData[i].endDate = endDate;
                        if (rowData[i]['id'].indexOf('_generate') == -1) {
                            updateData['Id'] = rowData[i]['id']
                        }
                        updateData['buildertek__Schedule__c'] = taskData[0].id;
                        updateData['Name'] = rowData[i]['name']
                        updateData['buildertek__Order__c'] = i + 1;
                        //var startdate = new Date(rowData[i]['startDate'])
                        // console.log('test',new Date(rowData[i]['endDate']).toLocaleDateString())
                        var enddate = new Date(rowData[i]['endDate']).toLocaleDateString().split('/')
                        //var enddate = new Date(rowData[i]['endDate']).toJSON();
                        var enddate = new Date(rowData[i]['endDate'])
                        // console.log('test', rowData[i]['startDate'])
                        updateData['buildertek__Start__c'] = rowData[i]['startDate'].split('T')[0]
                        //updateData['buildertek__Finish__c'] = enddate[2] + '-'+ enddate[1] + '-'+enddate[0]
                        //updateData['buildertek__Finish__c'] = enddate.split('T')[0]
                        updateData['buildertek__Finish__c'] = enddate.getFullYear() + '-' + Number(enddate.getMonth() + 1) + '-' + enddate.getDate();
                        updateData['buildertek__Duration__c'] = rowData[i]['duration']
                        updateData['buildertek__Completion__c'] = rowData[i]['percentDone']
                        updateData['buildertek__Type__c'] = rowData[i]['customtype']

                        if (rowData[i]['cls']) {
                            var check = rowData[i]['cls']
                            if (check.includes('milestoneCompleteColor')) {
                                updateData['buildertek__Milestone__c'] = true;
                            }
                        }
                        if (rowData[i]['iconCls'] == 'b-fa b-fa-arrow-left indentTrue') {
                            updateData['buildertek__Indent_Task__c'] = true
                        } else {
                            updateData['buildertek__Indent_Task__c'] = false;
                        }
                        //updateData['buildertek__Indent_Task__c'] = rowData[i]['iconCls'].includes('indentTrue')
                        if (rowData[i]['parentId']) {
                            // console.log(rowData[i]['parentId'])
                            if (rowData[i]['parentId'].split('_')[1]) {
                                updateData['buildertek__Phase__c'] = rowData[i]['parentId'].split('_')[1]
                            }
                        }

                        if (rowData[i]['id']) {
                            var taskbyid = this.gantt.taskStore.getById(rowData[i]['id'])._data
                            // console.log(taskbyid)
                            if (!taskbyid.predecessor) {
                                updateData['buildertek__Dependency__c'] = null;
                            }
                        }

                        var filledDependency = false
                        for (var j = 0; j < dependenciesData.length; j++) {
                            if (dependenciesData[j]['to'] == rowData[i]['id']) {
                                if (dependenciesData[j]['id'].indexOf('_generated') >= 0) {
                                    updateData['buildertek__Dependency__c'] = dependenciesData[j]['to']
                                } else {
                                    updateData['buildertek__Dependency__c'] = dependenciesData[j]['to']
                                }
                                filledDependency = true;
                            }
                            if (!filledDependency) {
                                updateData['buildertek__Dependency__c'] = null;
                            }
                        }
                        updateDataClone = Object.assign({}, updateData);
                        // console.log(updateDataClone);
                        for (var j = 0; j < resourceData.length; j++) {
                            if (resourceData[j]['event'] == rowData[i]['id']) {
                                if (resourceData[j]['id'].indexOf('ContractorResource') >= 0) {
                                    var conresName = resourceData[j]['id'].split('ContractorResource_Name')[1];
                                    var obj = { 'Name': conresName }
                                    updateData['buildertek__Contractor_Resource__r'] = obj;
                                    updateData['buildertek__Contractor_Resource__c'] = resourceData[j]['resource']
                                    updateDataClone['buildertek__Contractor_Resource__c'] = resourceData[j]['resource']
                                } else if (resourceData[j]['id'].indexOf('Resource') >= 0) {
                                    var resName = resourceData[j]['id'].split('Resource_Name')[1];
                                    var obj = { 'Name': resName }
                                    updateData['buildertek__Resource__c'] = resourceData[j]['resource']
                                    updateData['buildertek__Resource__r'] = obj;
                                    updateDataClone['buildertek__Resource__c'] = resourceData[j]['resource']
                                }
                            }
                        }
                        if (rowData[i]['id'].indexOf('_generate') == -1) {
                            updateDataCloneList.push(updateDataClone)
                        }
                        updateDataList.push(updateData)
                    }
                    console.log('updateDataList ==> ', { updateDataList });
                }
            }


            // let dataForApexController = formatJSDatatoApexData(libraryDataList);
            // this.gantt.callGanttComponent.saveChanges(dataForApexController.scheduleObj,dataForApexController.scheduleItemList)
            console.log('check new data here ', JSON.parse(JSON.stringify(dataForApexController.scheduleObj)));
            console.log('check new data here ', JSON.parse(JSON.stringify(dataForApexController.scheduleItemList)));

        } catch (error) {
            console.log('Error-->' + error + ' message-->' + error.message);
        }
    }

    onExportclick() {
        this.gantt.callGanttComponent.exportData();
    }
};