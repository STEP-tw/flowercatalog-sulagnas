const generateTable=function () {
	let table=document.getElementById('table');
  let commentListkeys=['date','name','comment'];
  for(let element=0;element<commentList.length;element++){
	let row=document.createElement('tr');
    for(let index=0;index<3;++index){
			let col=document.createElement('td');
			col.innerHTML=commentList[element][commentListkeys[index]];
      row.appendChild(col);
    }
    table.appendChild(row);
  }
};

// const showComment=function () {
//   let table=document.getElementById('table');
//
//   let reqListener=function () {
// 		let commentDetails=JSON.parse(this.responseText);
// 		console.log(commentDetails);
    // let row=document.createElement('tr');
		// let commentList=[];
		// for(let index=0;index<3;++index){
		// 	let col=document.createElement('td');
		// 	col.innerHTML=commentList[element][commentListkeys[index]];
    //   row.appendChild(col);
    // }
		// table.appendChild(row);
    // let pokemonImg=pokemonInfo.sprites.front_default;
    // pokemon.src=pokemonImg;
//   }
//
//   let xml=new XMLHttpRequest();
//   xml.addEventListener('load',reqListener);
//   xml.open('POST',`/guestBook.html`);
//   xml.send();
// }

window.onload=generateTable;
