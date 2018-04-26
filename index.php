<!DOCTYPE HTML>
<html>
<head>

    <meta charset="UTF-8">
    <title>
        События
    </title>
    <link href="events.css" rel="stylesheet">

    <script src="js-events.js"></script>
    <script src="js-events_requests.js"></script>
    <script src="js-variables.js"></script>

</head>

<body onload="showMonth(whatTime.Year, whatTime.Month)">

<div id="eventTextForm">
    <H3>Описание событие: </H3>
    <textarea id="evenText"></textarea>
    <br>
    <input type="button" value="Запланировать" onclick="sendEvent(evenText.value, selectedBoxId)">
    <input type="button" value="&#10008" onclick="delEvent(selectedBoxId)">
</div>

<!--------------------- Кнопки переключения года --------------------->
<div class="dateBox">
    <div class="yearBtn">
        <input type="button" id="yearBack" class="btn" value="<" onclick="switcher('yearBack')">
    </div>
    <div class="yearBtn" id="yearPlace"></div>
    <div class="yearBtn">
        <input type="button" id="yearForward" class="btn rightBtn" value=">" onclick="switcher('yearForward')">
    </div>
    <br>
<!-------------------- Кнопки переключения месяца -------------------->
    <div class="monthBtn">
        <input type="button" id="monthBack" class="btn" value="<" onclick="switcher('monthBack')">
    </div>
    <div class="monthBtn" id="monthPlace" ></div>
    <div class="monthBtn">
        <input type="button" id="monthForward" class="btn rightBtn" value=">" onclick="switcher('monthForward')">
    </div>
</div>
<!-------------------- Место под календарь -------------------->
<div id="tabPlace"></div>


<div id="eventPlace"></div>
</body>
</html>