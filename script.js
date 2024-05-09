const API_URL = "https://data.cityofnewyork.us/resource/p937-wjvj.json?$query=SELECT%0A%20%20%60inspection_type%60%2C%0A%20%20%60job_ticket_or_work_order_id%60%2C%0A%20%20%60job_id%60%2C%0A%20%20%60job_progress%60%2C%0A%20%20%60bbl%60%2C%0A%20%20%60boro_code%60%2C%0A%20%20%60block%60%2C%0A%20%20%60lot%60%2C%0A%20%20%60house_number%60%2C%0A%20%20%60street_name%60%2C%0A%20%20%60zip_code%60%2C%0A%20%20%60x_coord%60%2C%0A%20%20%60y_coord%60%2C%0A%20%20%60latitude%60%2C%0A%20%20%60longitude%60%2C%0A%20%20%60borough%60%2C%0A%20%20%60inspection_date%60%2C%0A%20%20%60result%60%2C%0A%20%20%60approved_date%60%2C%0A%20%20%60location%60%2C%0A%20%20%60community_board%60%2C%0A%20%20%60council_district%60%2C%0A%20%20%60census_tract%60%2C%0A%20%20%60bin%60%2C%0A%20%20%60nta%60%2C%0A%20%20%60%3A%40computed_region_92fq_4b7q%60%2C%0A%20%20%60%3A%40computed_region_f5dn_yrer%60%2C%0A%20%20%60%3A%40computed_region_yeji_bk3q%60%2C%0A%20%20%60%3A%40computed_region_efsh_h5xi%60%2C%0A%20%20%60%3A%40computed_region_sbqj_enih%60%0AWHERE%0A%20%20%60inspection_date%60%0A%20%20%20%20BETWEEN%20%222022-05-02T09%3A52%3A37%22%20%3A%3A%20floating_timestamp%0A%20%20%20%20AND%20%222024-05-02T09%3A52%3A37%22%20%3A%3A%20floating_timestamp";
const getRatData = async ()=>{
    const response = await fetch(API_URL);
    const objects = await response.json();
    return objects;
}

const init = ()=>{


    getRatData().then(data =>{

        result = Object.groupBy(data, ({ nta }) => nta);

        let percentPassed = {};
        let worstPercent = 1;
        let bestPercent = 0;
        let worstName;
        let bestName; 


        Object.keys(result).map((key)=>{
            let inspections = result[key];

            let denominator = inspections.length;
            let passedCount = inspections.filter((inspection)=>{
                return inspection.result == "Passed"
            }).length;

            percentPassed[key] = passedCount/denominator;
            
            let grade = passedCount/denominator;

            if(grade < worstPercent){
                worstPercent = grade;
                worstName = key;
            }

            if (grade > bestPercent){
                bestPercent = grade;
                bestName = key;
            }

        })
        const bestNameDiv = document.getElementById("best-name");
        const bestNumberDiv = document.getElementById("best-number");
        const worstNameDiv = document.getElementById("worst-name");
        const worstNumberDiv = document.getElementById("worst-number");
    
        bestNameDiv.innerHTML = bestName;
        bestNumberDiv.innerHTML = bestPercent;
        worstNameDiv.innerHTML = worstName;
        worstNumberDiv.innerHTML = worstPercent;

    });


   
}


window.addEventListener("load", init);