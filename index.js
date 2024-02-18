const apiKey = `AIzaSyC0xy2QfRGBp4XwbWoIk6Vrjt5vWsHSkCk`;

// compare letters ignore case
function ciEquals(a, b) {
    return typeof a === 'string' && typeof b === 'string'
        ? a.localeCompare(b, undefined, { sensitivity: 'accent' }) === 0
        : a === b;
}

function getData() {
    var output = document.getElementById("output");
    var details = document.getElementById("details");
    var agentCode = document.getElementById("agentCode").value;
    output.innerHTML = "";
    details.innerHTML = "";

    const main_data_url = `https://sheets.googleapis.com/v4/spreadsheets/1gyNHFJ8yJceZbl7R3fszjU2TEjUkOg68uKcpoA4Ckrw/values/Main!A1:Z?key=${apiKey}`;

    fetch(main_data_url)
        .then(response => response.json())
        .then(data => {
            const values = data.values;
            values.some(row => {
                // console.log(agentCode.toString())
                if(ciEquals(row[2], agentCode)){
                    output.innerHTML += `
                    <table>
                        <tr>
                            <th>Agent Code:</th>
                            <td colspan="2">${agentCode}</td>
                        </tr>
                        <tr>
                            <th>Name: </th>
                            <td colspan="2">${row[0]}</td>
                        </tr>
                        <tr>
                            <th>Total Points:</th>
                            <td colspan="2">${row[9]}</td>
                        </tr>
                        <tr>
                            <th>Ranking: </th>
                            <td colspan="2">${row[7]}</td>
                        </tr>
                        <tr>
                            <th>Homework 1 & 2</th>
                            <td>&nbsp&nbsp${row[13]}&nbsp&nbsp</td>
                            <td><button onclick="getDetails()">Homework 1 & 2 details</button></td>
                        </tr>
                        <tr>
                            <th>Homework 3</th>
                            <td>&nbsp&nbsp${row[16]}&nbsp&nbsp</td>
                            <td><button onclick="getDetails()" disabled>Homework 3 details</button></td>
                        </tr>
                        <tr>
                            <th>Homework 4</th>
                            <td>&nbsp&nbsp${row[19]}&nbsp&nbsp</td>
                            <td><button onclick="getDetails()" disabled>Homework 4 details</button></td>
                        </tr>
                        <tr>
                            <th>Homework 5</th>
                            <td>&nbsp&nbsp${row[22]}&nbsp&nbsp</td>
                            <td><button onclick="getDetails()" disabled>Homework 5 details</button></td>
                        </tr>
                    </table>
                    `
                }
            })
        })
        .catch(error => console.log('Error:', error));
}

function getDetails() {
    var details = document.getElementById("details");
    details.innerHTML = ""
    var agentCode = document.getElementById("agentCode").value;
    var content = "";
    var title = "";
    var asWA = 0.0;
    var asSA = 0.0;
    var asRA = 0.0;
    var asCA = 0.0;
    const hw_url = `https://sheets.googleapis.com/v4/spreadsheets/1gyNHFJ8yJceZbl7R3fszjU2TEjUkOg68uKcpoA4Ckrw/values/Sales-submission!A1:Y?key=${apiKey}`;

    fetch(hw_url)
        .then(response => response.json())
        .then(data => {
            const values = data.values;
            title += `<h3>Homework 1 & 2</h3>`;
            content += `<h4> As a Writing Agent: </h4> `;
            values.some(row => {
                if(ciEquals(row[4], agentCode) && row[16] == "1"){
                    asWA += parseFloat(row[21]);
                    content += `<li>${row[17]} : ${row[21]}</li>`
                }
            })
            content += `<h4> As a Spliting Agent: </h4>`;
            values.some(row => {
                if(ciEquals(row[5], agentCode) && row[16] == "1"){
                    asSA += parseFloat(row[22]);
                    content += `<li>${row[17]} : ${row[22]}</li>`
                }
            })
            content += `<h4> As a Referral Agent: </h4>`;
            values.some(row => {
                if(ciEquals(row[6], agentCode) && row[16] == "1"){
                    asRA += parseFloat(row[23]);
                    content += `<li>${row[17]} : ${row[23]}</li>`
                }
            })
            content += `<h4> As a Client: </h4>`;
            values.some(row => {
                if(ciEquals(row[7], agentCode) && row[16] == "1"){
                    asCA += parseFloat(row[24]);
                    content += `<li>${row[17]} : ${row[24]}</li>`
                }
            })
            details.innerHTML += title + content;
        })
        .catch(error => console.log('Error:', error));
        getRecruit();
}
function getRecruit(){
    var details = document.getElementById("details");
    var agentCode = document.getElementById("agentCode").value;
    var recruiter = 0.0;
    var trainer = 0.0;
    const Recruit_url = `https://sheets.googleapis.com/v4/spreadsheets/1gyNHFJ8yJceZbl7R3fszjU2TEjUkOg68uKcpoA4Ckrw/values/Recruits-submission!A1:O?key=${apiKey}`;
    fetch(Recruit_url)
        .then(response => response.json())
        .then(data => {
            const values = data.values;
            title = "<h3>Recruit: </h3>";
            content = "";
            values.some(row => {
                if(ciEquals(row[3], agentCode) && row[10] == "1"){
                    recruiter += parseFloat(row[12]);
                    content += `<li> ${row[2]}: ${row[12]}</li>`;
                }
            })

            content += `<h3>Trainer: </h3>`
            values.some(row => {
                if(ciEquals(row[4], agentCode) && row[10] == "1"){
                    trainer += parseFloat(row[13]);
                    content += `<li>${row[2]}: ${row[13]}</li>`
                }
            })
            details.innerHTML += title + content;

        })
}