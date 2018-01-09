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

window.onload=generateTable;
