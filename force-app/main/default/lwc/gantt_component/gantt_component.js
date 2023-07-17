/* globals bryntum : true */
import {
  api,
  LightningElement,
  track,
  wire
} from "lwc";
import {
  ShowToastEvent
} from "lightning/platformShowToastEvent";
import {
  loadScript,
  loadStyle
} from "lightning/platformResourceLoader";

import GanttStyle from "@salesforce/resourceUrl/BT_Bryntum_NewGanttCss";
import GANTTModule from "@salesforce/resourceUrl/BT_Bryntum_NewGantt_ModuleJS";

// import GanttStyle from "@salesforce/resourceUrl/BT_Bryntum_NewGanttCss";
import GanttToolbarMixin from "./lib/GanttToolbar";
import data from "./data/launch-saas";
import scheduleWrapperDataFromApex from "@salesforce/apex/bryntumGanttController.getScheduleWrapperAtLoading";
import saveResourceForRecord from "@salesforce/apex/bryntumGanttController.saveResourceForRecord";
import upsertDataOnSaveChanges from "@salesforce/apex/bryntumGanttController.upsertDataOnSaveChanges";
import getPickListValuesIntoList from "@salesforce/apex/bryntumGanttController.getPickListValuesIntoList";
import {
  formatApexDatatoJSData
} from "./gantt_componentHelper";
import {
  populateIcons
} from "./lib/BryntumGanttIcons";
import bryntum_gantt from "@salesforce/resourceUrl/bryntum_gantt";

export default class Gantt_component extends LightningElement {
  @track islibraryloaded = false;
  @track scheduleItemsDataList;
  @track scheduleData;
  @track scheduleItemsData;
  @api SchedulerId;
  @api showExportPopup;
  @api recordId;
  @api taskRecordId;
  @track showContractor = false;
  @track showEditResourcePopup = false;
  @track selectedContactApiName;

  //Phase list
  @track phaseNameList;

  //new
  @api showEditResourcePopup = false;
  @api selectedResourceContact;
  @api selectedContactApiName;
  @api resourceLookup = {};
  @api contractorResourceLookup = {};
  @api contratctorLookup = {};
  @api contractorResourceFilterVal = "";
  @api internalResourceFilterVal = "";
  //@api saveSelectedContact;
  //@api saveSelectedContactApiName;

  //Added for contractor
  @api showContractor = false;
  @api selectedResourceAccount;
  @track contracFieldApiName;
  @track contractorname;

  @api newTaskRecordCreate = {
    sObjectType: "buildertek__Project_Task__c",
    Name: "",
    Id: "",
    buildertek__Phase__c: "",
    buildertek__Dependency__c: "",
    buildertek__Completion__c: "",
    buildertek__Start__c: "",
    buildertek__Finish__c: "",
    buildertek__Duration__c: "",
    buildertek__Lag__c: "",
    buildertek__Resource__c: "",
    buildertek__Contractor__c: "",
    buildertek__Contractor_Resource__c: "",
    buildertek__Schedule__c: "",
    buildertek__Order__c: "",
    buildertek__Notes__c: "",
    buildertek__Budget__c: "",
    buildertek__Add_To_All_Active_Schedules__c: "",
    buildertek__Type__c: "Task",
    buildertek__Indent_Task__c: false,
  };
  @api newTaskRecordClone = {
    sObjectType: "buildertek__Project_Task__c",
    Name: "",
    Id: "",
    buildertek__Type__c: "Task",
    buildertek__Phase__c: "",
    buildertek__Dependency__c: "",
    buildertek__Completion__c: "",
    buildertek__Start__c: "",
    buildertek__Finish__c: "",
    buildertek__Duration__c: "",
    buildertek__Lag__c: "",
    buildertek__Resource__c: "",
    buildertek__Contractor__c: "",
    buildertek__Contractor_Resource__c: "",
    buildertek__Schedule__c: "",
    buildertek__Order__c: "",
    buildertek__Notes__c: "",
    buildertek__Budget__c: "",
    buildertek__Indent_Task__c: false,
    buildertek__Add_To_All_Active_Schedules__c: "",
  };


  connectedCallback() {
    console.log("Connected Callback new gantt chart");
    console.log("ReocrdID:- ", this.recordId);
    if (this.SchedulerId == null || this.SchedulerId == undefined) {
      if (this.recordId == null || this.recordId == undefined) {
        // this.SchedulerId = "a2zDm0000004bPuIAI"; // trail org
        this.SchedulerId = 'a101K00000GobT6QAJ' // New
          // this.SchedulerId = 'a101K00000GobTCQAZ' // Old
      } else {
        this.SchedulerId = this.recordId;
      }
    } else {
      console.log("SchedulerId :- ", this.SchedulerId);
    }
    let intervalID = setInterval(() => {
      if (this.bryntumInitialized) {
        return;
      }
      this.bryntumInitialized = true;
      this.loadLibraries();
    }, 1500);
    this.getPickListValuesIntoListFromApex();
    this.getScheduleWrapperDataFromApex();
  }

  renderedCallback() {
    let intervalID = setInterval(() => {
      if (this.bryntumInitialized) {
        return;
      }
      this.bryntumInitialized = true;
      this.loadLibraries();
    }, 1500);
  }

  loadLibraries() {
    Promise.all([
      console.log('Lodding libraries'),
      // loadScript(this, GANTT + "/gantt.lwc.module.min.js"),
      // loadStyle(this, GANTT + "/gantt.stockholm-1.css"),
      loadScript(this, GANTTModule),
      loadStyle(this, GanttStyle + "/gantt.stockholm.css"),
      console.log('Loaded libraries'),
      // loadStyle(this, GanttStyle + "/gantt.stockholm.css")
    ])
      .then(() => {
        console.log("lib loaded");
        this.islibraryloaded = true;
      })
      .catch((error) => {
        this.dispatchEvent(
          new ShowToastEvent({
            title: "Error loading Bryntum Gantt",
            message: error,
            variant: "error"
          })
        );
      });
  }

  getScheduleWrapperDataFromApex() {
    scheduleWrapperDataFromApex({
      scheduleid: this.SchedulerId
    })
      .then((response) => {
        console.log("response ", JSON.parse(JSON.stringify(response)));
        var records = response;
        console.log({
          records
        });
        var data = response.lstOfSObjs;
        console.log("data-->", data);
        this.scheduleItemsDataList = response.lstOfSObjs;
        console.log("scheduleItemsDataList", JSON.parse(JSON.stringify(this.scheduleItemsDataList)));
        this.scheduleData = response.scheduleObj;
        console.log("scheduleData", this.scheduleData);
        // that.storeRes = response.filesandattacmentList;

        var scheduleItemsList = [];
        var scheduleItemsListClone = [];
        let scheduleItemsMap = new Map();
        let taskMap = new Map();
        console.log("after variables");
        for (var i in data) {
          if (
            data[i].Id != undefined &&
            data[i].buildertek__Milestone__c != undefined &&
            !data[i].buildertek__Milestone__c
          ) {
            scheduleItemsList.push(data[i]);
            taskMap.set(
              data[i].buildertek__Phase__c,
              scheduleItemsList.length - 1
            );
          } else if (
            data[i].Id != undefined &&
            data[i].buildertek__Milestone__c != undefined &&
            data[i].buildertek__Milestone__c
          ) {
            scheduleItemsMap.set(data[i].buildertek__Phase__c, data[i]);
          }
        }
        console.log("after first for loop");
        for (var i = 0; i < scheduleItemsList.length; i++) {
          if (
            scheduleItemsList[i] != undefined &&
            scheduleItemsList[i].Id != undefined
          ) {
            scheduleItemsListClone.push(scheduleItemsList[i]);
            if (
              taskMap.has(scheduleItemsList[i].buildertek__Phase__c) &&
              i == taskMap.get(scheduleItemsList[i].buildertek__Phase__c) &&
              scheduleItemsMap.get(scheduleItemsList[i].buildertek__Phase__c) !=
              undefined
            ) {
              scheduleItemsListClone.push(
                scheduleItemsMap.get(scheduleItemsList[i].buildertek__Phase__c)
              );
              scheduleItemsMap.delete(
                scheduleItemsList[i].buildertek__Phase__c
              );
            }
          }
        }
        console.log("after second for loop");
        for (const [key, value] of scheduleItemsMap.entries()) {
          if (value != undefined) {
            scheduleItemsListClone.push(value);
          }
        }
        console.log("after third for loop");
        let recordsMap = new Map();
        for (var i in scheduleItemsListClone) {
          if (scheduleItemsListClone[i].buildertek__Phase__c) {
            if (
              !recordsMap.has(scheduleItemsListClone[i].buildertek__Phase__c)
            ) {
              recordsMap.set(
                scheduleItemsListClone[i].buildertek__Phase__c,
                []
              );
            }
            recordsMap
              .get(scheduleItemsListClone[i].buildertek__Phase__c)
              .push(JSON.parse(JSON.stringify(scheduleItemsListClone[i])));
          } else {
            if (!recordsMap.has("null")) {
              recordsMap.set("null", []);
            }
            recordsMap
              .get("null")
              .push(JSON.parse(JSON.stringify(scheduleItemsListClone[i])));
          }
        }
        console.log("after fourth for loop");

        var result = Array.from(recordsMap.entries());
        var groupData = [];
        for (var i in result) {
          var newObj = {};
          newObj["key"] = result[i][0];
          newObj["value"] = result[i][1];
          groupData.push(newObj);
        }
        console.log("after fifth for loop");

        this.scheduleItemsData = groupData;

        if (this.template.querySelector(".container").children.length) {
          this.template.querySelector(".container").innerHTML = "";
          this.template.querySelector(".container1").innerHTML = "";
          this.createGanttChartInitially();
          // this.createGantt();
        } else {
          this.createGanttChartInitially();
          // this.createGantt();
          this.isLoaded = false;
        }
      })
      .catch((error) => {
        console.log(
          "error message to get while getting data from apex:- ",
          error.message
        );
      });
  }

  getPickListValuesIntoListFromApex(){
    getPickListValuesIntoList()
    .then((result) => {
      console.log("lib loaded");
      this.phaseNameList = result;
    })
    .catch((error) => {
      this.dispatchEvent(
        new ShowToastEvent({
          title: "Error getting Phase data Bryntum Gantt",
          message: error,
          variant: "error"
        })
      );
    });
  }

  addNewTaskToSchedule(record){
    var newTaskeDate;
    var dt;
    Object.assign(this.newTaskRecordCreate, this.newTaskRecordClone);
    if (record) {
      console.log({
        record,
      });
      if (record._data.type == "Task") {
        this.newTaskRecordCreate["buildertek__Dependency__c"] = record._data.id;
        this.newTaskRecordCreate["buildertek__Order__c"] = record._data.order;
      }
      if (record._data.phase) {
        this.newTaskRecordCreate["buildertek__Phase__c"] =
          record._data.phase != "null" ? record._data.phase : "";
      } else if (record._data.type == "Phase") {
        this.newTaskRecordCreate["buildertek__Phase__c"] = record._data.name;
      }

      dt = record._data.endDate;
    }
    this.showEditPopup = true;
    this.taskRecordId = "";
    this.newTaskRecordCreate["Name"] = "";
    if (record && record._data.endDate && record._data.type == "Task") {
      dt = record._data.endDate;
    } else {
      dt = new Date();
      newTaskeDate = new Date().toLocaleDateString().split("/");
    }
    if (dt.getDay() == 6) {
      dt.setDate(dt.getDate() + 2);
    }
    if (dt.getDay() == 0) {
      dt.setDate(dt.getDate() + 1);
    }
    newTaskeDate = dt.toLocaleDateString().split("/");
    this.newTaskRecordCreate["buildertek__Start__c"] =
    dt.getFullYear() + "-" + Number(dt.getMonth() + 1) + "-" + dt.getDate();
    this.newTaskRecordCreate["buildertek__Duration__c"] = 1;
    this.newTaskRecordCreate["buildertek__Finish__c"] =
    this.newTaskRecordCreate["buildertek__Start__c"];
    this.newTaskRecordCreate["buildertek__Completion__c"] = 0;
    this.newTaskRecordCreate["buildertek__Lag__c"] = 0;
    this.blankPredecessor = false;

  }


  handleAccountSelection(event) {
    if (event.detail.fieldNameapi == "buildertek__Dependency__c") {
      this.newTaskRecordCreate["buildertek__Dependency__c"] = event.detail.Id;
      this.predecessorLookup["Id"] = event.detail.Id;
      this.predecessorLookup["Name"] = event.detail.selectedName;
    } else if (event.detail.fieldNameapi == "buildertek__Resource__c") {
      this.newTaskRecordCreate["buildertek__Resource__c"] = event.detail.Id;
      this.resourceLookup["Id"] = event.detail.Id;
      this.resourceLookup["Name"] = event.detail.selectedName;
    } else if (event.detail.fieldNameapi == "buildertek__Contractor__c") {
      this.newTaskRecordCreate["buildertek__Contractor__c"] = event.detail.Id;
      this.contratctorLookup["Id"] = event.detail.Id;
      this.contratctorLookup["Name"] = event.detail.selectedName;
    } else if (
      event.detail.fieldNameapi == "buildertek__Contractor_Resource__c"
    ) {
      this.newTaskRecordCreate["buildertek__Contractor_Resource__c"] =
        event.detail.Id;
      this.contractorResourceLookup["Id"] = event.detail.Id;
      this.contractorResourceLookup["Name"] = event.detail.selectedName;
    }
  }

  handlecontactSelection(event) {
    this.selectedResourceContact = event.detail.Id;
  }

  handleaccountSelectionContractor(event) {
    this.selectedResourceAccount = event.detail.Id;
    this.contracFieldApiName = event.detail.fieldNameapi;
    this.contractorname = event.target.value;
  }

  saveSelectedContact() {
    var that = this;
    console.log("checking method*&");
    if (!this.taskRecordId.includes("_generated")) {
      console.log("^ other side condition ^");
      //Added for contractor ****Start****
      if (this.contracFieldApiName === "buildertek__Contractor__c") {
        console.log("^ In If ^");
        that.showContractor = false; //Added for contractor
        this.isLoaded = true;
        console.log('taskRecordId:-', this.taskRecordId);
        console.log('selectedResourceAccount:-', this.selectedResourceAccount);
        console.log('contracFieldApiName:-', this.contracFieldApiName);
        saveResourceForRecord({
          taskId: this.taskRecordId,
          resourceId: this.selectedResourceAccount,
          resourceApiName: this.contracFieldApiName,
        }).then(function (response) {
          const filterChangeEvent = new CustomEvent("filterchange", {
            detail: {
              message: "refresh page",
            },
          });
          that.dispatchEvent(filterChangeEvent);
          that.getScheduleWrapperDataFromApex();
          that.showEditResourcePopup = false;
        });
        that.contracFieldApiName = "";
      }
      //Added for contractor ****End****
      else {
        console.log("^ In else ^");
        that.showEditResourcePopup = false;
        this.isLoaded = true;

        saveResourceForRecord({
          taskId: this.taskRecordId,
          resourceId: this.selectedResourceContact,
          resourceApiName: this.selectedContactApiName,
        }).then(function (response) {
          const filterChangeEvent = new CustomEvent("filterchange", {
            detail: {
              message: "refresh page",
            },
          });
          that.dispatchEvent(filterChangeEvent);
          that.getScheduleWrapperDataFromApex();
        });
      }
    }
  }

  closeEditPopup(event) {
    event.preventDefault();
    event.stopPropagation();
    this.selectedContactApiName = "";
    this.selectedResourceContact = "";
    this.showFileForRecord = "";
    this.showFilePopup = false;
    this.showCommentPopup = false;
    this.schItemComment = "";
    this.isLoaded = false;
    this.predecessorVal = "";
    this.taskPhaseVal = "";
    this.newTaskPopupName = "";
    this.newTaskStartDate = "";
    this.newTaskDuration = "";
    this.newTaskLag = 0;
    this.taskRecordId = "";
    this.newTaskOrder = null;
    this.newTaskCompletion = null;
    this.showEditPopup = false;
    this.showDeletePopup = false;
    this.showEditResourcePopup = false;
    this.saveCommentSpinner = false;
    this.newNotesList = [];

    this.showContractor = false; //Added for contractor
    Object.assign(this.newTaskRecordCreate, this.newTaskRecordClone);
  }

  //populateIconsOnExpandCollapse
  populateIconsOnExpandCollapse(source) {
    console.log('in populateiconsonexpandcollapse');
    console.log('template queryselector :- ', this.template.querySelector('[data-id="' + source.record.id + '"]'));
    var rowPhaseElement = this.template.querySelector(
      '[data-id="' + source.record.id + '"]'
    );
    console.log('rowPhaseElement :- ', rowPhaseElement);
    if (rowPhaseElement && rowPhaseElement.innerHTML) {
      console.log('In Here first if condition');
      var iconElement = "";
      if (source.record.type == "Phase") {
        console.log('In Here phase if condition');
        iconElement = `<span class="slds-icon_container slds-icon-custom-custom62" >
        <svg aria-hidden="true" class="slds-icon slds-icon-text-default" style="fill: white !important;height:1.3rem;width:1.3rem;">
        <use xmlns:xlink=" http://www.w3.org/1999/xlink" xlink:href="/apexpages/slds/latest/assets/icons/custom-sprite/svg/symbols.svg#custom62">
        </use>
    </svg>
                                    </span>`;
        if (
          rowPhaseElement.innerHTML.indexOf("slds-icon-custom-custom62") == -1
        ) {
          if (rowPhaseElement.children.length) {
            if (rowPhaseElement.children[1].children.length) {
              rowPhaseElement.children[1].children[0].innerHTML =
                iconElement + rowPhaseElement.children[1].children[0].innerHTML;
            }
          }
        }
      } else if (source.record.type == "Project") {
        console.log('In Here Project if condition');
        iconElement = `<span class="slds-icon_container slds-icon-custom-custom70" >
                                        <svg aria-hidden="true" class="slds-icon slds-icon-text-default" style="fill: white !important;height:1.3rem;width:1.3rem;">
                                        <use xmlns:xlink=" http://www.w3.org/1999/xlink" xlink:href="/apexpages/slds/latest/assets/icons/custom-sprite/svg/symbols.svg#custom70">
                                            </use>
                                        </svg>
                                    </span>`;
        if (
          rowPhaseElement.innerHTML.indexOf("slds-icon-custom-custom70") == -1
        ) {
          if (rowPhaseElement.children.length) {
            if (rowPhaseElement.children[1].children.length) {
              rowPhaseElement.children[1].children[0].innerHTML =
                iconElement + rowPhaseElement.children[1].children[0].innerHTML;
            }
          }
        }
      }
    }
  }

  addtaskeventcall(taskrecord){
    console.log('In addtaskeventcall method');
    console.log(taskrecord);
  }


  createGanttChartInitially() {
    const GanttToolbar = GanttToolbarMixin(bryntum.gantt.Toolbar);

    var assignments = {};
    var resources = {};
    var tasks = {};
    var taskDependencyData = [];
    var resourceRowData = [];
    var assignmentRowData = [];
    var rows = [];

    var scheduleDataList = this.scheduleItemsDataList;
    console.log("scheduleDataList ==> ", {
      scheduleDataList
    });


    console.log("scheduleDataList after logic changed ", {
      scheduleDataList
    });
    this.scheduleItemsDataList = scheduleDataList;

    var formatedSchData = formatApexDatatoJSData(
      this.scheduleData,
      this.scheduleItemsData,
      this.scheduleItemsDataList
    );

    console.log("=== formatedSchData ===");
    console.log({
      formatedSchData
    });

    tasks["rows"] = formatedSchData["rows"];
    resources["rows"] = formatedSchData["resourceRowData"];
    assignments["rows"] = formatedSchData["assignmentRowData"];
    taskDependencyData = formatedSchData["taskDependencyData"];
    resourceRowData = formatedSchData["resourceRowData"];
    assignmentRowData = formatedSchData["assignmentRowData"];

    const project = new bryntum.gantt.ProjectModel({
      calendar: data.project.calendar,
      // startDate: data.project.startDate,
      // tasksData: data.tasks.rows,
      tasksData: tasks.rows,
      // resourcesData: data.resources.rows,
      skipNonWorkingTimeWhenSchedulingManually: true,
      resourcesData: resourceRowData,
      // assignmentsData: data.assignments.rows,
      assignmentsData: assignmentRowData,
      // dependenciesData: data.dependencies.rows,
      dependenciesData: taskDependencyData,
      calendarsData: data.calendars.rows
    });

    console.log("project:-", project);
    const gantt = new bryntum.gantt.Gantt({
      project,
      appendTo: this.template.querySelector(".container"),
      // startDate: "2019-07-01",
      // endDate: "2019-10-01",

      tbar: new GanttToolbar(),

      dependencyIdField: "sequenceNumber",
      columns: [{
        type: "wbs"
      },
      {
        type: "name",
        width: 250,
        renderer: (record) => {
          populateIcons(record);
          if (record.record._data.type == "Phase") {
            record.cellElement.style.margin = "";
          }
          if (
            record.record._data.iconCls == "b-fa b-fa-arrow-right indentTrue"
          ) {
            record.cellElement.style.margin = '0 0 0 1.5rem';
          }
          if (record.record._data.name == "Milestone Complete") {
            return "Milestone";
          } else {
            return record.value;
          }
        }
      },
      {
        type: "startdate",
        allowedUnits: "datetime"
      },
      {
        type: "duration",
        allowedUnits: "day"
      },
      {
        type: "percentdone",
        showCircle: true,
        width: 70
      },
      {
        type: "predecessor",
        width: 120,
        editor: {
          multipleSelection: false,
        },
        renderer: (record) => {
          populateIcons(record);
          if (record.record._data.type == "Project") {
            return "";
          }
          if (record.record._data.type == "Phase") {
            return "";
          }
          if (record.record._data.name == "Milestone Complete") {
            return "";
          } else {
            return record.record._data.predecessorName;
          }
        }
      },
      {
        text: "Internal Resource",
        type: "resourceassignment",
        width: 120,
        editor: false,
        items: {
          Test1: "Test1",
          Test2: "Test2"
        },
        renderer: function (record) {
          populateIcons(record);
          if (
            record.record._data.type == "Task" &&
            record.record._data.name != "Milestone Complete"
          ) {
            if (record.record._data.internalresource) {
              record.cellElement.classList.add("b-resourceassignment-cell");
              record.cellElement.innerHTML = `<div class="b-assignment-chipview-wrap">
                                  <div class="b-assignment-chipview b-widget b-list b-chipview b-outer b-visible-scrollbar b-chrome b-no-resizeobserver b-widget-scroller b-hide-scroll" tabindex="0" style="overflow-x: auto;" >
                                      <div class="b-chip" data-index="0" data-isinternalresource="true" > ${record.record._data.internalresourcename}</div>
                                      <i id="editInternalResource" data-resource="${record.record._data.internalresource}" class="b-action-item b-fa b-fa-pen" style="font-size:1rem;color:#cfd1d3;margin-left:0.2rem;" id="editInternalResource" ></i>
                                      </div>
                              </div>`;
            } else {
              record.cellElement.innerHTML = `
                              <i  class="b-action-item b-fa b-fa-user-plus addinternalresource" style="font-size:1rem;color:#cfd1d3;margin-left:0.2rem;"  ></i>
                              `;
            }
          } else {
            record.cellElement.innerHTML = `<span></span>`;
          }
        },
        filterable: ({
          record,
          value,
          operator
        }) => {
          if (record._data.internalresourcename && value) {
            if (
              record._data.internalresourcename
                .toUpperCase()
                .indexOf(value.toUpperCase()) > -1
            ) {
              return true;
            }
          }
        }
      },
      //Added for Contractor
      {
        text: "Contractor",
        width: 120,
        editor: false,
        renderer: function (record) {
          populateIcons(record);

          if (
            record.record._data.type == "Task" &&
            record.record._data.name != "Milestone Complete"
          ) {
            if (record.record._data.contractoracc) {
              record.cellElement.classList.add("b-resourceassignment-cell");
              record.cellElement.innerHTML = `<div id="" class="b-assignment-chipview-wrap">
                                  <div class="b-assignment-chipview b-widget b-list b-chipview b-outer b-visible-scrollbar b-chrome b-no-resizeobserver b-widget-scroller b-hide-scroll" tabindex="0" style="overflow-x: auto;" >
                                      <div class="b-chip" data-index="0" data-isinternalres="false" > ${record.record._data.contractorname}</div>
                                      <i id="editcontractor" data-resource="${record.record._data.contractorname}" class="b-action-item b-fa b-fa-pen" style="font-size:1rem;color:#cfd1d3;margin-left:0.2rem;"  ></i>
                                      </div>
                              </div>`;
            } else {
              record.cellElement.innerHTML = `
                              <i  class="b-action-item b-fa b-fa-user-plus addcontractor" style="font-size:1rem;color:#cfd1d3;margin-left:0.2rem;"  ></i>
                              `;
            }
          } else {
            record.cellElement.innerHTML = `<span></span>`;
          }
        },
        filterable: ({
          record,
          value,
          operator
        }) => {
          if (record._data.contractorresourcename && value) {
            if (
              record._data.contractorresourcename
                .toUpperCase()
                .indexOf(value.toUpperCase()) > -1
            ) {
              return true;
            }
          }
        }
      },
      {
        text: "Contractor Resource",
        width: 110,
        editor: false,
        renderer: function (record) {
          populateIcons(record);
          if (
            record.record._data.type == "Task" &&
            record.record._data.name != "Milestone Complete"
          ) {
            if (record.record._data.contractorresource) {
              record.cellElement.classList.add("b-resourceassignment-cell");
              record.cellElement.innerHTML = `<div id="" class="b-assignment-chipview-wrap">
                                  <div class="b-assignment-chipview b-widget b-list b-chipview b-outer b-visible-scrollbar b-chrome b-no-resizeobserver b-widget-scroller b-hide-scroll" tabindex="0" style="overflow-x: auto;" >
                                      <div class="b-chip" data-index="0" data-isinternalres="false" > ${record.record._data.contractorresourcename}</div>
                                      <i id="editcontractorResource" data-resource="${record.record._data.contractorresource}" class="b-action-item b-fa b-fa-pen" style="font-size:1rem;color:#cfd1d3;margin-left:0.2rem;"  ></i>
                                      </div>
                              </div>`;
            } else {
              record.cellElement.innerHTML = `
                              <i  class="b-action-item b-fa b-fa-user-plus addcontractorresource" style="font-size:1rem;color:#cfd1d3;margin-left:0.2rem;"  ></i>
                              `;
            }
          } else {
            record.cellElement.innerHTML = `<span></span>`;
          }
        },
        filterable: ({
          record,
          value,
          operator
        }) => {
          if (record._data.contractorresourcename && value) {
            if (
              record._data.contractorresourcename
                .toUpperCase()
                .indexOf(value.toUpperCase()) > -1
            ) {
              return true;
            }
          }
        }
      },
      // {
      //   type: "schedulingmodecolumn"
      // },
      // {
      //   type: "calendar"
      // },
      // {
      //   type: "constrainttype"
      // },
      {
        type: "addnew"
      }
      ],

      subGridConfigs: {
        locked: {
          flex: 3
        },
        normal: {
          flex: 4
        },
      },

      columnLines: false,

      features: {
        rowReorder: false,
        rollups: {
          disabled: true
        },
        baselines: {
          disabled: true
        },
        progressLine: {
          disabled: true,
          statusDate: new Date(2019, 0, 25)
        },
        filter: true,
        dependencyEdit: true,
        timeRanges: {
          showCurrentTimeLine: true
        },
        labels: {
          left: {
            field: "name",
            editor: {
              type: "textfield"
            }
          }
        },
        taskEdit: {
          items: {
            generalTab: {
              items: {
                // Remove "% Complete","Effort", and the divider in the "General" tab
                effort: false,
                divider: false,
                newCustomField: {
                  type: 'Combo',
                  weight: 200,
                  label: 'Phase',
                  items: this.phaseNameList,
                  name: 'Phase'
                }
              }
            },
            // Remove all tabs except the "General" tab
            successorsTab: false,
            resourcesTab: false,
            advancedTab: false
          }
        },
      }
    });

    gantt.on("cellClick", ({
      record
    }) => {
      gantt.scrollTaskIntoView(record);
    });

    gantt.callGanttComponent = this;

    console.log("gantt:-", gantt);

    gantt.on("addSuccessor", (event) => {
      // Get the data of the new task.
      const taskData = event.task;
      
      debugger;
      // Do something with the data.
      console.log("New task data: ", taskData);
    });

    //Resources data
    gantt.addListener("cellClick", (event) => {
      if (event.column.data.text == "Internal Resource") {
        if (event.target.id == "editInternalResource") {
          if (event.target.dataset.resource) {
            this.taskRecordId = event.record._data.id;
            this.showEditResourcePopup = true;
            console.log('taskReocrdId:=- ' + this.taskRecordId);
            this.selectedContactApiName = "buildertek__Resource__c";
            this.selectedResourceContact =
              event.record._data.internalresource;
          }
        } else if (event.target.classList.contains("addinternalresource")) {
          this.taskRecordId = event.record._data.id;
          console.log('taskReocrdId:=- ' + this.taskRecordId);
          this.showEditResourcePopup = true;
          this.selectedContactApiName = "buildertek__Resource__c";
          this.selectedResourceContact = "";
        }
      }
      //Added for Contractor
      if (event.column.data.text == "Contractor") {
        if (event.target.id == "editcontractor") {
          if (event.target.dataset.resource) {
            this.taskRecordId = event.record._data.id;
            console.log('taskReocrdId:=- ' + this.taskRecordId);
            this.showContractor = true;
            this.selectedContactApiName = "buildertek__Contractor__c";
            this.selectedResourceAccount = event.record._data.contractoracc;
          }
        } else if (event.target.classList.contains("addcontractor")) {
          this.taskRecordId = event.record._data.id;
          console.log('taskReocrdId:=- ' + this.taskRecordId);
          this.showContractor = true;
          this.selectedContactApiName = "buildertek__Contractor__c";
          this.selectedResourceAccount = "";
        }
      }
      if (event.column.data.text == "Contractor Resource") {
        if (event.target.id == "editcontractorResource") {
          if (event.target.dataset.resource) {
            this.taskRecordId = event.record._data.id;
            this.showEditResourcePopup = true;
            console.log('taskReocrdId:=- ' + this.taskRecordId);
            this.selectedContactApiName =
              "buildertek__Contractor_Resource__c";
            this.selectedResourceContact =
              event.record._data.contractorresource;
          }
        } else if (event.target.classList.contains("addcontractorresource")) {
          this.taskRecordId = event.record._data.id;
          this.showEditResourcePopup = true;
          console.log('taskReocrdId:=- ' + this.taskRecordId);
          this.selectedContactApiName = "buildertek__Contractor_Resource__c";
          this.selectedResourceContact = "";
        }
      }
    });


    gantt.on("expandnode", (source) => {
      // populateIcons(record);
      this.populateIconsOnExpandCollapse(source);
    });
    gantt.on("collapsenode", (source) => {
      // populateIcons(record);
      this.populateIconsOnExpandCollapse(source);
    });

    gantt.on('gridRowDrop', (record) => {
      console.log('event', {
        record
      });
      console.log('log :- ', record._data.type);
      // var droppedRecord = event.records; // The record being dropped
      // var targetRecord = event.targetRecord; // The record on which the drop occurred
      // var position = event.position; // The position where the record was dropped (e.g., 'before', 'after', 'child')
      // var draggedRow = event.draggedRow;
      // var droppedRow = event.droppedRow;
      // // Perform your custom logic here based on the dropped record, target record, and position
      // console.log('draggedRow :',draggedRow);
      // console.log('droppedRow :',droppedRow);
      // console.log('Dropped Record:', droppedRecord);
      // console.log('Target Record:', targetRecord);
      // console.log('Position:', position);

      // Example logic: If the dropped record should be added as a child of the target record
      if (position === 'child') {
        // Add the dropped record as a child of the target record
        targetRecord.appendChild(droppedRecord);
      }
    });


    project.commitAsync().then(() => {
      // console.timeEnd("load data");
      const stm = gantt.project.stm;
      console.log("stm", stm);

      stm.enable();
      stm.autoRecord = true;

      // let's track scheduling conflicts happened
      project.on("schedulingconflict", (context) => {
        // show notification to user
        bryntum.gantt.Toast.show(
          "Scheduling conflict has happened ..recent changes were reverted"
        );
        // as the conflict resolution approach let's simply cancel the changes
        context.continueWithResolutionResult(
          bryntum.gantt.EffectResolutionResult.Cancel
        );
      });
    });
  }

  //* calling this method on save changes
  saveChanges(scheduleData, taskData) {
    var that = this;
    upsertDataOnSaveChanges({
      scheduleRecordStr: JSON.stringify(scheduleData),
      taskRecordsStr: JSON.stringify(taskData),
    })
      .then(function (response) {
        console.log('response ',{response});
        // const filterChangeEvent = new CustomEvent("filterchange", {
        //   detail: {
        //     message: "refresh page",
        //   },
        // });
        // that.isLoaded = false;
        // that.dispatchEvent(filterChangeEvent);
        // window.location.reload();
      })
      .catch((error) => {
        console.log("error --> ", {
          error,
        });
        this.isLoaded = false;
      });
  }

  hideModalBox(event) {
    console.log('event in parent ', event.detail.message);
    this.showExportPopup = event.detail.message;
  }

  exportData() {
    this.showExportPopup = true;
  }
}