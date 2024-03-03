# JavaScript Calendar
Creates a customizable SVG based calendar using JavaScript/SVG 
![ShowAndTell](https://github.com/asdf23/JavaScriptCalendar/assets/4165735/ddc6dbe3-9299-4186-8c69-89cbd72b521b)

This is an HTML file with no content. On page load createCalendar is called. This function is the "meat and potatoes" of this project.

The code creates a single month calendar with various options for display and styling. The calendar will be placed at any given x,y coordinate with any given width and height. You could make some stupid looking calendars if you want to (I'll post some at the bottom for your enjoyment). The point is to add a calendar to whatever and where-ever you want.

The paramters to createCalendar are:

  width  - (required) width of calendar 
  height - (required) height of calendar
  x - (required) an absolute positioned div is created and a calendar is placed and the x/y corrdinates
  y - (required)
  date - (optional) a JavaScript Date object, defaults to today
  options - (optional) ... will explain below all options are optional  
  appendToChild - (required) a dom element to append the SVG calendar to. Because the calendar resizes itself to the space alloted this DOM must be displayed. Meaning it cannot be hidden or a DOM element that is not placed on the page. If you don't want to display it I suggest you move it off the edge of the screen or set the opacity.

  options:
    Pass any of the following attributes to an object to customize the calendar. (The values shown are the default values)

    ```
				 weekStart = 0                     Day of the week to start on 0 for Sunday 1 for Monday etc..
				,highLightWeekend = true           Weekends can be highlighted or not
				,highlightWrongMonths = true       The calendar is a 6x7 grid some months will not need the extra days, this option can remove the highlight 
				,useShortYear = false              2024 vs 24
				,useShortMonthName = true          Janurary vs Jan
				,useShortWeekName = true           Sunday vs Sun
				,showMonthNavigation = false       Arrows are shown in the header or not, if you click them the month will change 
                                -- Styling --
				,styleCalendar = {      background of calendar
								 stroke: "black"
								,fill:"lightgray"
							}
				,styleYearMonthDivider = {    The line below the month
								 stroke:"black"
								,"stroke-width": 2
							}
				,styleMonthDatesDivider = {   The line below the week
								stroke:"black"
							}
				,styleDatesVerticleDivider = {  Verticle lines in the dates area
								stroke:"black"
							}
				,styleDatesHorizontalDivider = {  Horizontal lines in the date area
								stroke:"black"
							}
				,styleOffMonthHighlight = {      How the dates in the off months are highligted
								 fill: "black"
								,opacity: 0.2
							}
				,styleDateNumberBackground = {    On the date (numerical) there is a box around the date
								 opacity: 0.5
								,fill:"lightblue"
								,stroke: "black"
							}
				,styleWeekend = {            Highlight for weekends (Sunday/Saturday)
								 opacity: 0.2
								,fill: "yellow"
							}
				,styleYearMonthText = {      Font for Month & Year
								"font-family": "sans-serif"
								,bumpScale: 0.3
								,bumpY: 0.08
							}
				,styleWeekDayText = {        Font for the week names
								"font-family": "sans-serif"
								,bumpScale: useShortWeekName ? 0.3 : 0
								,bumpY: 0.08
							}
				,styleDateText = {          Font for the dates (numerica)
								"font-family": "sans-serif"
								,bumpScale: 0.3
								,bumpY: 0.08
							}
				,styleMonthChangeControl = {  Style for the font to navigate the month
								"font-family": "sans-serif"
								,bumpScale: 0.3
								,bumpY: 0.08
								,cursor: "pointer"
				}

    bumpY - When sizing the text it seems a little too high, although it should be correct numericaly, this will offset it a bit (% of height)
    bumpScale - When sizing the text the font may seem a little too small,  although it should be correct numericaly, this will alter the size a bit (% of size)

```

Todo:
You can almost add events to the calendar. See the bananna in the example. I plan to store these events in localStorage and add a callback so that the user can do something with a clicked event. Perhaps show more detail or navigate the page.
