function onInit() {
    var apiUrl = "https://api.github.com";
    var userSearch = {
        "url": apiUrl + "/repos/SAPDocuments/Tutorials/issues",
        "method": "GET",
        "timeout": 0,
        "headers": {
            "Authorization": "Bearer 2b15fb5dd3276b4b6c9aac17473c1fed100c6432"
        }
    }

    var previousData = {
        prevTitle: "",
        prevCategory: "",
        preState: ""
        }

    $.ajax(userSearch).done(function (response) {

        response[4].state = "Blocked";
        response[5].state = "Blocked";
        response[6].state = "Blocked";
        response[12].state = "Closed";
        response[14].state = "Closed";
        response[13].state = "Closed";

        for (var i = 0; i < 30; i++) {
            if (response[i].state === "open" || response[i].state === "Open") response[i].class = "success";
            else if (response[i].state === "Closed" || response[i].state === "closed") response[i].class = "grey";
            else if (response[i].state === "Blocked" || response[i].state === "blocked") response[i].class = "red";
            else response[i].class = "blue";;

            if (i < 7) {
                response[i].title = "Get Started with SAP Mobile Cards";
                response[i].category = "Digital Experience";
            }
            else if (i < 12) {
                response[i].title = "Get Started with SAP Mobile Cards";
                response[i].category = "Digital Experience";
            }

            else if (i < 15) {
                response[i].title = "Get Started with Cloud Integration";
                response[i].category = "Integration Suite";
            }

            else if (i < 20) {
                response[i].title = "Develop a Fiori App Using ABAP";
                response[i].category = "Enterprise Extensions";
            }
            else if (i < 23) {
                response[i].title = "Automate and Extend Employee Onboarding";
                response[i].category = "Intelligent Business Process Management";
            }

            else if (i < 27) {
                response[i].title = "Build a Business Application Using Node.js";
                response[i].category = "Enterprise Extensions";
            }

            else {
                response[i].title = "Get Started with Document Information Extraction";
                response[i].category = "SAP AI Business Services";
            }

            (response[i].state === previousData.preState)? response[i].state ="" : previousData.preState=response[i].state;
            
            if(previousData.prevCategory === response[i].category){
                response[i].category = "";
                response[i].title = "";
                var template = "<tr> <td class='borderSide'>" + response[i].title + "</td> <td class='borderSide'>" + response[i].category + "</td><td class='" + response[i].class + " borderSide'>" + response[i].state + "</td>  <td><a href=" + response[i].html_url + ">Issue summary: " + (i + 1) + "</a></td> <td class='" + response[i].class + " borderSide'>" + response[i].state + "</td><td><a href=" + response[i].html_url + ">Issue summary: " + (i + 1) + "</a></td></tr>";
            } else{
                previousData.prevCategory = response[i].category;
                previousData.prevTitle = response[i].title;
                var template = "<tr> <td class='borderTop'>" + response[i].title + "</td> <td class='borderTop'>" + response[i].category + "</td><td class='" + response[i].class + " borderTop'>" + response[i].state + "</td>  <td><a href=" + response[i].html_url + ">Issue summary: " + (i + 1) + "</a></td> <td class='" + response[i].class + " borderTop'>" + response[i].state + "</td><td><a href=" + response[i].html_url + ">Issue summary: " + (i + 1) + "</a></td></tr>";
            }
            response[i].valueState = "error";   
            $("table tbody").append(template);

        }
        console.log(response);
    });
}