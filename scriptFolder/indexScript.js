var mainData = new Array();
var buttons;

window.onload = function()
{
    ObjForCheckbox.prototype = 
    {
        idx: [0],
        
        addInArr: function(value)
        {
            this.idx[0] += value;
        },
        
        getId: function()
        {
            //alert(this.idx.length);
            return this.idx[0];
        },
        
        setId: function(value)
        {
            this.idx[0] = value;
        }
        
    }
    
    fillMainElem();
    if (navigator.userAgent.indexOf("CLR") > -1 || navigator.userAgent.indexOf("IE") > -1)
    {
	document.getElementById("controlPanel").style.backgroundColor="silver";
	document.getElementById("controlPanel").style.height="200px";
    }
    
//    intro.addEventListener("click", goToIntro, false);
    main.addEventListener("click", goToMain, false);
    
    buttons = document.querySelectorAll("#controlPanel div button");
    for (var i in buttons)
    {
        var thisButton = buttons.item(i);
        thisButton.addEventListener("mousedown", buttonWasClicked, false);
        thisButton.disabled = false;
    }
    window.addEventListener("resize", onResizeAction, false);
    
    goToMain();
    startProcess.processCanGo = ObjForCheckbox.processCanGo = onResizeAction.processCanGo = true;
    onResizeAction.resizeWasInIntro = false;
    noRunProcessStyle.timeoutRef = null;
    onGlassSpan.timeoutRef = null;
    onResizeAction.cliWidth = document.body.clientWidth;
    startProcess.intervalValue = 333;
    var ctrlDiv = document.getElementsByClassName("ctrlBlock").item(0);
    ctrlDiv.getElementsByTagName("input").item(0).addEventListener("click", setNumberVal, false);
    ctrlDiv.getElementsByTagName("input").item(1).addEventListener("change", setRangeVal, false);
    startProcess.timeoutRef = null;
    startAnim.timeoutRef1 = startAnim.timeoutRef2 = startAnim.timeoutRef3 = null;
    appendNextPrhase.timeoutRef = null;
    appendQuestToDiv.timeoutRef = null;
    
    buttonsManager(["true"], []);
    newIntervalWasSet(document.querySelector("[type=number]"), false);
    menuGo(spoonPartFirst,  "http://www.tableking.com.au");
    menuGo(spoon2,  "http://www.tableking.com.au");
    menuGo(spoon3,  "http://www.tableking.com.au");
    menuGo(spoonPartLast,  "http://www.tableking.com.au");
    menuGo(glass,  "http://www.igor-engraving.com");
//    return;
    startProcess(true);
}

function setRangeVal()
{
    if (parseInt(this.value) < parseInt(this.min))
        this.value = parseInt(this.min);
    
    if (parseInt(this.value) > parseInt(this.max))
        this.value = parseInt(this.max);
    
    document.querySelector("[type=range]").value = this.value;
    newIntervalWasSet(this, true);
}

function setNumberVal()
{
    if (parseInt(this.value) < parseInt(this.min))
        this.value = parseInt(this.min);
    
    if (parseInt(this.value) > parseInt(this.max))
        this.value = parseInt(this.max);
    
    document.querySelector("[type=number]").value = this.value;
    newIntervalWasSet(this, true);
}

function newIntervalWasSet(obj, setStart)
{
    startProcess.intervalValue = 1000 / (obj.value / 60);
    clearInterval(startProcess.timeoutRef);
    
    if (buttons[0].disabled == true && setStart)
    {
        startProcess.processCanGo = ObjForCheckbox.processCanGo = false;
        startNow();
    }
}

function fillMainElem()
{
    var checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.style.margin = "0";
    checkbox.style.padding = "0";
    var mainDiv = document.getElementsByTagName("main")[0];
    
/*    var max = 10000; /*IE*/
    while (true)
    {
        mainData.push(new ObjForCheckbox(checkbox.cloneNode()));
        mainDiv.appendChild(mainData[mainData.length-1].elem);
        if (recordAllHeightVal(mainDiv.clientHeight) == 3)
            break;
    }
    
    mainData[0].makeClosure(mainData.pop());
    var checkboxPerLine = mainData.length;
    var cnt = 1;
    while (mainDiv.clientHeight < window.screen.availHeight / 3)
    {
        var obj = new ObjForCheckbox(checkbox.cloneNode());
        mainDiv.appendChild(obj.elem);
        mainData[cnt++].makeClosure(obj);
        if (cnt == checkboxPerLine)
            cnt = 0;
    }
    
    for (var i = 1; i < checkboxPerLine; i ++)
    {
        var obj = new ObjForCheckbox(checkbox.cloneNode());
        mainDiv.appendChild(obj.elem);
        mainData[i].makeClosure(obj);
    }
    allHeightVal[allHeightVal.length] = mainData[0].getId() / checkboxPerLine;
    //alert(mainData[0].getId());
    //alert(checkboxPerLine);
}

function buttonWasClicked()
{
    changeButtonStyle(this);
    var buttonText = this.innerHTML.toLowerCase();
    if (buttonText != "no spoon")
        clearTimeout(noRunProcessStyle.timeoutRef);
    //console.log(buttonText.indexOf('slow'));
    if (buttonText.indexOf("slow") >= 0)
    {
        onGlassSpan("STOP (SLOW)");
        stopSlow();
    }
    if (buttonText == "start")
    {
        onGlassSpan("START");
        startNow();
    }
    if (buttonText.indexOf("immediately") >= 0)
    {
        onGlassSpan("STOP");
        stopImmediatly();
    }
    if (buttonText == "restart")
    {
        onGlassSpan("RESTART");
        restartNow();
    }
    if (buttonText == "pause")
    {
        onGlassSpan("PAUSE");
        pauseNow();
    }
    if (buttonText == "continue")
    {
        onGlassSpan("CONTINUE");
        continueNow();
    }
    if (buttonText.indexOf("spoon") >= 0)
    {
        onGlassSpan("NO SPOON");
        noSpoon();
    }
}

function noSpoon()
{
    spoonPartFirst.classList.add("noSpoon");
    spoon2.classList.add("noSpoon2");
    spoon3.classList.add("noSpoon3");
    buttonsManager(["", "", "", "", "", "true"], []);
    
    setTimeout(function()
    {
        spoonPartFirst.classList.remove("noSpoon");
        spoon2.classList.remove("noSpoon2");
        spoon3.classList.remove("noSpoon3");
        buttonsManager(["", "", "", "", "", "false"], []);
    }, 7070);
}

function onGlassSpan(value)
{   
    var rightGlass = document.getElementsByClassName("onGlass").item(0);
    var leftGlass = document.getElementsByClassName("onGlass").item(1);
    rightGlass.innerHTML = leftGlass.innerHTML = "";
    clearTimeout(onGlassSpan.timeoutRef);
    
    rightGlass.innerHTML = leftGlass.innerHTML = value;
    rightGlass.style.left = 65+"px";
    leftGlass.style.left = 210+"px";
    
    rightGlass.style.left = 70 - rightGlass.clientWidth / 2 + "px";
    leftGlass.style.left = 210 - leftGlass.clientWidth / 2 + "px";
    
    rightGlass.classList.remove("fadingTextAnim");
    leftGlass.classList.remove("fadingTextAnim");
    
    setTimeout(function()
    {
        rightGlass.classList.add("fadingTextAnim");
        leftGlass.classList.add("fadingTextAnim");
    }, 4);
    
    onGlassSpan.timeoutRef = setTimeout(function()
    {
        rightGlass.innerHTML = leftGlass.innerHTML = "";
    }, 2000);
}

function buttonsManager(isDisabled, innerVal)
{    
    for (var i = 0; i < buttons.length; i ++)
    {
        if (isDisabled[i] != "" && isDisabled[i] != undefined)
        {
            isDisabled[i] == "true" ? buttons[i].disabled = true : buttons[i].disabled = false;
            
            if (buttons[i].disabled == true)
            {
                buttons[i].classList.remove("superButtonOn");
                buttons[i].classList.add("superButtonOff");
            }
            else
            {
                buttons[i].classList.remove("superButtonOff");
                buttons[i].classList.add("superButtonOn");                
            }
        }
        
        if (innerVal[i] != "" && innerVal[i] != undefined)
            buttons[i].innerHTML = innerVal[i];
    }
}

function pauseNow()
{
    startProcess.processCanGo = ObjForCheckbox.processCanGo = false;
    buttonsManager(["false", "true", "false", "true", "false", ""], ["Continue"]);
}

function continueNow()
{
    startNow();
    var verticalLines = allHeightVal[allHeightVal.length - 1];
    
    for (var i in mainData)
    {
        var deepLevel = mainData[i].isSolidLine(verticalLines);
        if (deepLevel == 0)
            continue;
                
        activateTimeoutRef(mainData[i], verticalLines - deepLevel);
    }
    
    buttonsManager(["true", "false", "false", "false", "false", ""], ["Start"]);
}

function activateTimeoutRef(actObj, deepLevel)
{
    for (var i = 0; i < deepLevel; i ++)
    {
        actObj = actObj.retNextObj();
    }
    
    setTimeout(function(){actObj.toggleChecked(256);}, getRandNum(256));
}

function onResizeAction()
{
    if (onResizeAction.cliWidth == document.body.clientWidth && onResizeAction.resizeWasInIntro == false)
    {
        return;
    }
    
    onResizeAction.cliWidth = document.body.clientWidth;
    if (onResizeAction.processCanGo == false)
    {
        document.getElementsByTagName("footer").item(0).style.marginTop=(window.screen.availHeight / 3)+"px";
        onResizeAction.resizeWasInIntro = true;
        return;
    }
    var checkbox = document.querySelector(".ctrlBlock [type=checkbox]");
    if (checkbox.checked == false)
        return;
    
    var main = document.getElementsByTagName("main").item(0);
    //alert(main.childElementCount);
    
    while (main.childNodes.length > 0)
    {
        main.removeChild(main.firstChild);
    }
    
    setAllNull();
    //alert(main.childElementCount);
    fillMainElem();
    
    startOrContinue.innerHTML = "Start";
    
    clearTimeout(startProcess.timeoutRef);
    setTimeout(function()
    {
        startNow();
    }, 256);
    
    onGlassSpan("RESIZE");
}

function setAllNull()
{
    mainData.length = allHeightVal.length = 0;
    allHeightVal[0] = 0;
    startProcess.processCanGo = ObjForCheckbox.processCanGo = false;
    ObjForCheckbox.prototype.setId(0);
}

function restartNow()
{
    buttonsManager(["false", "false", "true", "false", "false", ""], ["Start"]);
    setTimeout(function()
    {
        stopImmediatly();

        clearTimeout(startProcess.timeoutRef);
        startNow();
    }, 256);
}

function stopSlow()
{
    startProcess.processCanGo = false;
    buttonsManager(["false", "true", "false", "true", "false", ""], []);
    noRunProcessStyle();
}

function startNow()
{
    if (startProcess.processCanGo == false)
    {
        startProcess.processCanGo = ObjForCheckbox.processCanGo = true;
        buttonsManager(["true", "false", "false", "false", "false", ""], []);
        startProcess(false);
    }
}

function noRunProcessStyle()
{
    for (var i in mainData)
    {
        if (mainData[i].elem.checked == false)
        {
            noRunProcessStyle.timeoutRef = setTimeout(function(){noRunProcessStyle();}, 333);
            return;
        }
    }
    buttonsManager(["false", "true", "false", "true", "true", ""], []);
}

function stopImmediatly()
{
    startProcess.processCanGo = ObjForCheckbox.processCanGo = false;
    var verticalLines = allHeightVal[allHeightVal.length - 1];
    
    for (var i in mainData)
    {
        var deepLevel = mainData[i].isSolidLine(verticalLines);
        if (deepLevel == 0)
            continue;
        disableTimeoutRef(mainData[i], verticalLines - deepLevel);
    }
    buttonsManager(["false", "true", "false", "true", "true", ""], ["Start"]);
}

function changeButtonStyle(elem)
{
    elem.classList.toggle("blinkRedColor");
    if (elem.classList.contains("blinkRedColor"))
    {
        setTimeout(function(){elem.classList.remove("blinkRedColor");}, 512);
    }
}

function goToIntro()
{
    onResizeAction.processCanGo = false;
    disableButton("intro");
    enableButton("main");
    document.getElementsByTagName("main").item(0).classList.add("clearElem");
    controlPanel.classList.add("clearElem");
    document.body.classList.add("secondPage");
    document.getElementsByTagName("cite").item(0).innerHTML=
    " You`ve already made the choice. Now you have to understand, why you made it ... ";
    document.getElementsByTagName("cite").item(0).classList.toggle("citeRed");
    document.getElementsByTagName("cite").item(0).classList.toggle("citeBlue");
    var prhaseDiv = document.createElement("div");
    prhaseDiv.setAttribute("id", "prhaseDiv");
    document.getElementsByTagName("section").item(0).appendChild(prhaseDiv);
    spoonPartFirst.classList.add("clearElem");
    spoon2.classList.add("clearElem");
    spoon3.classList.add("clearElem");
    spoonPartLast.classList.add("clearElem");
    document.getElementsByTagName("footer").item(0).classList.add("footerOnBottom");
    
    var hyperlinkDiv = document.createElement("div");
    hyperlinkDiv.setAttribute("id", "hyperlinkDiv");
    document.getElementsByTagName("section").item(0).appendChild(hyperlinkDiv);
    document.getElementById("hyperlinkDiv").style.marginTop=(window.screen.availHeight - 200)+"px";
    
    var mirrorDiv = document.createElement("div");
    mirrorDiv.setAttribute("id", "mirrorDiv");
    document.getElementsByTagName("section").item(0).appendChild(mirrorDiv);
    //www.ppframing.com
    var mirrorImage = document.createElement("img");
    mirrorImage.setAttribute("src", "imageFolder/mirror.jpg");
    mirrorImage.setAttribute("alt", "path to wonderland");
    mirrorImage.setAttribute("id", "mirrorImg");
    document.getElementById("mirrorDiv").appendChild(mirrorImage);
    menuGo(mirrorImg, "http://www.ppframing.com");
    mirrorImg.onclick = function()
    {
        window.location.replace("index.php");
    }
    
    startAnim();
}

function goToMain()
{
    disableButton("main");
    enableButton("intro");
    animClearTimeoutRef();
    document.getElementsByTagName("main").item(0).classList.remove("clearElem");
    controlPanel.classList.remove("clearElem");
    spoonPartFirst.classList.remove("clearElem");
    spoon2.classList.remove("clearElem");
    spoon3.classList.remove("clearElem");
    spoonPartLast.classList.remove("clearElem");
    document.body.classList.remove("secondPage");
    document.getElementsByTagName("cite").item(0).innerHTML=
    " We not here, because we are free. We here, because we are not free ... ";
    //←→
    document.getElementsByTagName("cite").item(0).classList.toggle("citeRed");
    document.getElementsByTagName("cite").item(0).classList.toggle("citeBlue");
    var prhaseDivParent = document.getElementsByTagName("section").item(0);
    
    if (document.getElementById("prhaseDiv"))
        prhaseDivParent.removeChild(prhaseDiv);
    if (document.getElementById("mirrorDiv"))
        prhaseDivParent.removeChild(mirrorDiv);
    if (document.getElementById("hyperlinkDiv"))
        prhaseDivParent.removeChild(hyperlinkDiv);
    
    onResizeAction.processCanGo = true;
    if (onResizeAction.resizeWasInIntro)
    {
        onResizeAction();
        onResizeAction.resizeWasInIntro = false;
    }
    document.getElementsByTagName("footer").item(0).classList.remove("footerOnBottom");
    document.getElementsByTagName("footer").item(0).style.marginTop="";
}


function enableButton(buttonId)
{
    document.getElementById(buttonId).classList.remove("disabledButton");
    document.getElementById(buttonId).disabled=false;
}

function disableButton(buttonId)
{
    document.getElementById(buttonId).classList.add("disabledButton");
    document.getElementById(buttonId).disabled=true;
}

function ObjForCheckbox(elem)
{
    this.elem = elem;
    this.elem.checked = true;
    var nextObj = null;
    this.timeoutRef = null;
    this.elem.id = "elem" + this.getId();
    this.addInArr(1);
    
    this.makeClosure = function(obj)
    {
        if (nextObj == null)
        {
            nextObj = obj;
        }
        else
            nextObj.makeClosure(obj);
    }
    
    this.retNextObj = function()
    {
        return nextObj;
    }
    
    this.toggleChecked = function(milisec)
    {
        if (ObjForCheckbox.processCanGo == false)
            return;
        this.elem.checked = !this.elem.checked;
        if (nextObj != null)
        {
            this.timeoutRef = setTimeout(function(){nextObj.toggleChecked(milisec);}, milisec);
        }
        else
        {
            var idOfTopObj = elem.id.slice(4) % mainData.length;
            var actObj = mainData[idOfTopObj];
            setTimeout(function(){setThisLineTruel(actObj);}, milisec);
        }
    }
    
    this.isSolidLine = function(verticalCount)
    {
        if (nextObj == null)
            return verticalCount - 1;
        else
            if (this.elem.checked != nextObj.elem.checked)
                return verticalCount - 1;
        else
            return nextObj.isSolidLine(verticalCount - 1);
    }
    
}

var allHeightVal = [0];

function recordAllHeightVal(num)
{
    var idx = allHeightVal.length-1;
    if (allHeightVal[idx] != num)
        allHeightVal[allHeightVal.length] = num;
    
    return allHeightVal.length;
}

function getRandNum(modulTo)
{
    if (modulTo < 2)return 0;
    var num = Math.random() * 10000;
    return (num | 0) % modulTo;
}

function setThisLineTruel(actObj)
{
    while (true)
    {
        actObj.elem.checked = true;
        actObj = actObj.retNextObj();
        if (actObj == null)
            break;
    }
}

function disableTimeoutRef(actObj, deepLevel)
{
    for (var i = 0; i < deepLevel - 1; i ++)
    {
        actObj.elem.checked = !actObj.elem.checked;
        actObj = actObj.retNextObj();
    }
    
    actObj.elem.checked = !actObj.elem.checked;
    clearInterval(actObj.timeoutRef);
}

function startProcess(firstCallCase)
{
    if (startProcess.processCanGo == false)
        return;
    var milisec = startProcess.intervalValue;
    var checkboxPerLine = mainData.length;
    
    var randNum = getRandNum(checkboxPerLine);
    //alert(allHeightVal[allHeightVal.length - 1]);
    //var deepLevel = mainData[randNum].isSolidLine(allHeightVal[allHeightVal.length - 1]);
    //alert(deepLevel);
    if (mainData[randNum].elem.checked == false)
    {
        startProcess.timeoutRef = setTimeout(function(){startProcess(false);}, 1);
        return;
    }
    //alert(deepLevel);
    var timeoutVal=256;
    if (firstCallCase)
    {
        var middle33percent = Math.floor(checkboxPerLine / 3);
        randNum < middle33percent ? randNum += middle33percent : 
        randNum > middle33percent * 2 ? randNum -= middle33percent : randNum = randNum;
        
        setTimeout(function()
        {
            if (startProcess.processCanGo)
                mainData[randNum].toggleChecked(timeoutVal);
        }, milisec+512);
        
        startProcess.timeoutRef = setTimeout(function(){startProcess(false);}, milisec+2048);
        return;
    }
    
    startProcess.timeoutRef = setTimeout(function()
    {
        if (startProcess.processCanGo)
            mainData[randNum].toggleChecked(timeoutVal);
        startProcess(false);
    }, milisec);
}

function startAnim()
{
    var stackOfPrhases = [];
    var idx = 0;
    var startPos = 0;
    var intervalVal = 0;
    
    stackOfPrhases.push("DO YOU WANT TO KNOW");
    stackOfPrhases.push("SOMETHING ABOUT");
    stackOfPrhases.push("JAVASCRIPT AND CHECKBOX");
    animClearTimeoutRef();
    
    makeH1(stackOfPrhases, startPos);
    appendNextPrhase(stackOfPrhases, startPos, idx);
    startPos = stackOfPrhases.length;
    intervalVal = 1750*3;
    startAnim.timeoutRef1 = setTimeout(function()
    {
        appendQuestToDiv(-1);
    }, intervalVal);
    intervalVal += 750*3;
    
    startAnim.timeoutRef2 = setTimeout(function()
    {
        var whiteRabbit = new Image(399, 359);
        whiteRabbit.setAttribute("src", "imageFolder/new-zealand-white-rabbit.png");
        whiteRabbit.setAttribute("alt", "whiteRabbit");
        whiteRabbit.setAttribute("id", "whiteRabbitImg");
        hyperlinkDiv.appendChild(whiteRabbit);
    }, intervalVal);
    
    intervalVal += 1200;
    
    startAnim.timeoutRef3 = setTimeout(function()
    {
        stackOfPrhases.push("FOLLOW THE <span id='reallyWhiteRabbit'>WHITE</span> RABBIT");
        stackOfPrhases.push("(click mirror link below)");
        makeH1(stackOfPrhases, startPos, idx);
        appendNextPrhase(stackOfPrhases, startPos, idx);
    }, intervalVal);
        
}

function appendNextPrhase(stackOfPrhases, startPos, idx)
{
    if (startPos > idx)
    {
        appendNextPrhase(stackOfPrhases, startPos, ++idx);
        return;
    }
//    alert(idx);
    prhaseDiv.appendChild(stackOfPrhases[idx]);
    
    if (idx < stackOfPrhases.length - 1)
        appendNextPrhase.timeoutRef = setTimeout(function(){appendNextPrhase(stackOfPrhases, startPos, ++idx);}, 1750);
}

function makeH1(stackOfPrhases, startPos)
{
    for (var i in stackOfPrhases)
    {
        if (startPos > i)
            continue;
//        alert(i);
        var prhaseNow = document.createElement("h1");
        prhaseNow.id = "prhase" + (i * 1 + 1);
        prhaseNow.innerHTML = stackOfPrhases[i];
        stackOfPrhases.splice(i, 1, prhaseNow);
    }
}

function appendQuestToDiv(idx)
{
    var intervalVal = 0;
    idx < 0 ? intervalVal = 4 : intervalVal = 750;
    
    if (idx < 3)
    {
        appendQuestToDiv.timeoutRef = setTimeout(function()
        {
            appendQuestToDiv(++idx);
        }, intervalVal);
        if (idx < 0)
        {
            var divNow = document.createElement("div");
            divNow.id = "wrapElem";
            prhaseDiv.lastChild.id += "z";
            divNow.appendChild(prhaseDiv.lastChild);
            prhaseDiv.appendChild(divNow);
            
            return;
        }
        var spanNow = document.createElement("span");
        spanNow.id = "quest" + (idx * 1 + 1);
        spanNow.innerHTML = "  ?";
        prhaseDiv.lastChild.appendChild(spanNow);
        spanNow.style.left = prhase3z.offsetLeft + prhase3z.clientWidth + (idx * 32) + "px";
        spanNow.style.top = 0 + "px";
    }
}

function animClearTimeoutRef()
{
    clearTimeout(startAnim.timeoutRef1);
    clearTimeout(startAnim.timeoutRef2);
    clearTimeout(startAnim.timeoutRef3);
    clearTimeout(appendNextPrhase.timeoutRef);
    clearTimeout(appendQuestToDiv.timeoutRef);
}