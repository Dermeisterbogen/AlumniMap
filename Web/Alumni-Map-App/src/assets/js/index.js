const div = document.getElementById('map')
const request = 'http://localhost:4321/api/alumni'

async function fillDiv(request) {
    const res = await fetch(request)
    const data = await res.json()

    data.forEach(alum => {
        let formatted = `${alum.First} ${alum.Middle} ${alum.Last} went to ${alum.School},
                         and graduated in ${alum.GradYear} with a ${alum.EdStatus} in  
                         ${alum.Major}. Currently, they are a ${alum.Title} at 
                         ${alum.Organization} in ${alum.City}. You can reach them at
                         ${alum.Phone}.`
        createPara(formatted)
    })
}

function createPara(record) {
    const p = document.createElement('p');
    p.innerHTML = record;
    div.append(p);
}

fillDiv(request);
