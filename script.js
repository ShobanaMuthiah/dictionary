const value = document.getElementById("value");
const search = document.getElementById("get");
const dis = document.getElementById("display");
const mean = document.getElementById("mean");
const clr = document.getElementById("clear");
const hid = document.getElementById("hidden");
const err = document.getElementById("err");

search.addEventListener("click", async () => {
   err.innerHTML='';
  try {   
    hid.classList.remove("hidden"); //removing hidden class to display the card elements
    // const val = value.value;
    const url = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${value.value}`
    );
    if (value.value === null || value.value === "") {
        throw new Error("Empty Field! Please insert a to search");
      }
if(!url.ok)
{ 
    throw new Error('The Word does not found in dictionary');
}
    const data = await url.json();
    def(data);
  } 
  catch (error) {
  
      hid.classList.add("hidden");
      dis.innerHTML = "";
      err.innerHTML = `${error.message}`;
    
  }  
});
function url(data){
  for (const ph of data[0].phonetics) {
    let urlaudio
    if (ph.audio!=='') {
        urlaudio=ph.audio;
        return(urlaudio);
    }
}

}
 

function surl(data){
  
    let srcurl=data[0].phonetics
    const found = srcurl.find((element) => element.sourceUrl);
    const u=found.sourceUrl;
return u;

  

}


function def(data) {
let b=surl(data);
let srcul=document.createElement('p');
let link=srcul.innerHTML=`<a href="${b}" class="btn btn-info" target="_blank">More Info</a>`
console.log(b);

// console.log(b);
let a=url(data)
let aud=document.createElement('p');
let audio=aud.innerHTML=`<audio controls src="${a}" class="wid"></audio>`
console.log(a)
console.log(data[0].word);
console.log(data[0].phonetic);


  dis.innerHTML = `
<div class="card-title">Word: ${data[0].word}</div>
<div class="card-title">Phonetic: ${data[0].phonetic}</div>
<div class="card-title">audio: <br>${audio}</div>
<div class="card-title">For More Information: <br>${link}</div>
`;
  for (var j = 0; j < data[0].meanings.length; j++) {
    // console.log(data[0].meanings[j].partOfSpeech);
    dis.innerHTML += `<div class="parts"><br><br>Parts of Speech : ${data[0].meanings[j].partOfSpeech}<br></div>`;
    for (var i = 0; i < data[0].meanings[j].definitions.length; i++) {
    let  defi = data[0].meanings[j].definitions[i].definition;
      let eg = data[0].meanings[j].definitions[i].example;
      // console.log(defi);
      dis.innerHTML += `Definition ${[i + 1]}: ${defi} <br>`;
      if (eg !== undefined||eg!==''||eg!==null) {
        // console.log(eg);
        dis.innerHTML += `<div id="ex">
Example:
${eg} </div><br> `;
      } else {
        document.getElementById("ex").value = "";
      }
      // console.log(defi);
    }
  }
}
clr.addEventListener("click", () => {
    err.innerHTML=''
  hid.classList.add("hidden");
  dis.innerHTML = "";
  value.value = "";
});
