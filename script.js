var charArr = [];
// display data on page
// title / nested author (json)s
// remove all nodes from DOM after 15 sec

// check which key pressed and call action
// check wheter seachred string has been inserted (injects3crets)
const getKeys = (e) => {
	e.stopPropagation();
	
	let keyCode = e.keyCode;
	const pass = "injects3crets";

	//const pass = "A";

	let charX = String.fromCharCode(keyCode);
	charArr.push(charX);

	let arr = charArr.join('');



	if (arr === pass) {
		makeReq().then((data) => {
			printData(data.slice(0,5));
		})

	}
}


const clearCacheData = (e) => {
		if (e.keyCode === 27) {
		charArr = [];
	}
}


// collect data 
const makeReq = () => {
	return fetch('https://api.github.com/repos/elixir-lang/elixir/issues')
	  .then((response) => {
	    // The response is a Response instance.
	    // You parse the data into a useable format using `.json()`
	    return response.json();
	  
	})
}

const printData = (data) => {



	data.map((elem) => {
		let wrapperDiv = document.createElement("div");
		let titleDiv = document.createElement("div");
		let authorDiv = document.createElement("div");		

		titleDiv.innerHTML = elem.title;
		authorDiv.innerHTML = elem.user.login;
		wrapperDiv.appendChild(titleDiv);
		wrapperDiv.appendChild(authorDiv);
		document.getElementById('placeholder').appendChild(wrapperDiv);
	})
	setTimeout(clearDataAfterTime, 5000);
}

//makeReq();

const clearDataAfterTime = () => {
	let myNode = document.getElementById("placeholder");
	while (myNode.firstChild) {
	    myNode.removeChild(myNode.firstChild);
	}
}

// get pressed key
document.addEventListener("keypress", getKeys, true);
document.addEventListener("keydown", clearCacheData, true);
