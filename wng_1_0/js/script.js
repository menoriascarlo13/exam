window.onload = function () {
    var totalImgArray = [];

    function addUser(e) {
        for (var i = 0; i < e[0].length; i++) {
            var userCont = document.createElement('div');
            userCont.className = "user-cont";
            userCont.id = "userCont" + i;

            var userIconMain = document.createElement('div');
            userIconMain.className = "user-icon-main";
            userIconMain.id = "userIconMain" + i;

            var userIconSub = document.createElement('div');
            userIconSub.className = "user-icon-sub";
            userIconSub.id = "userIconSub" + i;

            var userInfoCont = document.createElement('div');
            userInfoCont.className = "user-info-cont";
            userInfoCont.id = "userInfoCont" + i;

            var iconContainer = document.createElement('div');
            iconContainer.className = "icon-container";
            iconContainer.id = "iconContainer" + i;

            var overlay = document.createElement('div');
            overlay.className = "overlay";
            overlay.id = "overlay" + i;
            overlay.innerHTML = "<img src=" + e[0][i].icon + " alt=" + e[0][i].name + ">";

            var userStatusIcon = document.createElement('div')
            userStatusIcon.className = "user-status-icon " + e[0][i].status;
            userStatusIcon.id = "userStatusIcon" + i;

            var userName = document.createElement('div');
            userName.className = "user-name";
            userName.id = "userName" + i;
            userName.innerHTML = e[0][i].name;

            var userMessage = document.createElement('div');
            userMessage.className = "user-message";
            userMessage.id = "userMessage" + i;
            userMessage.innerHTML = e[0][i].message;


            mainCont.appendChild(userCont);
            userCont.appendChild(userIconMain);
            userIconMain.appendChild(userIconSub);
            userIconMain.appendChild(userInfoCont);
            userInfoCont.appendChild(userName);
            userInfoCont.appendChild(userMessage);
            userIconSub.appendChild(iconContainer);
            iconContainer.appendChild(overlay);
            iconContainer.appendChild(userStatusIcon);

            if (i == e[0].length - 1) {
                addEvent();
            }
        }
    }

    function addEvent() {
        var ele = document.getElementsByClassName('user-cont');
        for (var i = 0; i < ele.length; i++) {
            ele[i].addEventListener('click', allEvent);
            ele[i].addEventListener('touchdown', allEvent);
        }
    }

    function allEvent(e) {
        var ele = document.getElementsByClassName('user-cont');

        if (document.getElementById(e.target.id).classList.contains('conActive')) {
            document.getElementById(e.target.id).classList.add('contInactive');
            document.getElementById(e.target.id).classList.remove('conActive');
        } else {
            document.getElementById(e.target.id).classList.add('conActive');
            document.getElementById(e.target.id).classList.remove('contInactive');
        }

        for (var i = 0; i < ele.length; i++) {
            if (ele[i].id == e.target.id) {

            } else {
                if (ele[i].classList.contains('conActive')) {
                    ele[i].classList.remove('conActive');
                    ele[i].classList.add('contInactive');
                }
            }
        }
    }

    function processData() {
        totalImgArray = []
        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                myObj = JSON.parse(this.responseText);
                totalImgArray.push(myObj);
                addUser(totalImgArray);
            }
        }
        xmlhttp.open("GET", "js/data.json", true);
        xmlhttp.send();

    }

    processData();
}
