const value=document.getElementById("value");
const search=document.getElementById("get");
const dis=document.getElementById("display");
const mean=document.getElementById("mean");
const clr=document.getElementById("clear");

search.addEventListener("click",async ()=>{

const val=value.value;
    

    const url=await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${val}`)
    const data=await url.json();
    // console.log(data);
    let defi;

function def(){
    dis.innerHTML=`
    <div class="card-title">Word: ${data[0].word}</div>
    <div class="card-title">Phonetic: ${data[0].phonetic}</div>
    <div class="card-title">audio: <br><audio controls src="${data[0].phonetics[1].audio}"></audio></div>
    <div class="card-title">For More Information: <br><a href="${data[0].phonetics[1].sourceUrl}" class="btn btn-info" target="_blank">More Info</a></div>
    `
    for(var j=0;j<(data[0].meanings).length;j++)
    {
        dis.innerHTML+=`<div class="parts"><br><br>Parts of Speech : ${data[0].meanings[j].partOfSpeech }<br></div>`
for(var i=0;i<(data[0].meanings[j].definitions).length;i++)
{
    defi=(data[0].meanings[j].definitions[i].definition); 
    let eg=data[0].meanings[j].definitions[i].example
    dis.innerHTML+=`Definition ${[i+1]}: ${defi} <br>`
    if(eg!==undefined)
    {
        dis.innerHTML+=`<div id="ex">
    Example:
    ${eg} </div><br> `
    }
    else{
        document.getElementById("ex").value='';
    }
    // console.log(defi); 
}
    }
    
}
def();

});
clr.addEventListener("click",()=>{
    const val=value.value;

    dis.innerHTML='';
    value.value='';
})
