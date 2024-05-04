//getting elements by it's id
const value = document.getElementById("value");
const search = document.getElementById("get");
const dis = document.getElementById("display");
const mean = document.getElementById("mean");
const clr = document.getElementById("clear");
const hid = document.getElementById("hidden");
const err = document.getElementById("err");
//when clicks the search button the action performs here
search.addEventListener("click", async () => {
   err.innerHTML=''; //it will clears the error span tag
  try {   
    hid.classList.remove("hidden"); //removing hidden class to display the card element
//async operation starts here while fetching the data from the respective api
    const url = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${value.value}` 
    );
    if (value.value === null || value.value === "") { 
    //when the input field is empty it throws the error message
        throw new Error("Empty Field! Please insert a word to search");
      }
if(!url.ok)
{ 
//if the given data is not found in the api it will throws the error message
    throw new Error('The Word does not found in dictionary');
}
    const data = await url.json(); //json format
    def(data); //calling function
  } 
  catch (error) {
  
      hid.classList.add("hidden");
      dis.innerHTML = "";
      err.innerHTML = `${error.message}`; //error message will be displayed when try block throws the message to catch
    
  }  
});
function url(data){
  //getting audio url from respective object
  for (const ph of data[0].phonetics) {
    let urlaudio
    if (ph.audio!=='') {
        urlaudio=ph.audio;
        return(urlaudio);
    }
}
}
function surl(data){
  //getting sourceUrl from respective object file
    let srcurl=data[0].phonetics
    const found = srcurl.find((element) => element.sourceUrl);
    const u=found.sourceUrl;
return u;
}
function def(data) {
let b=surl(data); //storing sourceurl in b variable
let srcul=document.createElement('p'); //creating p tag
let link=srcul.innerHTML=`<a href="${b}" class="btn btn-info" target="_blank">More Info</a>` //assign the source url into the display 
let a=url(data); //storing audio url in a variable
let aud=document.createElement('p'); //creating p tag
let audio=aud.innerHTML=`<audio controls src="${a}" class="wid"></audio>` //displaying audio file

  dis.innerHTML = `
<div class="card-title">Word: ${data[0].word}</div> 
<div class="card-title">Phonetic: ${data[0].phonetic}</div>
<div class="card-title">audio: <br>${audio}</div>
<div class="card-title">For More Information: <br>${link}</div>
`;
  for (var j = 0; j < data[0].meanings.length; j++) {
    //loops the variables to get partof speech and multiple definitions which stored in the api to get all the definition
    dis.innerHTML += `<div class="parts"><br><br>Parts of Speech : ${data[0].meanings[j].partOfSpeech}<br></div>`;
    for (var i = 0; i < data[0].meanings[j].definitions.length; i++) {
    let  defi = data[0].meanings[j].definitions[i].definition;
      let eg = data[0].meanings[j].definitions[i].example;
      // console.log(defi);
      dis.innerHTML += `Definition ${[i + 1]}: ${defi} <br>`;
      let examp;
      eg?examp=eg:examp='';  
      // let empty=document.getElementById("ex").value     
      if(examp===eg)
        {
          // console.log(examp);
          let exam=document.createElement("div");
        exam.innerHTML=`Example: ${examp} <br><br>`
        dis.append(exam);
          // empty = examp;
        }
        else{
          // console.log(examp);
          let exam=document.createElement("div");
exam.classList.add("hidden")
dis.append(exam);    
        }
    }
  }
}
clr.addEventListener("click", () => {
  //when clicks clrear button it stores empty to all elements
    err.innerHTML=''
  hid.classList.add("hidden");
  dis.innerHTML = "";
  value.value = "";
});