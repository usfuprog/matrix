function menuGo(elem, menuInnerText)
{
    var menuRef;
    var menuContent=menuInnerText;
    var fromLeft=0, fromTop=0;
    var timeoutRef=null;
    var actEvent=null;
    var disapearRequired = true;
    
    getMenu();
    
    elem.onmouseout=hideNow;
    elem.onmousemove=prepareMenuToShow;
    elem.onmousedown=hideNow;
    
    function hideNow()
    {
        clearTimeout(timeoutRef);
        setTimeout(function()
        {
            if (disapearRequired)
                menuRef.style.display="none";
        }, 64);
    }
    
    function prepareMenuToShow(event)
    {
        actEvent=event;
        getCoords(actEvent);
        hideMenu();
        timeoutRef=setTimeout(function(){makeVisibleMenu(actEvent);}, 512);
    }

    function makeVisibleMenu(event)
    {
        if (actEvent==null)return;
        menuRef.style.left=fromLeft+10+"px";
        menuRef.style.top=fromTop+10+"px";
        menuRef.style.display="block";
    };

    function hideMenu()
    {
        clearTimeout(timeoutRef);
        setTimeout(function()
        {
            if (disapearRequired)
                menuRef.style.display="none";
        }, 500);
    }

    function getMenu()
    {
        menuRef=document.createElement("span");
        menuRef.innerHTML=menuContent;
        menuRef.setAttribute("class", "menuFromMenuGoScript");
        notReadyClick();
        menuRef.onmouseover=readyClick;
        menuRef.onmouseout=notReadyClick;
        menuRef.onclick=goHyperlink;
        
        document.body.appendChild(menuRef);
    }
    
    function readyClick()
    {
        disapearRequired = false;
        menuRef.style.backgroundColor="black";
        menuRef.style.cursor="pointer";
    }
    
    function goHyperlink()
    {
        var hyperlink = document.createElement("a");
        hyperlink.innerHTML = "buy many goods now :)";
        hyperlink.setAttribute("target", "_blank");
        hyperlink.setAttribute("href", menuContent);
        hyperlink.setAttribute("dispay", "none");
        hyperlink.id="nonevisiblehyperlink";
        document.body.appendChild(hyperlink);
        var hyperlinkInDom = document.getElementById("nonevisiblehyperlink");
        hyperlinkInDom.click();
        document.body.removeChild(hyperlinkInDom);
    }
    
    function notReadyClick()
    {
        menuRef.style.cssText = 
            "position: absolute; background-color: grey; border: 3px double silver; "+
            "color: white; padding: 2px; font-size: 0.7em; display: none";
        disapearRequired = true;
    }
    
    function getCoords(event)
    {
        fromLeft=event.pageX;
        fromTop=event.pageY;
    };

    return 0;
}