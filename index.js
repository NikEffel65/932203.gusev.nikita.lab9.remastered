"use strict";

function updateElementsButtonsActions(){
	for (let button of document.getElementsByClassName("btn")){
		button.onclick  = onButtonClick;
	}
}


window.onload = function() {
	updateElementsButtonsActions();
}


function findOperation(s, operations){
	let i = -1;
	for (let op of operations) {
		i = s.indexOf(op);
		if (i != -1){
			return i;
		}
	}
	return i;
}


function onButtonClick(){
	let inputField = document.getElementById("imputField");
	let inValue = this.innerHTML;
	let s = inputField.value;
	let operations = "*/+-";
	if (operations.includes(inValue) && operations.includes(s.at(-1))){
		s = s.slice(0, s.length - 1) + inValue;
		inputField.value = s;
		return;
	}

	if (inValue === "C") {
		inputField.value = "0";
		return;
	}
	if (inValue === "&lt;-") {
		inputField.value = inputField.value.length == 1 ? "0" : inputField.value.slice(0, -1);
		return;
	}
	if (inValue === "=") {
		let res = eval(s);
		inputField.value = res;
		return;
	}
	
	//Проверка левой части до ввода любой операции(В самом начале может стоять минус)
	const rgxp_before_operation = new RegExp("^-?(\\d+)?\\.?(\\d+)?$");
	//Проверка левой части после ввода операции
	let rgxp_with_operation_and_sign = new RegExp("^-?(\\d+)?\\.?(\\d+)?[\\+\\-\\*\\/]-?$");
	//Проверка всей строки (с левой частью, с операцией и с правой частью)
	//(В начале левой части и в начале правой части может стоять минус)
	let rgxp_full = new RegExp("^-?(\\d+)?\\.?(\\d+)?[\\+\\-\\*\\/]-?(\\d+)?\\.?(\\d+)?$");
	s = (s==="0") && (inValue != ".") ? inValue : s + inValue;
	const m = s.match(rgxp_with_operation_and_sign);
	console.log(m);
	if   (!(s.match(rgxp_before_operation) || s.match(rgxp_with_operation_and_sign) || s.match(rgxp_full))){
		return;
	}
	
	inputField.value = s;
}





