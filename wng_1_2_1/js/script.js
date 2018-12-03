window.onload = function () {
    var totalImgArray = [];
    //    var apiKey = "a2793d43-d786-45fa-aa78-7097b57038e9";
    var wasAddCard = false;
    var wasInitial = true;

    function addEventCard() {
        var ele = document.getElementsByClassName('cards');
        for (var i = 0; i < ele.length; i++) {
            ele[i].addEventListener('click', cardsEvent);
        }
        eventStorage();
    }

    function cardsEvent(e) {
        var ele = document.getElementsByClassName('cards');

        if (document.getElementById(e.target.id).classList.contains('active')) {
            document.getElementById(e.target.id).classList.add('inactive');
            document.getElementById(e.target.id).classList.remove('active');
        } else {
            document.getElementById(e.target.id).classList.add('active');
            document.getElementById(e.target.id).classList.remove('inactive');
        }

        for (var i = 0; i < ele.length; i++) {
            if (ele[i].id == e.target.id) {

            } else {
                if (ele[i].classList.contains('active')) {
                    ele[i].classList.remove('active');
                    ele[i].classList.add('inactive');
                }
            }
        }
    }

    function addCard(e) {
        var totalCards = document.getElementsByClassName('cards');
        var eleDiv = document.createElement('div');
        eleDiv.className = "card-main col-lg-3 col-md-3 col-sm-6 col-xs-6";
        var eleChild = document.createElement('div');
        eleChild.className = "cards inactive";
        eleChild.id = "cards" + (totalCards.length + 1);
        eleChild.innerHTML = "<div id='count" + (totalCards.length + 1) + "' class='card-count'>" + (totalCards.length + 1) + "</div>";
        document.getElementById('card-container').appendChild(eleDiv);
        eleDiv.appendChild(eleChild);
        eleChild.addEventListener('click', cardsEvent)
        wasAddCard = true;
    }

    function processData(e) {
        totalImgArray = []
        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                myObj = JSON.parse(this.responseText);
                totalImgArray.push(myObj);
                //                console.log(myObj)
                addImages(totalImgArray);
                document.getElementById('status').innerHTML = "Done loading...";
            } else {
                document.getElementById('status').innerHTML = "Images loading...";
            }
        }

        xmlhttp.open("GET", "http://shibe.online/api/shibes?count=10&urls=true&httpsUrls=true", true);
        xmlhttp.setRequestHeader("Content-type", "application/json");
        xmlhttp.setRequestHeader("Access-Control-Allow-Origin", "*");
        xmlhttp.send();
    }

    function addImages(e) {
        var ele = document.getElementsByClassName('cards');
        for (var i = 0; i < ele.length; i++) {
            var eleImage = document.createElement('img');
            eleImage.id = "eleImage" + i;
            eleImage.className = "eleImage";
            eleImage.src = e[0][i];

            eleImage.setAttribute("width", "150");

            if (ele[i].childNodes[3] == undefined) {
                if (wasAddCard) {
                    if (ele[i].childNodes[1] == undefined) {
                        ele[i].appendChild(eleImage);
                    }
                }

                if (wasInitial) {
                    ele[i].appendChild(eleImage);
                    if (i == ele.length - 1) {
                        wasInitial = false;
                    }
                }

            } else if (ele[i].childNodes[3].length > 0 || ele[i].childNodes[1].length > 0) {
                console.log('lol')
                console.log(ele[i].childNodes)
            }
        }
    }

    function eventStorage() {
        document.getElementById('addCard').addEventListener('click', addCard)
        document.getElementById('addImage').addEventListener('click', processData)
    }

    addEventCard();
}
