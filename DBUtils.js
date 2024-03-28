let dbWasInitilized = false;
function dbInit() {
	if(!dbWasInitilized) {
		if(localStorage.getItem("all_themes") == null) {
			localStorage.setItem("all_themes", JSON.stringify(["default", "alt1"]));
			localStorage.setItem("theme_default", JSON.stringify({
					styleCalendar: {
									 stroke: "black"
									,fill:"lightgray"
								}
					,styleYearMonthDivider: {
									 stroke:"black"
									,"stroke-width": 2
								}
					,styleMonthDatesDivider: {
									stroke:"black"
								}
					,styleDatesVerticleDivider: {
									stroke:"black"
								}
					,styleDatesHorizontalDivider: {
									stroke:"black"
								}
					,styleOffMonthHighlight: {
									 fill: "black"
									,opacity: 0.2
								}
					,styleDateNumberBackground: {
									 opacity: 0.5
									,fill:"lightblue"
									,stroke: "black"
								}
					,styleWeekend: {
									 opacity: 0.2
									,fill: "yellow"
								}
					,styleYearMonthText: {
									"font-family": "sans-serif"
									,bumpScale: 0.3
									,bumpY: 0.08
								}
					,styleWeekDayText: {
									"font-family": "sans-serif"
									//,bumpScale: true ? -0.3 : 0
									,bumpScale: -0.1
									,bumpY: 0.08
								}
					,styleDateText: {
									"font-family": "sans-serif"
									,bumpScale: 0.3
									,bumpY: 0.08
								}
					,styleMonthChangeControl: {
									"font-family": "sans-serif"
									,bumpScale: 0.3
									,bumpY: 0.08
									,cursor: "pointer"
					}
					,styleEventSlotBackground: {
									 fill: "lightgreen"
									,stroke: "black"
									,"stroke-width": 0.5
									,cursor: "pointer"
								}
					,styleEventSlotText: {
									 fill: "red"
									,bumpScale: -0.09
									,"font-family": "sans-serif"
								}
					,styleEventIconText: {
									 bumpScale: -0.15
								}
				}
			));
			console.log("pre set theme_alt1");
			localStorage.setItem("theme_alt1", JSON.stringify({
					 styleCalendar: {
									 stroke: "green"
									,fill:"black"
								}
					,styleYearMonthDivider: {
									 stroke:"green"
									,"stroke-width": 3
								}
					,styleMonthDatesDivider: {
									stroke:"green"
								}
					,styleDatesVerticleDivider: {
									stroke:"green"
								}
					,styleDatesHorizontalDivider: {
									stroke:"green"
								}
					,styleOffMonthHighlight: {
									 fill: "green"
									,opacity: 0.4
								}
					,styleDateNumberBackground: {
									 opacity: 0.8
									,fill:"lightgreen"
									,stroke: "darkgreen"
								}
					,styleWeekend: {
									 opacity: 0.2
									,fill: "yellow"
								}
					,styleYearMonthText: {
									"font-family": "sans-serif"
									,fill: "green"
									,bumpScale: 0.3
									,bumpY: 0.08
								}
					,styleWeekDayText: {
									"font-family": "sans-serif"
									,fill: "green"
									,bumpScale: true ? 0.3 : 0
									,bumpY: 0.08
								}
					,styleDateText: {
									"font-family": "sans-serif"
									,fill: "green"
									,bumpScale: 0.3
									,bumpY: 0.08
								}
					,styleMonthChangeControl: {
									"font-family": "sans-serif"
									,fill: "green"
									,bumpScale: 0.3
									,bumpY: 0.08
									,cursor: "pointer"
					,styleEventSlotBackground: {
									 fill: "lightgreen"
									,stroke: "black"
									,"stroke-width": 0.5
									,cursor: "pointer"
								}
					,styleEventSlotText: {
									 fill: "red"
									,bumpScale: -0.09
									,"font-family": "sans-serif"
								}
					,styleEventIconText: {
									 bumpScale: -0.15
								}
					}
				}
			));
		}
		if(localStorage.getItem("all_eventIDs") == null) {
			localStorage.setItem("all_eventIDs", "[]");
		}
		if(localStorage.getItem("all_ruleIDs") == null) {
			localStorage.setItem("all_ruleIDs", "[]");
		}
		dbWasInitilized = true;
	}
}
function getAllThemes() {
	dbInit();
	return JSON.parse(localStorage.getItem("all_themes"));
}
function getTheme(themeName) {
	dbInit();
	if(localStorage.getItem(`theme_${themeName}`) == null) {
		getAllThemes();
	}
	return JSON.parse(localStorage.getItem(`theme_${themeName}`));
}
function addEvent(event) {
	dbInit();
	let eventID = `e_${(new Date()).getTime()}_${Math.round(Math.random()*100000)}`; //uuidv4(); //uuidv4(); //uuid.v4();
	event["id"] = eventID;
	let eventIDs = JSON.parse(localStorage.getItem("all_eventIDs"));
	if(!eventIDs.includes(eventID)) {
		eventIDs.push(eventID);
		localStorage.setItem("all_eventIDs", JSON.stringify(eventIDs));
	}//else very unlikely uuid didn't work
	localStorage.setItem(eventID, JSON.stringify(event));
	return eventID;
}
function deleteEvent(eventObjOrID) {
	dbInit();
	let eventID = null;
	if(typeof(eventObjOrID) != "string") {
		eventID = eventObjOrID.id;
	}
	let eventIDs = JSON.parse(localStorage.getItem("all_eventIDs"));
	eventIDs = eventIDs.filter(f=> f != eventID);
	localStorage.setItem("all_eventIDs", JSON.stringify(eventIDs));
	localStorage.removeItem(eventID);
	return true;
}
function deleteAllEvents() {
	dbInit();
	let eventIDs = JSON.parse(localStorage.getItem("all_eventIDs"));
	localStorage.setItem("all_eventIDs", "[]");
  for(const eventID of eventIDs) {
	  localStorage.removeItem(eventID);
  }
	return true;
}
function deleteAllRules() {
	dbInit();
	let ruleIDs = JSON.parse(localStorage.getItem("all_ruleIDs"));
	localStorage.setItem("all_ruleIDs", "[]");
  for(const ruleID of ruleIDs) {
	  localStorage.removeItem(ruleID);
  }
	return true;
}
function updateEvent(event) {
	dbInit();
	let eventID = event.id;
	localStorage.setItem(eventID, JSON.stringify(event));
	return eventID;
}
function getEvent(eventID) {
	dbInit();
	let event = JSON.parse(localStorage.getItem(eventID));
	event.startDate = new Date(event.startDate);
	if(event.duration != null) {
		let orgStartDate = new Date(event.startDate.getTime());
		let orgStartDateDay = orgStartDate.getDate();
		orgStartDate.setTime(orgStartDate.getTime() + event.duration);
		event.holdOver = (orgStartDate.getDate() != orgStartDateDay);
	} else {
		event.holdOver = true;
	}
	//fix other dates?
	return event;
}
function addRule(rule, processToDate) {
	dbInit()
	//console.log("addRule(rule, processToDate)", rule, processToDate)
	let ruleID = `r_${(new Date()).getTime()}_${Math.round(Math.random()*100000)}`;//uuidv4(); //uuidv4(); //uuid.v4();
	rule["id"] = ruleID;
	rule["lastGeneratedEvent"] = null;
	rule["fullyGenerated"] = false;
	let ruleIDs = JSON.parse(localStorage.getItem("all_ruleIDs"));
	if( !ruleIDs.includes(ruleID) ) {
		ruleIDs.push(ruleID);
		localStorage.setItem("all_ruleIDs", JSON.stringify(ruleIDs));
	}//else very unlikely uuid didn't work
	localStorage.setItem(ruleID, JSON.stringify(rule));
  //console.log("..db.. rule added");
	processRule(rule, processToDate);
  //console.log("..db.. rule processed");
	return ruleID;
}
function getAllEvents() {
	dbInit();
	let eventIDs = JSON.parse(localStorage.getItem("all_eventIDs"));
  let events = [];
  for(const eventID of eventIDs) {
    let event = getEvent(eventID);
    events.push(event);
  }
  return events;
}
function getAllRules() {
  //console.log("getAllRules()...");
	dbInit()
  //console.log("/init() getAllRules()...");
	let ruleIDs = JSON.parse(localStorage.getItem("all_ruleIDs"));
  //console.log("got rule ids", ruleIDs.length);
  let rules = [];
  for(const ruleID of ruleIDs) {
    let rule = getRule(ruleID);
    rules.push(rule);
  }
  //console.log("returning ", rules.length, " rules");
  return rules;
}
function getRule(ruleID) {
	dbInit();
	//console.log("___getRule(",ruleID,")");
	let rule = JSON.parse(localStorage.getItem(ruleID));
	rule.startDate = new Date(rule.startDate);
	if(rule.lastGeneratedEvent != null && rule.lastGeneratedEvent != "") {
		rule.lastGeneratedEvent = new Date(rule.lastGeneratedEvent);
		//fox other dates?
	}
	return rule;
}
function updateRule(rule, doProcessRule, processToDate) {
	dbInit();
	let ruleID = rule.id;
	localStorage.setItem(ruleID, JSON.stringify(rule));
	if(doProcessRule) {
		processRule(rule, processToDate);
	}
	return ruleID;
}
function processRule(rule, processToDate) {
	dbInit();
	//console.log("processRule(rule, processToDate)", rule, processToDate)
	let events = getAllEvents();
	let eventsOfRule = events.filter(f=> f.parent_rule_id == rule.id);
	let ruleDates = getRuleDatesUntilDate(rule, processToDate);
	//ruleDates.forEach(async(f)=> {
	let maxEventCounter = 1;
	for(const f of ruleDates) {
		if(eventsOfRule.some(s=> s.rule_instance == f.iteration)) {
			//console.log("This event is already generated", f);
			maxEventCounter++;
		} else {
			if( rule.maxEvents == null || maxEventCounter <= rule.maxEvents ) {
				let ruleClone = JSON.parse(JSON.stringify(rule));
				delete ruleClone["id"];
				delete ruleClone["creationType"];
				delete ruleClone["creationParameters"];
				delete ruleClone["maxEvents"];
				delete ruleClone["lastDay"];
				delete ruleClone["lastGeneratedEvent"];
				ruleClone["parent_rule_id"] = rule.id;
				ruleClone["rule_instance"] = f.iteration;
				ruleClone["startDate"] = f.date;
				let eventID = addEvent(ruleClone)
				//console.log("added event ID", eventID);
				maxEventCounter++;
			} else {
				//console.log("max events reached");
			}
		}
	}
}
function getRuleDatesUntilDate(rule, processToDate) {
	dbInit();
	function getNextDates(creationType, creationParameters, afterDate) {
		let returnDate = new Date(afterDate.getTime());
		let returnDates = [];
		switch(creationType) {
			case "yearly":
				//console.log("Yearly adding",creationParameters[0], typeof(creationParameters[0]),"years", returnDate.toString());
				returnDate.setFullYear(returnDate.getFullYear() + creationParameters[0]);
				//console.log("Yearly added", returnDate.toString());
				returnDates.push(returnDate);
				break;
			case "monthly":
				returnDate.setMonth(returnDate.getMonth() + creationParameters[0]); //need to chagne to last day of month, first of month, 15th, last Friday etc..
				returnDates.push(returnDate);
				break;
			case "daily":
				returnDate.setDate(returnDate.getDate() + creationParameters[0]);
				returnDates.push(returnDate);
				break;
			case "weekly":
				//returnDate.setDate(returnDate.getDate() + 7); //expect sunday only
				let startOfWeekDate = null;
				while(returnDate.getDay() != 0) {
					returnDate.setDate(returnDate.getDate() + 1);
				}
				startOfWeekDate = new Date(returnDate.getTime());
				let aDate = null;
				let onSun = creationParameters[1];
				let onMon = creationParameters[2];
				let onTue = creationParameters[3];
				let onWed = creationParameters[4];
				let onThu = creationParameters[5];
				let onFri = creationParameters[6];
				let onSat = creationParameters[7];
				if(onSun) {
					returnDates.push( new Date(startOfWeekDate.getTime()) );
				}
				if(onMon) {
					aDate = new Date((new Date(startOfWeekDate.getTime())).getTime());
					aDate.setDate(aDate.getDate()+1);
					returnDates.push(aDate);
				}
				if(onTue) {
					aDate = new Date((new Date(startOfWeekDate.getTime())).getTime());
					aDate.setDate(aDate.getDate()+2);
					returnDates.push(aDate);
				}
				if(onWed) {
					aDate = new Date((new Date(startOfWeekDate.getTime())).getTime());
					aDate.setDate(aDate.getDate()+3);
					returnDates.push(aDate);
				}
				if(onThu) {
					aDate = new Date((new Date(startOfWeekDate.getTime())).getTime());
					aDate.setDate(aDate.getDate()+4);
					returnDates.push(aDate);
				}
				if(onFri) {
					aDate = new Date((new Date(startOfWeekDate.getTime())).getTime());
					aDate.setDate(aDate.getDate()+5);
					returnDates.push(aDate);
				}
				if(onSat) {
					aDate = new Date((new Date(startOfWeekDate.getTime())).getTime());
					aDate.setDate(aDate.getDate()+6);
					returnDates.push(aDate);
				}
				break;
		}
		return returnDates;
	}
	if(!(processToDate instanceof Date)) {
		throw "processToDate must be a date";
	} else {
		let ruleCurrentDate = new Date(rule.startDate);
		let bailOut = 10000;
		let totalIterations = 0;
		let eventSetTotal = 0; //weekly limited at 2 set only to sunday might need 2 sets to get up to that two, if set to mwf, later that 6 generated here would be limited to 2
		let ruleDates = [];
		switch(rule.creationType) {
			default:
				eventSetTotal++;
				ruleDates.push({iteration: totalIterations, date: new Date(rule.startDate)});
				break;
			case "weekly":
				break;
		}
		let ruleCurrentDates = getNextDates(rule.creationType, rule.creationParameters, ruleCurrentDate);
		let maxGeneratedDate = (new Date(Math.max.apply(ruleCurrentDates,ruleCurrentDates)));
		//console.log("considering dates:", ruleCurrentDates.map(m=> m.toString()).join(", "));
		while( ((bailOut--)>0) && (rule.maxEvents == null || eventSetTotal < rule.maxEvents) && (rule.lastDay == null || maxGeneratedDate <= rule.lastDay ) && ( maxGeneratedDate <= processToDate) ) {
			//console.log(" dates allowed");
			eventSetTotal++;
			ruleCurrentDates.forEach(ed => {
				totalIterations++;
				ruleDates.push({iteration: totalIterations, date: ed});
			});
			ruleCurrentDates = getNextDates(rule.creationType, rule.creationParameters, maxGeneratedDate );
			maxGeneratedDate = (new Date(Math.max.apply(ruleCurrentDates,ruleCurrentDates)));
		}
		if(bailOut <= 0) {
			throw "Run away code exception. bailOut variable caught 10000 iterations.";
		} else {
			if(rule.maxEvents != null) {
				//console.log(" dates rejected maxEvents hit");
				if(eventSetTotal >= rule.maxEvents) {
					rule["fullyGenerated"] = true;
				}
			}
			if(rule.lastDay != null) {
				//console.log(" dates rejected lastDay hit");
				if( maxGeneratedDate >= rule.lastDay ) {
					rule["fullyGenerated"] = true;
				}
			}
			rule["lastGeneratedEvent"] = new Date( maxGeneratedDate.getTime() );
			updateRule(rule, false, null);
		}
		//console.log("..getRuleDatesUntilDate() ruleDates",ruleDates, ruleDates.map(m=> m.date.toString()).join("\n"));
		return ruleDates;
	}
}
function getEventsBetween(beginDate,endDate) {
  //console.log("Database::getEventsBetween", `(${typeof(beginDate)})`, beginDate, `(${typeof(endDate)})`, endDate);
  //console.log("/Database::getEventsBetween");
  let rules = [];
  //console.log("Database::getEventsBetween a");
  try {
    //console.log("Database::getEventsBetween b");
    beginDate = getDateAtZeroOClock(beginDate);
    //console.log("Database::getEventsBetween c");
    endDate = getDateAtZeroOClock(endDate);
    //console.log("Database::getEventsBetween d");
    rules = getAllRules();
    //console.log("Database::getEventsBetween e");
  } catch(exW) {
    console.log("ERROR:", exW);
  }
  //console.log("Database::getEventsBetween got rules .length=", rules.length);
	rules = rules.filter(f=> {
		return (
			(
				f.lastGeneratedEvent == null
				||
				f.lastGeneratedEvent < endDate
			)
			&&
			(! f.fullyGenerated)
		);
	});
	for(const r of rules) {
		processRule(r,endDate);
	}

	let events = getAllEvents();
	events = events.filter(f=> {

		let endedDate = null;
		if(f.duration != null) {
			endedDate = new Date( f.startDate.getTime() + f.duration );
			//console.log("end of duration calculated:", f.startDate, endedDate);
		}
		/*

			--|------|--
			  |  1-> |
			  1->    |
			  |      1->
			  |  2-> |
			  2->    |
			  |      2->
		     3|      |3

		*/
    //console.log("is String?",  f.startDate, endDate);
    /*
    console.log("qualified on", (((f.startDate >= beginDate) && (f.startDate < endDate))), ((endedDate != null) && (endedDate >= beginDate) && (endedDate < endDate)) , ((endedDate != null) && (endedDate < beginDate) && (endedDate > endDate))
	    		,(
						((f.startDate >= beginDate) && (f.startDate < endDate))
						||
						(endedDate != null) && (endedDate >= beginDate) && (endedDate < endDate)
						||
						(endedDate != null) && (endedDate < beginDate) && (endedDate > endDate)
					) ? f : null
    	);
    */
		return (
			((f.startDate >= beginDate) && (f.startDate < endDate))
			||
			(endedDate != null) && (endedDate >= beginDate) && (endedDate < endDate)
			||
			(endedDate != null) && (endedDate < beginDate) && (endedDate > endDate)
		);
	});
  return events;
}
function filterEventsBetween(events, beginDate, endDate) {
	return events.filter(f=> {
		let endedDate = null;
		if(f.duration != null) {
			endedDate = new Date(f.startDate.getTime() + f.duration);
		}
		return (
			((f.startDate >= beginDate) && (f.startDate < endDate))
			||
			(endedDate != null) && (endedDate >= beginDate) && (endedDate < endDate)
			||
			(endedDate != null) && (endedDate < beginDate) && (endedDate > endDate)
		);
	});
}
function getDateAtZeroOClock(aDate) {
  //console.log("getDateAtZeroOClock(aDate)",`(${typeof(aDate)})`, aDate);
  if(aDate.getHours() == 0 && aDate.getMinutes() == 0 && aDate.getSeconds() == 0) {
    //console.log("  already zeroed");
    //WARNING TEST SHORT CIRCUT
    let sDate = new Date(aDate.getFullYear(), aDate.getMonth(), aDate.getDate());
    return sDate;
  }
  aDate = new Date(aDate.getTime());
  let nDate = new Date(aDate.getFullYear(), aDate.getMonth(), aDate.getDate()); 
  if(nDate.getHours() == 0 && nDate.getMinutes() == 0 && nDate.getSeconds() == 0) {
    //console.log("  already zeroed");
  } else {
    //console.log("  zeroed failed");
  }
  return nDate;
}
function backDateDateUntilDayOfTheWeek(aDate, dayOfTheWeek = 0) {
  while(aDate.getDay() != dayOfTheWeek) { aDate.setDate( aDate.getDate() -1 )  };
  return aDate;
}
function getFirstDisplayedDateOfCalendar(calDate) {
	//console.log("getFirstDisplayedDateOfCalendar(calDate) calDate:",typeof(calDate), calDate);
	if(typeof(calDate) == "number") {
		calDate = new Date(calDate);
	} else {
		calDate = new Date(calDate.getTime());
	}
	calDate.setDate(1);
	while (calDate.getDay() != 0) {
		calDate.setDate(calDate.getDate() - 1);
	}
	return calDate;
}