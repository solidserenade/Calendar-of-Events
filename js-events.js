/*// ------------- определение дня недели 1-ого января -------------
var nowIsDate = new Date();
var whatTime = {
	Year: nowIsDate.getFullYear(),
	Month: nowIsDate.getMonth(),
	Day: nowIsDate.getDate(),
	Hours: nowIsDate.getHours(),
	Minutes: nowIsDate.getMinutes(),
};*/
// ------------- определение високосности года -------------
function intercalaryYear (){

	if (whatTime.Year%4 == 0 && whatTime.Year%100 != 0)
	{
		return (29);
	}
	else { return (28); }
}

/*
// ------------------ массивы с днями -----------------
var month = ["Январь",
			"Февраль",
			"Март",
			"Апрель",
			"Май",
			"Июнь",
			"Июль",
			"Август",
			"Сентябрь",
			"Октябрь",
			"Ноябрь",
			"Декабрь"],

	howMenyDays = [31,					// Январь
					intercalaryYear(),	// Февраль
					31,					// Март
					30,					// Апрель
					31,					// Май
					30,					// Июнь
					31,					// Июль
					31,					// Август
					30,					// Сентябрь
					31,					// Октябрь
					30,					// Ноябрь
					31],				// Декабрь

	week = ["Понедельник",
			"Вторник",
			"Среда",
			"Четверг",
			"Пятница",
			"Суббота",
			"Воскресенье"];
*/

// ------------------ определение дня недели в начале месяца -----------------
function startMonthDay (whatYear, whatMonth)
{
	var oldYearDays = 0;
	var day8 = function()
	{
		if (daysOfWeek > 6)
		{
			daysOfWeek = 0;
		}
	}

	var years = 2001;	//	Функция не расчитана на тысячилетия, но до 2100 года будет работать без сбоев.
	var daysOfWeek = 0;

    var s = "Start";
	while (s != "Stop")
	{
		for (var i=0; i<4; i++, daysOfWeek++)
		{
			day8();

			if (whatYear == years)
			{
				oldYearDays = daysOfWeek;
				s = "Stop";
			}
			years++;
		}

		day8();

		daysOfWeek++;
	}
		var allDays = oldYearDays;
		for (var i = 0; i != whatMonth; i++)
		{
			allDays = (allDays + howMenyDays[i]);
		}
		return allDays%7;

}

// ------------------ наполнение месецев (массивов) днями ------------------
function manyDays (days, remainder)	// remainder - если 1-ое число не выпало на понедельник

{
	var dayCount = [];
	if (remainder != 0) {
		for (var i=0; i<remainder; i++)	// 6 - кол-во дней недели начиная с 0
		{
			dayCount.push("empty");
		}
	}
	for (var i=0; i<howMenyDays[days]; i++)
	{
		dayCount.push(i+1);
	}
	return dayCount;
}

// ------------------ таблица календаря ------------------
var thisMonthIDs = [];
function showMonth(dateY, dateM)
{
	document.getElementById("tabPlace").innerHTML = ("");
	document.getElementById("yearPlace").innerHTML = ("");
	document.getElementById("monthPlace").innerHTML = ("");
	var endOfWeek = startMonthDay(dateY, dateM);	// для подсчёта оставшихся после окончания месяца дней недели

	var yearPlase = document.createElement("h1");
	yearPlase.innerHTML = (dateY);
	document.getElementById("yearPlace").appendChild(yearPlase);

	var monthPlase = document.createElement("h3");
	monthPlase.innerHTML = (month[dateM]);
	document.getElementById("monthPlace").appendChild(monthPlase);

	var calendarTable = document.createElement("table");
	calendarTable.id = ("calendar");
	document.getElementById("tabPlace").appendChild(calendarTable);
	for (var d=0; d<week.length; d++)
	{
		var weekBox = document.createElement("th");
		weekBox.innerHTML = (week[d]);
		calendarTable.appendChild(weekBox);
	}

	var counter = 0;	// переменная для цикла, формирующего ячейки таблицы (необходима для извлечения из массива дней месяца с разбивкой по неделям)
	var monthDays = manyDays(dateM, endOfWeek);

    thisMonthIDs = [];

	for (var i=0; i<6; i++)	// Больше 6-ти строк в таблице быть не может, так что оставлю 6.
	{
		var dayNum = 1;
		var tabLine = document.createElement("tr");
		calendarTable.appendChild(tabLine);

		for (var j=counter; j<7+counter; j++)	// 7 - кол-во дней недели
		{
			if (monthDays[j] == "empty")
			{
				var emptyTableStart = document.createElement("td");
				tabLine.appendChild(emptyTableStart);
			}
			else if (monthDays[j] != undefined)
			{
				var fullTableMiddle = document.createElement("td");
				fullTableMiddle.id = ("box" + whatTime.Year + "-" + (whatTime.Month+1) + "-" + monthDays[j]);
				fullTableMiddle.className = ("day" + dayNum);
				fullTableMiddle.classList.add("selectDay");
				fullTableMiddle.innerHTML = ("<div>" + monthDays[j] + "</div>");	//	Вывод даты в ячейки
				tabLine.appendChild(fullTableMiddle);

                thisMonthIDs.push(fullTableMiddle.id);

				var localDate = "box" + nowIsDate.getFullYear() + "-" + (nowIsDate.getMonth()+1) + "-" + nowIsDate.getDate();
				if (localDate == fullTableMiddle.id)
				{
					fullTableMiddle.classList.add("today");
				}
			}
			else
			{
				var emptyTableEnd = document.createElement("td");
				tabLine.appendChild(emptyTableEnd);
			}
			dayNum = dayNum+1;
		}
		counter = counter+7;
		if (monthDays[j] == undefined) break;
	}
			deySelector ();
    		showAllEvents()
}

// -------------------- переключение годов и месяцев --------------------
function switcher(YearMonthBth)
{
	var tab = document.getElementById("monthBack");
		switch (YearMonthBth)
		{
			case 'yearBack':
				whatTime.Year--;
				if (whatTime.Year == 2000)
				{
					whatTime.Year = 2001;
					alert ("2001 - минимально допустимый год!");
				}
			break;
			case 'yearForward':
				whatTime.Year++;
				if (whatTime.Year == 2101)
				{
					whatTime.Year = 2100;
					alert ("2100 - максимально допустимый год!");
				}
			break;
			case 'monthBack':
				whatTime.Month--
                if (whatTime.Year == 2001 && whatTime.Month<0)
                {
                    whatTime.Month = 0;
                    alert ("2001 - минимально допустимый год!");
                    break;
                }
				else if (whatTime.Month<0)
				{
					whatTime.Year--;
					whatTime.Month = 11;
				}
			break;
			case 'monthForward':
				whatTime.Month++;
                if (whatTime.Year == 2100 && whatTime.Month>11)
                {
                    whatTime.Month = 11;
                    alert ("2100 - максимально допустимый год!");
                    break;
                }
                else if (whatTime.Month>11)
				{
					whatTime.Year++;
					whatTime.Month = 0;
				}
			break;
		}
		showMonth(whatTime.Year, whatTime.Month);

}

// ------------------------ выбор дня по щелчку ------------------------
var selectedBoxId;
function deySelector()
{
	var target = document.querySelectorAll('.selectDay');

	for (var i=0; i!=howMenyDays[whatTime.Month]; i++)
	{
		target[i].onclick = showEvent;
	}

    function showEvent()
	{
        for(var i=0; i<target.length; i++)
        {
            target[i].classList.remove("selected");
        }
        this.classList.add("selected");


		selectedBoxId = this.id;

        getEvent(this.id);
    }
}

// ------------------ Модальное окно ------------------

function f()
{
    var modalWindow = document.createElement("div");
    modalWindow.id = ("modwindow");

    var modalBackgroundWhite = document.createElement("div");
    modalBackgroundWhite.id = "modbackground";
    modalBackgroundWhite.className  = "background";

    var modalBackground = document.createElement("div");
    modalBackground.className = "background";
    modalBackground.appendChild(modalWindow);

    document.body.appendChild(modalBackgroundWhite);
    document.body.appendChild(modalBackground);
}
