const token = "97e37bbc7f4f47e69e84f24f18478579"
const baseUrl = "http://api.football-data.org/v4/competitions/2000"

function getStandings() {
    $("#loading").hide();
    $(".load").removeClass("load");
    const url = `${baseUrl}/standings`

    axios.get(url, {
        headers: {
            "X-Auth-Token": token
        }
    }).then((response) => {
        console.log(response.data)
        $("#loading").hide();
        $(".load").removeClass("load");

        const standings = response.data.standings
        document.getElementById("standings").innerHTML = "";

        for (standing of standings) {
            let tableContent = ""

            for (row of standing.table) {
                tableContent += `
                            <li class="list-group-item">
                                <div class="row d-flex justify-content-center align-items-center">
                                    <div class="col-md-4 col-4 d-flex justify-content-center">
                                        <span class="flag">
                                            <img class="rounded-circle border border-1" src="${row.team.crest}" alt="">
                                        </span>
                                        <h5 style="margin: auto 4px;"><b>${row.team.tla}</b></h5>
                                    </div>
                                    <div class="col-md-1 col-1">${row.won}</div>
                                    <div class="col-md-1 col-1">${row.draw}</div>
                                    <div class="col-md-1 col-1">${row.lost}</div>
                                    <div class="col-md-1 col-1">${row.goalsFor}</div>
                                    <div class="col-md-1 col-1">${row.goalsAgainst}</div>
                                    <div class="col-md-1 col-1">${row.goalDifference}</div>
                                    <div class="col-md-2 col-2"><b>${row.points}</b></div>
                                </div>
                            </li>
                        `
            }

            const content = `
                    <div class="col-md-6 col-12 mb-4">
                        <div class="card shadow border-none text-center">
                            <div class="card-header bg-primary text-center">
                                <b>${standing.group}</b>
                            </div>

                            <div class="content-header">
                                <div class="row bg-secondary content-width m-0">
                                    <div class="col-md-4 col-4">Team</div>
                                    <div class="col-sm-1 col-1">W</div>
                                    <div class="col-sm-1 col-1">D</div>
                                    <div class="col-sm-1 col-1">L</div>
                                    <div class="col-sm-1 col-1">GF</div>
                                    <div class="col-sm-1 col-1">GA</div>
                                    <div class="col-sm-1 col-1">GD</div>
                                    <div class="col-md-2 col-2">Pts</div>
                                </div>

                                <ul class="list-group list-group-flush content-width">
                                    ${tableContent}
                                </ul>
                            </div>

                        </div>
                    </div>
                `

            document.getElementById("standings").innerHTML += content;


        }

    })
}

function getMatches() {
    const url = `${baseUrl}/matches`

    axios.get(url, {
        headers: {
            "X-Auth-Token": token
        }
    }).then((response) => {
        console.log(response.data)

        const matches = response.data.matches
        document.getElementById("matches").innerHTML = "";

        for (match of matches) {
            const homeTeam = match.homeTeam
            const awayTeam = match.awayTeam

            const utcDate = match.utcDate
            const matchTime = new Date(utcDate)
            const dateString = matchTime.getUTCDate() + "/" + (matchTime.getUTCMonth() + 1) + "/" +
                matchTime.getUTCFullYear()
            const timeString = (matchTime.getUTCHours() - 1) + ":" + matchTime.getUTCMinutes() + "0"

            if (homeTeam.name == null) {
                continue
            }
            const content = `
                    <div class="col-12 mt-5">
                        <div class="card shadow text-center rounded-pill" style="overflow: hidden;">
                            <div class="card-body p-0">
                                <div class="row" style="height: 120px;">
                                    <div class="col-3 bg-primary match-team" style="border-right: 5px solid #5b0d25;">
                                        <span class="flag">
                                            <img class="rounded-circle" src="${homeTeam.crest}" alt="">
                                            <sup>${match.score.winner=="HOME_TEAM" ? `<img class="rounded-circle star" src="images/star.jpg" alt="">` : ""}</sup>
                                        </span>
                                        <h5 class="mt-1" style="margin: 0;"><b>${homeTeam.name}</b></h5>
                                    </div>

                                    <div class="col-6" style="margin: auto;">
                                        <div class="row">
                                            <div class="col-md-3 col-2" style="margin: auto 0;">
                                                <h4 style="margin:0;">${match.score.regularTime ? match.score.regularTime.home + match.score.extraTime.home : match.score.fullTime.home}</h4>
                                                <h6>${match.score.penalties ? `(${match.score.penalties.home})` : ``}</h6>
                                            </div>
                                            <div class="col-md-6 col-8">
                                                <h6><b>${match.stage}</b> ${match.group? ` (${match.group})` : ``}</h6>
                                                <h3>X</h3>
                                                <h6 style="margin:0;">${timeString}PM &nbsp;&nbsp; ${dateString}</h6>
                                            </div>
                                            <div class="col-md-3 col-2" style="margin: auto 0;">
                                                <h4 style="margin:0;">${match.score.regularTime ? match.score.regularTime.away + match.score.extraTime.away : match.score.fullTime.away}</h4>
                                                <h6>${match.score.penalties ? `(${match.score.penalties.away})` : ``}</h6>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col-3 bg-primary match-team" style="border-left: 5px solid #5b0d25;">
                                        <span class="flag">
                                            <img class="rounded-circle" src="${awayTeam.crest}" alt="">
                                            <sup>${match.score.winner=="AWAY_TEAM" ? `<img class="rounded-circle star" src="images/star.jpg" alt="">` : ""}</sup>
                                        </span>
                                        <h5 class="mt-1" style="margin: 0;"><b>${awayTeam.name}</b></h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `

            document.getElementById("matches").innerHTML += content;
        }
    })
}

getStandings()
getMatches()
