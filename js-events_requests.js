// ++++++++++++++++++++++++ AJAX запрпосы ++++++++++++++++++++++++
// ------------- Форма отправки запросов --------------
/*function showEventBox()
{
	var textarea = document.createElement('textarea');
    textarea.id = ('evenText');
    var addBtn = document.createElement('input');
    addBtn.setAttribute('type', 'button');
    addBtn.value = ('Запланировать');
    addBtn.addEventListener("click", sendEvent(evenText.value, selectedBoxId));
    //addBtn.addEventListener("click", sendEvent(evenText.value, selectedBoxId, selectedBoxEvent));
    eventTextForm.innerHTML = (textarea + "br" + addBtn);
}*/

// ------------ Отображение всех событий на календаре ------------

function showAllEvents()
{
    var ajaxGet = new XMLHttpRequest();

    ajaxGet.open("GET", "php-02_getEvents.php", true);

    ajaxGet.send();

    ajaxGet.onreadystatechange = function ()
    {
        if (this.readyState == 4 && this.status == 200)
        {
            var data = JSON.parse(this.responseText);
            //console.log(data);

            var eventPlace = document.getElementById("eventPlace");
            for(var i=0; i<data.length; i++)
            {
                for(var j=0; j<thisMonthIDs.length; j++)	//thisMonthIDs - массив содержащий ID дней выбранного месяца
                {
                    if (data[i]["eventFieldID"] == thisMonthIDs[j])
                    {
                        var evenBox = document.getElementById(thisMonthIDs[j]);
                        evenBox.style.backgroundColor = "#ffed85";
                    }
                }
            }
        }
    }
}
// ------------ получение событий из базы ------------
var selectedBoxDBValue;
function getEvent(BoxID)
{
    selectedBoxDBValue = undefined;
    var ajaxGet = new XMLHttpRequest();

    ajaxGet.open("GET", "php-02_getEvents.php", true);

    ajaxGet.send();

    ajaxGet.onreadystatechange = function ()
	{
        if (this.readyState == 4 && this.status == 200)
        {
            var data = JSON.parse(this.responseText);

            var eventPlace = document.getElementById("eventPlace");
			for(i=0; i<data.length; i++)
			{
				if (data[i]["eventFieldID"] == BoxID)
				{
                    var evenText = document.getElementById("evenText");
                    evenText.innerHTML = (data[i]["event"]);
                    document.getElementById("eventPlace").innerHTML = (data[i]["event"]);
                    eventPlace.style.backgroundColor = "#ffed85";
                    selectedBoxDBValue = data[i]["event"];
                    break;
                }
                else
                {
                	document.getElementById("eventPlace").innerHTML = "";
                    document.getElementById("evenText").innerHTML = ("");
                    //eventPlace.style.backgroundColor = "#94cfff";
                }
			}
        }
    }
}


// ------------ отправка события в базу ------------
function sendEvent(text, id)
{
    if (selectedBoxDBValue === undefined)
    {
        var method = false;  // для обновления события в базе
    }
    else
    {
        var method = true; // для добавления события в базу
    }
    //console.log(text + " - " + id + " - " + method);
	var newEvent = {
		event: text,
		boxID: id,
        selectedBoxEvent: method
	};
	var event = JSON.stringify(newEvent);


	var ajaxSend = new XMLHttpRequest();
    ajaxSend.open("GET", "php-03_sendEvents.php?event="+event, true);
    ajaxSend.send();
    ajaxSend.onreadystatechange = function()
	{
        if (this.readyState == 4 && this.status == 200)
        {
            //console.log("Событие отправлено!");
            document.getElementById("eventPlace").innerHTML = ("");
            document.querySelector(".selected").classList.remove("selected");
            showAllEvents()
        }
	}

}
// ------------ изменение события в базе ------------
/*function updEvent(text, id)
{
    var newEvent = {
        event: text,
        boxID: id
    };
    var event = JSON.stringify(newEvent);


    var ajaxSend = new XMLHttpRequest();
    ajaxSend.open("GET", "php-04_updEvents.php?event="+event, true);
    ajaxSend.send();
    ajaxSend.onreadystatechange = function()
    {
        if (this.readyState == 4 && this.status == 200)
        {
            console.log("Событие измененено!");
        }
    }
}*/
// ------------ удаление события из базы ------------
function delEvent(id)
{
    var newEvent = {
        boxID: id
    };
    var event = JSON.stringify(newEvent);


    var ajaxSend = new XMLHttpRequest();
    ajaxSend.open("GET", "php-04_delEvents.php?event="+event, true);
    ajaxSend.send();
    ajaxSend.onreadystatechange = function()
    {
        if (this.readyState == 4 && this.status == 200)
        {
            //console.log("Событие удалено!");
            document.getElementById("eventPlace").innerHTML = ("");
            document.getElementById(id).style.backgroundColor = "#e8effc";
            showAllEvents()
        }
    }
}
