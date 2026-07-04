let btn = document.querySelector("#theme-toggle");
let body = document.querySelector("body");
let theme = body.getAttribute("data-theme");
btn.addEventListener("click", function() {
    if(theme=="light"){
        body.setAttribute("data-theme",
            'dark');
        theme="dark";
    }else{
        body.setAttribute("data-theme","light");
        theme="light";
    }
});

let data = [
    {
    id:"TX101",
    customer:"Saniya",
    status:"completed",
    amount:5000.39,
    date:"01-07-2026"
},
{
    id:"TX102",
    customer:"Bakri",
    status:"pending",
    amount:4999.39,
    date:"01-07-2026"
},
{
    id:"TX103",
    customer:"Junaid",
    status:"pending",
    amount:4099.39,
    date:"30-06-2026"
},
{
    id:"TX104",
    customer:"Jaid",
    status:"failed",
    amount:469.39,
    date:"25-06-2026"
},
{
    id:"TX105",
    customer:"Javed",
    status:"completed",
    amount:99.39,
    date:"11-06-2026"
}];
let table= document.querySelector("#transaction-table-body");
function dta(array){
    let newHtml="";
    array.forEach((item)=>{
        newHtml +=`<tr>
                    <td>${item.id}</td>
                    <td>${item.customer}</td>
                    <td><span class = "badge ${item.status}">${item.status}</span></td>
                    <td>${item.amount}</td>
                    <td>${item.date}</td>
                    <td><button class= "view" data-id ="${item.id}">View</button></td>
                </tr>`
    });

    table.innerHTML=newHtml;

};
dta(data)



let dropData = document.querySelector("#filter-status");
dropData.addEventListener("change",(event)=>{
    let val = dropData.value;
    if (val=="all"){
        dta(data);
    }else{
        let filterdata=data.filter((item)=>{
            return item.status.toLowerCase()==val.toLowerCase();

        });
        dta(filterdata)
    }
});


let counter = document.querySelector("#active-users-counter");
function liveCount(){
    let currentUsers = 573;
    setInterval(()=>{
        let newUsers = Math.floor(Math.random()*60)-5;
        newUsers+=currentUsers;
        counter.innerText=newUsers;
    },2000);
}
liveCount();

let overlay = document.querySelector("#modal-overlay");
let modalContent = document.querySelector("#modal-content");
let closeBtn = document.querySelector("#close-modal-btn");

table.addEventListener("click", (e) => {
    if (e.target.classList.contains("view")) {
        let id = e.target.getAttribute("data-id"); 
        console.log("Clicked ID:", id);
        let selectedObject = data.find(item => {
            return item.id == id; 
        });
        if (selectedObject) {
            overlay.classList.remove("hidden");
            modalContent.innerHTML = `
                <p><strong>ID:</strong> ${selectedObject.id}</p>
                <p><strong>Customer:</strong> ${selectedObject.customer}</p>
                <p><strong>Amount:</strong> ${selectedObject.amount}</p>
            `;
        }
    }
}); 

closeBtn.addEventListener("click", () => {
    overlay.classList.add("hidden");
});


let srchInp = document.querySelector("#search-input");
let timer;
srchInp.addEventListener("input",(e)=>{
    clearTimeout(timer);
    timer = setTimeout(()=>{
        let searchRes = e.target.value.toLowerCase();
        let newdta = data.filter((item)=>{
           return item.status.toLowerCase().includes(searchRes);
        })
        dta(newdta);
    },500);

});


let refreshBtn = document.querySelector("#refresh-data-btn");
refreshBtn.addEventListener("click",()=>{
    dta(data);
})