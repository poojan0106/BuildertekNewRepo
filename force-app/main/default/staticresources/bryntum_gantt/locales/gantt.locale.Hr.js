/*!
 *
 * Bryntum Gantt 5.3.6
 *
 * Copyright(c) 2023 Bryntum AB
 * https://bryntum.com/contact
 * https://bryntum.com/license
 *
 */
(function(l,i){var s=typeof exports=="object";if(typeof define=="function"&&define.amd)define([],i);else if(typeof module=="object"&&module.exports)module.exports=i();else{var p=i(),c=s?exports:l;for(var u in p)c[u]=p[u]}})(typeof self<"u"?self:void 0,()=>{var l={},i={exports:l},s=Object.defineProperty,p=Object.getOwnPropertyDescriptor,c=Object.getOwnPropertyNames,u=Object.prototype.hasOwnProperty,m=(e,a,o)=>a in e?s(e,a,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[a]=o,v=(e,a)=>{for(var o in a)s(e,o,{get:a[o],enumerable:!0})},k=(e,a,o,n)=>{if(a&&typeof a=="object"||typeof a=="function")for(let t of c(a))!u.call(e,t)&&t!==o&&s(e,t,{get:()=>a[t],enumerable:!(n=p(a,t))||n.enumerable});return e},g=e=>k(s({},"__esModule",{value:!0}),e),b=(e,a,o)=>(m(e,typeof a!="symbol"?a+"":a,o),o),j={};v(j,{default:()=>C}),i.exports=g(j);var d=class{static mergeLocales(...e){let a={};return e.forEach(o=>{Object.keys(o).forEach(n=>{typeof o[n]=="object"?a[n]={...a[n],...o[n]}:a[n]=o[n]})}),a}static trimLocale(e,a){let o=(n,t)=>{e[n]&&(t?e[n][t]&&delete e[n][t]:delete e[n])};Object.keys(a).forEach(n=>{Object.keys(a[n]).length>0?Object.keys(a[n]).forEach(t=>o(n,t)):o(n)})}static normalizeLocale(e,a){if(!e)throw new Error('"nameOrConfig" parameter can not be empty');if(typeof e=="string"){if(!a)throw new Error('"config" parameter can not be empty');a.locale?a.name=e||a.name:a.localeName=e}else a=e;let o={};if(a.name||a.locale)o=Object.assign({localeName:a.name},a.locale),a.desc&&(o.localeDesc=a.desc),a.code&&(o.localeCode=a.code),a.path&&(o.localePath=a.path);else{if(!a.localeName)throw new Error(`"config" parameter doesn't have "localeName" property`);o=Object.assign({},a)}for(let n of["name","desc","code","path"])o[n]&&delete o[n];if(!o.localeName)throw new Error("Locale name can not be empty");return o}static get locales(){return globalThis.bryntum.locales||{}}static set locales(e){globalThis.bryntum.locales=e}static get localeName(){return globalThis.bryntum.locale||"En"}static set localeName(e){globalThis.bryntum.locale=e||d.localeName}static get locale(){return d.localeName&&this.locales[d.localeName]||this.locales.En||Object.values(this.locales)[0]||{localeName:"",localeDesc:"",localeCoode:""}}static publishLocale(e,a){let{locales:o}=globalThis.bryntum,n=d.normalizeLocale(e,a),{localeName:t}=n;return!o[t]||a===!0?o[t]=n:o[t]=this.mergeLocales(o[t]||{},n||{}),o[t]}},r=d;b(r,"skipLocaleIntegrityCheck",!1),globalThis.bryntum=globalThis.bryntum||{},globalThis.bryntum.locales=globalThis.bryntum.locales||{},r._$name="LocaleHelper";var D={localeName:"Hr",localeDesc:"Hrvatski",localeCode:"hr",RemoveDependencyCycleEffectResolution:{descriptionTpl:"Ukloni ovisnost"},DeactivateDependencyCycleEffectResolution:{descriptionTpl:"Deaktiviraj ovisnost"},CycleEffectDescription:{descriptionTpl:"Pronađen je ciklus, oblikovan od: {0}"},EmptyCalendarEffectDescription:{descriptionTpl:'"{0}" kalendar ne daje nikakve radne vremenske intervale.'},Use24hrsEmptyCalendarEffectResolution:{descriptionTpl:"Koristi 24-satni kalendar s neradnim subotama i nedjeljama."},Use8hrsEmptyCalendarEffectResolution:{descriptionTpl:"Koristi 8-satni kalendar (08:00-12:00, 13:00-17:00) s neradnim subotama i nedjeljama."},ConflictEffectDescription:{descriptionTpl:"Pronađeno je preklapanje u rasporedu: {0} se preklapa s {1}"},ConstraintIntervalDescription:{dateFormat:"LLL"},ProjectConstraintIntervalDescription:{startDateDescriptionTpl:"Datum početka projekta {0}",endDateDescriptionTpl:"Datum završetka projekta {0}"},DependencyType:{long:["Od početka na početak","Od početka na završetak","Od završetka na početak","Od završetka na završetak"]},ManuallyScheduledParentConstraintIntervalDescription:{startDescriptionTpl:'Ručno zakazano "{2}" tjera podređene elemente da započnu ranije od {0}',endDescriptionTpl:'Ručno zakazano "{2}" tjera podređene elemente da završe kasnije od {1}'},DisableManuallyScheduledConflictResolution:{descriptionTpl:'Onemogući ručno zakazivanje za "{0}"'},DependencyConstraintIntervalDescription:{descriptionTpl:'Ovisnost ({2}) od "{3}" do "{4}"'},RemoveDependencyResolution:{descriptionTpl:'Ukloni ovisnost od "{1}" do "{2}"'},DeactivateDependencyResolution:{descriptionTpl:'Deaktiviraj ovisnost od "{1}" do "{2}"'},DateConstraintIntervalDescription:{startDateDescriptionTpl:'Zadatak "{2}" {3} {0} ograničen',endDateDescriptionTpl:'Zadatak "{2}" {3} {1} ograničen',constraintTypeTpl:{startnoearlierthan:"Započeti ne ranije od",finishnoearlierthan:"Završiti ne ranije od",muststarton:"Treba započeti na",mustfinishon:"Treba završiti na",startnolaterthan:"Započeti ne kasnije od",finishnolaterthan:"Završiti ne kasnije od"}},RemoveDateConstraintConflictResolution:{descriptionTpl:'Ukloni "{1}" ograničenje zadatka "{0}"'}},E=r.publishLocale(D),y={localeName:"Hr",localeDesc:"Hrvatski",localeCode:"hr",Object:{Yes:"Da",No:"Ne",Cancel:"Otkaži",Ok:"U redu",Week:"Tjedan"},Combo:{noResults:"Nema rezultata",recordNotCommitted:"Zapis nije moguće dodati",addNewValue:e=>`Dodaj ${e}`},FilePicker:{file:"Datoteka"},Field:{badInput:"Nevažeća vrijednost polja",patternMismatch:"Vrijednost treba odgovarati određenom obrascu",rangeOverflow:e=>`Vrijednost treba biti manja ili jednaka ${e.max}`,rangeUnderflow:e=>`Vrijednost treba biti veća ili jednaka ${e.min}`,stepMismatch:"Vrijednost treba odgovarati koraku",tooLong:"Vrijednost treba biti kraća",tooShort:"Vrijednost treba biti duža",typeMismatch:"Vrijednost treba biti u određenom formatu",valueMissing:"Polje je obavezno",invalidValue:"Nevažeća vrijednost polja",minimumValueViolation:"Pogreška minimalne vrijednosti",maximumValueViolation:"Pogreška maksimalne vrijednosti",fieldRequired:"Polje je obavezno",validateFilter:"Vrijednost treba odabrati s popisa"},DateField:{invalidDate:"Uneseni datum nije važeći"},DatePicker:{gotoPrevYear:"Idi na prethodnu godinu",gotoPrevMonth:"Idi na prethodni mjesec",gotoNextMonth:"Idi na sljedeći mjesec",gotoNextYear:"Idi na sljedeću godinu"},NumberFormat:{locale:"hr",currency:"HRK"},DurationField:{invalidUnit:"Nevažeća jedinica"},TimeField:{invalidTime:"Unos vremena nije važeći"},TimePicker:{hour:"Sat",minute:"Minuta",second:"Sekunde"},List:{loading:"Učitavanje..."},GridBase:{loadMask:"Učitavanje...",syncMask:"Spremanje promjena u tijeku, pričekajte..."},PagingToolbar:{firstPage:"Idi na prvu stranicu",prevPage:"Idi na prethodnu stranicu",page:"Stranica",nextPage:"Idi na sljedeću stranicu",lastPage:"Idi na posljednju stranicu",reload:"Ponovno učitaj trenutačnu stranicu",noRecords:"Nema zapisa za prikazivanje",pageCountTemplate:e=>`od ${e.lastPage}`,summaryTemplate:e=>`Prikazivanje zapisa ${e.start} - ${e.end} od ${e.allCount}`},PanelCollapser:{Collapse:"Sažmi",Expand:"Proširi"},Popup:{close:"Zatvori skočni prozorčić"},UndoRedo:{Undo:"Poništi",Redo:"Vrati poništeno",UndoLastAction:"Poništi posljednju radnju",RedoLastAction:"Vrati posljednje poništenu radnju",NoActions:"Nema stavki u redoslijedu poništavanja"},FieldFilterPicker:{equals:"jednako",doesNotEqual:"nije jednako",isEmpty:"prazno",isNotEmpty:"nije prazno",contains:"sadrži",doesNotContain:"ne sadrži",startsWith:"počinje s",endsWith:"završava s",isOneOf:"jedan je od",isNotOneOf:"nije jedan od",isGreaterThan:"veći je od",isLessThan:"manji je od",isGreaterThanOrEqualTo:"je veći ili jednak",isLessThanOrEqualTo:"je manji ili jednak",isBetween:"je između",isNotBetween:"nije između",isBefore:"je prije",isAfter:"je nakon",isToday:"je danas",isTomorrow:"je sutra",isYesterday:"je jučer",isThisWeek:"je ovaj tjedan",isNextWeek:"je sljedeći tjedan",isLastWeek:"je prošli tjedan",isThisMonth:"je ovaj mjesec",isNextMonth:"je sljedeći mjesec",isLastMonth:"je zadnji mjesec",isThisYear:"je ove godine",isNextYear:"je sljedeće godine",isLastYear:"je prethodne godine",isYearToDate:"je godina do danas",isTrue:"je istina",isFalse:"je neispravno",selectAProperty:"Odaberite nekretninu",selectAnOperator:"Odaberite operatera",caseSensitive:"Osjetljivo na velika i mala slova",and:"i",dateFormat:"D/M/YY",selectOneOrMoreValues:"Odaberite jednu ili više vrijednosti",enterAValue:"Unos vrijednosti",enterANumber:"Unos broja",selectADate:"Odaberite datum"},FieldFilterPickerGroup:{addFilter:"Dodaj filter"},DateHelper:{locale:"hr",weekStartDay:1,nonWorkingDays:{0:!0,6:!0},weekends:{0:!0,6:!0},unitNames:[{single:"milisekunda",plural:"milisekunde",abbrev:"ms"},{single:"sekunda",plural:"sekunde",abbrev:"s"},{single:"minuta",plural:"minute",abbrev:"min"},{single:"sat",plural:"sati",abbrev:"h"},{single:"dan",plural:"dani",abbrev:"d"},{single:"tjedan",plural:"tjedni",abbrev:"w"},{single:"mjesec",plural:"mjeseci",abbrev:"mon"},{single:"tromjesečje",plural:"tromjesečja",abbrev:"q"},{single:"godina",plural:"godine",abbrev:"yr"},{single:"desetljeće",plural:"desetljeća",abbrev:"dec"}],unitAbbreviations:[["mil"],["s","sec"],["m","min"],["h","hr"],["d"],["w","wk"],["mo","mon","mnt"],["q","quar","qrt"],["y","yr"],["dec"]],parsers:{L:"D.M.YYYY.",LT:"HH:mm",LTS:"HH:mm:ss A"},ordinalSuffix:e=>e+"."}},N=r.publishLocale(y),h=new String,z={localeName:"Hr",localeDesc:"Hrvatski",localeCode:"hr",ColumnPicker:{column:"Stupac",columnsMenu:"Stupci",hideColumn:"Sakrij stupac",hideColumnShort:"Sakrij",newColumns:"Novi stupci"},Filter:{applyFilter:"Primijeni filtar",filter:"Filtar",editFilter:"Uredi filtar",on:"Na",before:"Prije",after:"Poslije",equals:"Jednako",lessThan:"Manje od",moreThan:"Više od",removeFilter:"Ukloni filtar",disableFilter:"Onemogući filtar"},FilterBar:{enableFilterBar:"Pokaži traku s filtrima",disableFilterBar:"Sakrij traku s filtrima"},Group:{group:"Grupiraj",groupAscending:"Grupiraj uzlazno",groupDescending:"Grupiraj silazno",groupAscendingShort:"Uzlazno",groupDescendingShort:"Silazno",stopGrouping:"Zaustavi grupiranje",stopGroupingShort:"Zaustavi"},HeaderMenu:{moveBefore:e=>`Pomakni prije "${e}"`,moveAfter:e=>`Pomakni nakon "${e}"`,collapseColumn:"Sažmi stupac",expandColumn:"Proširi stupac"},ColumnRename:{rename:"Preimenuj"},MergeCells:{mergeCells:"Spoji ćelije",menuTooltip:"Spoji ćelije s istom vrijednosti kad su razvrstane po ovom stupcu"},Search:{searchForValue:"Pretraži vrijednost"},Sort:{sort:"Razvrstaj",sortAscending:"Razvrstaj uzlazno",sortDescending:"Razvrstaj silazno",multiSort:"Višestruko razvrstavanje",removeSorter:"Ukloni razvrstavač",addSortAscending:"Dodaj uzlazni razvrstavač",addSortDescending:"Dodaj silazni razvrstavač",toggleSortAscending:"Promijeni na uzlazno",toggleSortDescending:"Promijeni na silazno",sortAscendingShort:"Uzlazno",sortDescendingShort:"Silazno",removeSorterShort:"Ukloni",addSortAscendingShort:"+ Uzlazno",addSortDescendingShort:"+ Silazno"},Column:{columnLabel:e=>`${e.text?`${e.text} stupac. `:""}RAZMAKNICA za kontekstni izbornik${e.sortable?", ENTER za razvrstavanje":""}`,cellLabel:h},Checkbox:{toggleRowSelect:"Prebaci odabir retka",toggleSelection:"Prebaci odabir čitavog skupa podataka"},RatingColumn:{cellLabel:e=>{var a;return`${e.text?e.text:""} ${(a=e.location)!=null&&a.record?`ocjena : ${e.location.record[e.field]||0}`:""}`}},GridBase:{loadFailedMessage:"Učitavanje podataka nije uspjelo!",syncFailedMessage:"Sinkronizacija podataka nije uspjela!",unspecifiedFailure:"Neočekivana pogreška",networkFailure:"Pogreška mreže",parseFailure:"Analiziranje odgovora poslužitelja nije uspjelo",serverResponse:"Odgovor poslužitelja:",noRows:"Nema zapisa za prikazivanje",moveColumnLeft:"Pomakni se na lijevi odjeljak",moveColumnRight:"Pomakni se na desni odjeljak",moveColumnTo:e=>`Pomakni stupac na ${e}`},CellMenu:{removeRow:"Obriši"},RowCopyPaste:{copyRecord:"Kopiraj",cutRecord:"Izreži",pasteRecord:"Zalijepi",rows:"redci",row:"redak"},CellCopyPaste:{copy:"Kopiraj",cut:"Izreži",paste:"Zalijepi"},PdfExport:{"Waiting for response from server":"Čeka se odgovor poslužitelja...","Export failed":"Izvoz nije uspio","Server error":"Pogreška poslužitelja","Generating pages":"Izrada stranica...","Click to abort":"Otkaži"},ExportDialog:{width:"40em",labelWidth:"12em",exportSettings:"Postavke izvoza",export:"Izvoz",exporterType:"Kontrola numeriranja stranica",cancel:"Otkaži",fileFormat:"Oblik datoteke",rows:"Retci",alignRows:"Poravnaj retke",columns:"Stupci",paperFormat:"Oblik papira",orientation:"Usmjerenje",repeatHeader:"Ponovi zaglavlje"},ExportRowsCombo:{all:"Svi retci",visible:"Vidljivi retci"},ExportOrientationCombo:{portrait:"Okomito",landscape:"Vodoravno"},SinglePageExporter:{singlepage:"Jedna stranica"},MultiPageExporter:{multipage:"Višestruke stranice",exportingPage:({currentPage:e,totalPages:a})=>`Izvoz stranice ${e}/${a}`},MultiPageVerticalExporter:{multipagevertical:"Višestruke stranice (okomito)",exportingPage:({currentPage:e,totalPages:a})=>`Izvoz stranice ${e}/${a}`},RowExpander:{loading:"Učitavanje",expand:"Proširi",collapse:"Sažmi"}},O=r.publishLocale(z),T={localeName:"Hr",localeDesc:"Hrvatski",localeCode:"hr",Object:{newEvent:"Novi događaj"},ResourceInfoColumn:{eventCountText:e=>e+" događa"+(e!==1?"i":"")},Dependencies:{from:"Od",to:"Do",valid:"Važeće",invalid:"Nevažeće"},DependencyType:{SS:"SS",SF:"SF",FS:"FS",FF:"FF",StartToStart:"Od početka na početak",StartToEnd:"Od početka na završetak",EndToStart:"Od završetka na početak",EndToEnd:"Od završetka na završetak",short:["SS","SF","FS","FF"],long:["Od početka na početak","Od početka na završetak","Od završetka na početak","Od završetka na završetak"]},DependencyEdit:{From:"Od",To:"Do",Type:"Vrsta",Lag:"Odgoda","Edit dependency":"Uredi ovisnost",Save:"Spremi",Delete:"Obriši",Cancel:"Otkaži",StartToStart:"Od početka na početak",StartToEnd:"Od početka na završetak",EndToStart:"Od završetka na početak",EndToEnd:"Od završetka na završetak"},EventEdit:{Name:"Naziv",Resource:"Resurs",Start:"Početak",End:"Završetak",Save:"Spremi",Delete:"Obriši",Cancel:"Otkaži","Edit event":"Uredi događaj",Repeat:"Ponovi"},EventDrag:{eventOverlapsExisting:"Događaj se poklapa s već postojećim događajem za ovaj resurs",noDropOutsideTimeline:"Događaj se ne smije potpuno ispustiti izvan vremenske trake"},SchedulerBase:{"Add event":"Dodaj događaj","Delete event":"Obriši događaj","Unassign event":"Poništi dodjelu događaja"},TimeAxisHeaderMenu:{pickZoomLevel:"Povećaj ili smanji",activeDateRange:"Raspon datuma",startText:"Datum početka",endText:"Datum završetka",todayText:"Danas"},EventCopyPaste:{copyEvent:"Kopiraj događaj",cutEvent:"Izreži događaj",pasteEvent:"Zalijepi događaj"},EventFilter:{filterEvents:"Filtriraj zadatke",byName:"Po nazivu"},TimeRanges:{showCurrentTimeLine:"Pokaži trenutačnu vremensku traku"},PresetManager:{secondAndMinute:{displayDateFormat:"ll LTS",name:"Sekunde"},minuteAndHour:{topDateFormat:"ddd DD.MM., H",displayDateFormat:"ll LST"},hourAndDay:{topDateFormat:"ddd DD.MM.",middleDateFormat:"LST",displayDateFormat:"ll LST",name:"Dani"},day:{name:"Dan/sati"},week:{name:"Tjedan/sati"},dayAndWeek:{displayDateFormat:"ll LST",name:"Tjedan/dani"},dayAndMonth:{name:"Mjesec"},weekAndDay:{displayDateFormat:"ll LST",name:"Tjedan"},weekAndMonth:{name:"Tjedni"},weekAndDayLetter:{name:"Tjedni/Dani u tjednu"},weekDateAndMonth:{name:"Mjeseci/Tjedni"},monthAndYear:{name:"Mjeseci"},year:{name:"Godine"},manyYears:{name:"Više godina"}},RecurrenceConfirmationPopup:{"delete-title":"Brišete događaj","delete-all-message":"Želite li obrisati sva pojavljivanja ovog događaja?","delete-further-message":"Želite li obrisati ovo i sva buduća pojavljivanja ovog događaja ili samo odabrano pojavljivanje?","delete-further-btn-text":"Obriši sve događaje u budućnosti","delete-only-this-btn-text":"Izbriši samo ovaj događaj","update-title":"Mijenjate ponavljajući događaj","update-all-message":"Želite li izmijeniti sva pojavljivanja ovog događaja?","update-further-message":"Želite li izmijeniti samo ovo pojavljivanje događaja ili ovo i sva buduća pojavljivanja?","update-further-btn-text":"Svi budući događaji","update-only-this-btn-text":"Samo ovaj događaj",Yes:"Da",Cancel:"Otkaži",width:600},RecurrenceLegend:{" and ":" i ",Daily:"Svakodnevno","Weekly on {1}":({days:e})=>`Tjedno ${e}`,"Monthly on {1}":({days:e})=>`Mjesečno ${e}`,"Yearly on {1} of {2}":({days:e,months:a})=>`Godišnje ${e} od ${a}`,"Every {0} days":({interval:e})=>`Svakih ${e} dana`,"Every {0} weeks on {1}":({interval:e,days:a})=>`Svaka ${e} tjedna ${a}`,"Every {0} months on {1}":({interval:e,days:a})=>`Svaka ${e} mjeseca ${a}`,"Every {0} years on {1} of {2}":({interval:e,days:a,months:o})=>`Svake ${e} godine ${a} od ${o}`,position1:"prvi",position2:"drugi",position3:"treći",position4:"četvrti",position5:"peti","position-1":"posljednji",day:"dan",weekday:"radni dan","weekend day":"dan vikenda",daysFormat:({position:e,days:a})=>`${e} ${a}`},RecurrenceEditor:{"Repeat event":"Ponovi događaj",Cancel:"Otkaži",Save:"Spremi",Frequency:"Učestalost",Every:"Svaki(h)",DAILYintervalUnit:"dan(a)",WEEKLYintervalUnit:"tjedan(a)",MONTHLYintervalUnit:"mjesec(i)",YEARLYintervalUnit:"godina",Each:"Svaki","On the":"Na","End repeat":"Završi ponavljanje","time(s)":"put(a)"},RecurrenceDaysCombo:{day:"dan",weekday:"radni dan","weekend day":"dan vikenda"},RecurrencePositionsCombo:{position1:"prvi",position2:"drugi",position3:"treći",position4:"četvrti",position5:"peti","position-1":"posljednji"},RecurrenceStopConditionCombo:{Never:"Nikada",After:"Nakon","On date":"Na datum"},RecurrenceFrequencyCombo:{None:"Bez ponavljanja",Daily:"Svakodnevno",Weekly:"Tjedno",Monthly:"Mjesečno",Yearly:"Godišnje"},RecurrenceCombo:{None:"Nijedan",Custom:"Prilagođeno..."},Summary:{"Summary for":e=>`Sažetak za ${e}`},ScheduleRangeCombo:{completeview:"Cijeli raspored",currentview:"Vidljivi raspored",daterange:"Raspon datuma",completedata:"Cijeli raspored (za sve događaje)"},SchedulerExportDialog:{"Schedule range":"Raspon rasporeda","Export from":"Od","Export to":"Do"},ExcelExporter:{"No resource assigned":"Nema dodijeljenog resursa"},CrudManagerView:{serverResponseLabel:"Odgovor poslužitelja:"},DurationColumn:{Duration:"Trajanje"}},R=r.publishLocale(T),S={localeName:"Hr",localeDesc:"Hrvatski",localeCode:"hr",ConstraintTypePicker:{none:"Nijedan",muststarton:"Treba započeti na",mustfinishon:"Treba završiti na",startnoearlierthan:"Započeti ne ranije od",startnolaterthan:"Započeti ne kasnije od",finishnoearlierthan:"Završiti ne ranije od",finishnolaterthan:"Završiti ne kasnije od"},CalendarField:{"Default calendar":"Zadani kalendar"},TaskEditorBase:{Information:"Informacije",Save:"Spremi",Cancel:"Otkaži",Delete:"Obriši",calculateMask:"Izračun u tijeku...",saveError:"Spremanje nije moguće, najprije ispravite pogreške",repeatingInfo:"Gledanje događaja koji se ponavlja",editRepeating:"Uređivanje"},TaskEdit:{"Edit task":"Uredi zadatak",ConfirmDeletionTitle:"Potvrdi brisanje",ConfirmDeletionMessage:"Sigurno želite obrisati događaj?"},GanttTaskEditor:{editorWidth:"44em"},SchedulerTaskEditor:{editorWidth:"32em"},SchedulerGeneralTab:{labelWidth:"6em",General:"Općenito",Name:"Naziv",Resources:"Resursi","% complete":"% dovršeno",Duration:"Trajanje",Start:"Početak",Finish:"Završetak",Effort:"Effort",Preamble:"Uvod",Postamble:"Zaključak"},GeneralTab:{labelWidth:"6.5em",General:"Općenito",Name:"Naziv","% complete":"% dovršeno",Duration:"Trajanje",Start:"Početak",Finish:"Završetak",Effort:"Effort",Dates:"Datumi"},SchedulerAdvancedTab:{labelWidth:"13em",Advanced:"Napredno",Calendar:"Kalendar","Scheduling mode":"Način zakazivanja","Effort driven":"Utemeljeno na effortu","Manually scheduled":"Ručno zakazano","Constraint type":"Vrsta ograničenja","Constraint date":"Datum ograničenja",Inactive:"Neaktivno","Ignore resource calendar":"Zanemari kalendar resursa"},AdvancedTab:{labelWidth:"11.5em",Advanced:"Napredno",Calendar:"Kalendar","Scheduling mode":"Način zakazivanja","Effort driven":"Utemeljeno na effortu","Manually scheduled":"Ručno zakazano","Constraint type":"Vrsta ograničenja","Constraint date":"Datum ograničenja",Constraint:"Ograničenje",Rollup:"Kumulirano",Inactive:"Neaktivno","Ignore resource calendar":"Zanemari kalendar resursa"},DependencyTab:{Predecessors:"Prethodnici",Successors:"Nasljednici",ID:"ID",Name:"Naziv",Type:"Vrsta",Lag:"Odgoda",cyclicDependency:"Ciklička ovisnost",invalidDependency:"Nevažeća ovisnost"},NotesTab:{Notes:"Bilješke"},ResourcesTab:{unitsTpl:({value:e})=>`${e}%`,Resources:"Resursi",Resource:"Resurs",Units:"Jedinice"},RecurrenceTab:{title:"Ponovi"},SchedulingModePicker:{Normal:"Normalno","Fixed Duration":"Fiksno trajanje","Fixed Units":"Fiksne jedinice","Fixed Effort":"Fiksni napor"},ResourceHistogram:{barTipInRange:'<b>{resource}</b> {startDate} - {endDate}<br><span class="{cls}">{allocated} od {available}</span> dodijeljeno',barTipOnDate:'<b>{resource}</b> on {startDate}<br><span class="{cls}">{allocated} od {available}</span> dodijeljeno',groupBarTipAssignment:'<b>{resource}</b> - <span class="{cls}">{allocated} od {available}</span>',groupBarTipInRange:'{startDate} - {endDate}<br><span class="{cls}">{allocated} od {available}</span> allocated:<br>{assignments}',groupBarTipOnDate:'Na {startDate}<br><span class="{cls}">{allocated} od {available}</span> dodijeljeno:<br>{assignments}',plusMore:"+{value} više"},ResourceUtilization:{barTipInRange:'<b>{event}</b> {startDate} - {endDate}<br><span class="{cls}">{allocated}</span> dodijeljeno',barTipOnDate:'<b>{event}</b> na {startDate}<br><span class="{cls}">{allocated}</span> dodijeljeno',groupBarTipAssignment:'<b>{event}</b> - <span class="{cls}">{allocated}</span>',groupBarTipInRange:'{startDate} - {endDate}<br><span class="{cls}">{allocated} od {available}</span> dodijeljeno:<br>{assignments}',groupBarTipOnDate:'Na {startDate}<br><span class="{cls}">{allocated} od {available}</span> dodijeljeno:<br>{assignments}',plusMore:"+{value} više",nameColumnText:"Resurs / događaj"},SchedulingIssueResolutionPopup:{"Cancel changes":"Otkaži promjenu i ne čini ništa",schedulingConflict:"Preklapanje u rasporedu",emptyCalendar:"Konfiguracijska pogreška kalendara",cycle:"Ciklus rasporeda",Apply:"Primijeni"},CycleResolutionPopup:{dependencyLabel:"Odaberite ovisnost:",invalidDependencyLabel:"Uključene su nevažeće ovisnosti koje je potrebno riješiti:"},DependencyEdit:{Active:"Aktivno"},SchedulerProBase:{propagating:"Izračunavanje projekta",storePopulation:"Učitavanje podataka",finalizing:"Dovršavanje rezultata"},EventSegments:{splitEvent:"Odvojeni događaj",renameSegment:"Preimenuj"},NestedEvents:{deNestingNotAllowed:"Odgniježđivanje nije dopušteno",nestingNotAllowed:"Gniježđenje nije dopušteno"},VersionGrid:{compare:"Usporedi",description:"Opis",occurredAt:"Dogodilo se u",rename:"Preimenuj",restore:"Vrati",stopComparing:"Prekini usporedbu"},Versions:{entityNames:{TaskModel:"zadaća",AssignmentModel:"zadatak",DependencyModel:"link",ProjectModel:"projekt",ResourceModel:"resurs",other:"objekt"},entityNamesPlural:{TaskModel:"zadaća",AssignmentModel:"zadatak",DependencyModel:"links",ProjectModel:"projekt",ResourceModel:"resurs",other:"objekt"},transactionDescriptions:{update:"Promijenjeno {n} {entiteti}",add:"Dodano {n} {entiteti}",remove:"Uklonjeno {n} {entiteti}",move:"Pomaknuto {n} {entiteti}",mixed:"Promijenjeno {n} {entiteti}"},addEntity:"Dodano {tip} **{ime}**",removeEntity:"Uklonjeno {tip} **{ime}**",updateEntity:"Promijenjeno {tip} **{ime}**",moveEntity:"Pomaknuto {tip} **{ime}** od {od} do {do}",addDependency:"Dodano link od **{od}** do **{do}**",removeDependency:"Uklonjeno link od **{od}** do **{do}**",updateDependency:"Uređen link od **{od}** do **{do}**",addAssignment:"Assigned **{resursi}** do **{događaj}**",removeAssignment:"Uklonjeno zadatak of **{resursi}** od **{događaj}**",updateAssignment:"Uređen zadatak of **{resursi}** do **{događaj}**",noChanges:"Nema promjene",nullValue:"none",versionDateFormat:"M/D/YYYY h:mm a",undid:"Undid promjene",redid:"Redid promjene",editedTask:"Uređen zadatak i svojstva",deletedTask:"Obrisan zadatak",movedTask:"Pomaknuti zadatak",movedTasks:"Pomaknuti zadatak"}},M=r.publishLocale(S),f={localeName:"Hr",localeDesc:"Hrvatski",localeCode:"hr",Object:{Save:"Spremi"},IgnoreResourceCalendarColumn:{"Ignore resource calendar":"Zanemari kalendar resursa"},InactiveColumn:{Inactive:"Neaktivno"},AddNewColumn:{"New Column":"Novi stupac"},CalendarColumn:{Calendar:"Kalendar"},EarlyStartDateColumn:{"Early Start":"Rani početak"},EarlyEndDateColumn:{"Early End":"Rani završetak"},LateStartDateColumn:{"Late Start":"Kasni početak"},LateEndDateColumn:{"Late End":"Kasni završetak"},TotalSlackColumn:{"Total Slack":"Ukupni slobodni hod"},ConstraintDateColumn:{"Constraint Date":"Datum ograničenja"},ConstraintTypeColumn:{"Constraint Type":"Vrsta ograničenja"},DeadlineDateColumn:{Deadline:"Rok"},DependencyColumn:{"Invalid dependency":"Nevažeća ovisnost"},DurationColumn:{Duration:"Trajanje"},EffortColumn:{Effort:"Napor"},EndDateColumn:{Finish:"Završetak"},EventModeColumn:{"Event mode":"Način događaja",Manual:"Ručno",Auto:"Automatski"},ManuallyScheduledColumn:{"Manually scheduled":"Ručno zakazano"},MilestoneColumn:{Milestone:"Kontrolna točka"},NameColumn:{Name:"Naziv"},NoteColumn:{Note:"Bilješka"},PercentDoneColumn:{"% Done":"% dovršeno"},PredecessorColumn:{Predecessors:"Prethodnici"},ResourceAssignmentColumn:{"Assigned Resources":"Dodijeljeni resursi","more resources":"više resursa"},RollupColumn:{Rollup:"Smotajte"},SchedulingModeColumn:{"Scheduling Mode":"Način zakazivanja"},SequenceColumn:{Sequence:"Redoslijed"},ShowInTimelineColumn:{"Show in timeline":"Prikaži u stupcu s vremenskim razdobljima"},StartDateColumn:{Start:"Početak"},SuccessorColumn:{Successors:"Nasljednici"},TaskCopyPaste:{copyTask:"Kopiraj",cutTask:"Izreži",pasteTask:"Zalijepi"},WBSColumn:{WBS:"WBS",renumber:"Ponovno numeriraj"},DependencyField:{invalidDependencyFormat:"Nevažeći oblik ovisnosti"},ProjectLines:{"Project Start":"Početak projekta","Project End":"Završetak projekta"},TaskTooltip:{Start:"Početak",End:"Završetak",Duration:"Trajanje",Complete:"Dovršeno"},AssignmentGrid:{Name:"Naziv resursa",Units:"Jedinice",unitsTpl:({value:e})=>e?e+"%":""},Gantt:{Edit:"Uredi",Indent:"Uvuci",Outdent:"Izvuci","Convert to milestone":"Pretvori u kontrolnu točku",Add:"Dodaj...","New task":"Novi zadatak","New milestone":"Nova kontrola točka","Task above":"Zadatak iznad","Task below":"Zadatak ispod","Delete task":"Obriši",Milestone:"Kontrolna točka","Sub-task":"Podzadatak",Successor:"Nasljednik",Predecessor:"Prethodnik",changeRejected:"Mehanizam zakazivanja odbio je promjene",linkTasks:"Dodaj zavisnosti",unlinkTasks:"Uklonite zavisnosti"},EventSegments:{splitTask:"Odvojeni zadatak"},Indicators:{earlyDates:"Rani početak/završetak",lateDates:"Kasni početak/završetak",Start:"Početak",End:"Završetak",deadlineDate:"Rok"},Versions:{indented:"Uvučeno",outdented:"Izvučeno",cut:"Izrezano",pasted:"Zalijepljeno",deletedTasks:"Obrisani zadaci"}},C=r.publishLocale(f);if(typeof i.exports=="object"&&typeof l=="object"){var P=(e,a,o,n)=>{if(a&&typeof a=="object"||typeof a=="function")for(let t of Object.getOwnPropertyNames(a))!Object.prototype.hasOwnProperty.call(e,t)&&t!==o&&Object.defineProperty(e,t,{get:()=>a[t],enumerable:!(n=Object.getOwnPropertyDescriptor(a,t))||n.enumerable});return e};i.exports=P(i.exports,l)}return i.exports});