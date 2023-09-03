/**
* 
* M413 - TD5
*
* @author Zinedine Chelgham
*	@copyright UCA - IUT - INFO
* @version 1.0
* @date	2021-03-01
*
*/
"use strict";

const calc_container = document.querySelector('#my-basic-calc');

function parse(str) {
	return Function(`'use strict'; return (${str})`)()
}


const myBasicCalc = {
	div_btn_container: null,
	btn_tab: [],
	operation: "",
	// Debug mode
	debug: false,
	// Verbose mode
	verbose: false,
	// onLoad()
	onLoad: function () {
		if (myBasicCalc.debug) console.log(this); // Here, who is « this » ?
		if (myBasicCalc.verbose) console.log('Add a listener event on window for the load event…');
		window.addEventListener('load', myBasicCalc.ready, false);
		this.buildCalc();
		this.addList();
		this.addKbList();
	},

	ready: function (event) {
		if (myBasicCalc.debug) console.log(this); // Here, who is « this » ?
		if (myBasicCalc.verbose) console.log('The whole page was loaded…');
		if (myBasicCalc.debug) console.log(`Event type : ${event.type}, target : ${event.target}`);
		console.log("--------------Let's Compute !--------------")
		console.log("////////////Commend////////////");
		console.log("-press Enter or Equal to submit");
		console.log("-press Backspace to delete");
		console.log("-press C to reset to 0");
		console.log("///////////////////////////////");
	},

	buildCalc: function () {

		calc_container.appendChild(this.initTextView());
		this.div_btn_container = document.createElement("div");
		this.div_btn_container.setAttribute("id", "my-basic-calc_btn");
		calc_container.appendChild(this.div_btn_container);
		this.initBtn();
		this.buildLine(7, 9, 10); // 7-9 /
		this.buildLine(4, 6, 11); // 4-6 *
		this.buildLine(1, 3, 12); // 3-1 -
		this.div_btn_container.appendChild(this.btn_tab[0]); // 0
		this.div_btn_container.appendChild(this.btn_tab[13]); // .
		this.div_btn_container.appendChild(this.btn_tab[14]); // = 
		this.div_btn_container.appendChild(this.btn_tab[15]); // +
		this.div_btn_container.appendChild(this.btn_tab[16]); // erase

	},

	initBtn: function () {
		//number
		for (let i = 0; i <= 9; i++) {
			this.btn_tab.push(this.createBtn("btn_number", i));
		}
		// operator
		this.btn_tab.push(this.createBtn("btn_operator", "/"));
		this.btn_tab.push(this.createBtn("btn_operator", "*"));
		this.btn_tab.push(this.createBtn("btn_operator", "-"));
		this.btn_tab.push(this.createBtn("btn_number", ".")); // 13 element
		this.btn_tab.push(this.createBtn("btn_equal", "="));
		this.btn_tab.push(this.createBtn("btn_operator", "+"));
		//erase
		this.btn_tab.push(this.createBtn("btn_erase", "effacer"))

	},

	initTextView() {
		let tv = document.createElement("input");
		tv.setAttribute("type", "text");
		tv.setAttribute("class", "result");
		tv.setAttribute("readonly", "readonly");
		tv.value = 0;
		return tv;
	},

	buildLine: function (startValueIndex, endValueIndex, operatorValueIndex) {
		for (let i = startValueIndex; i <= endValueIndex; i++) {
			this.div_btn_container.appendChild(this.btn_tab[i]);
		}
		this.div_btn_container.appendChild(this.btn_tab[operatorValueIndex]);
	},

	createBtn: function (className, value) {
		let b = document.createElement("input");
		b.setAttribute("type", "button");
		b.setAttribute("class", className);
		b.value = value;
		return b;
	},

	addList() { // Click listener
		for (let d of this.btn_tab) {
			d.addEventListener("click", (e) => {
				this.inputHandler(e.currentTarget.value)
			});
		}
	},

	addKbList() { // keyboard listener
		window.addEventListener("keydown", (e) => {
			this.kbInputHandler(e.key);

		})
	},

	kbInputHandler: function (keyValue) {
		let isNumber = new RegExp('^[0-9]+$');
		if (isNumber.test(keyValue) || keyValue === "/" || keyValue === "*"
			|| keyValue === "-" || keyValue === "+" || keyValue === "Backspace"
			|| keyValue === "C" || keyValue === "=" || keyValue === "Enter") {
			this.inputHandler(keyValue);
		}
	},

	inputHandler: function (e) {
		let tv = document.querySelector('.result');
		if (e === "=" || e === "Enter") {
			this.operation = "" + parse(this.operation);
		}
		else if (e === "effacer" || e === "Backspace") {
			this.operation = this.operation.slice(0, this.operation.length - 1);
		}
		else if (e === "C") {
			this.operation = "" + 0;
		}
		else {
			this.operation += e;
			if (this.operation[0] === "0") {
				this.operation = this.operation.slice(1, this.operation.length); // get rid of the default 0
			}

		}
		tv.value = this.operation;
	},

}




// Load myAppRSS Application
myBasicCalc.debug = true; // Debug mode
myBasicCalc.verbose = true; // Verbose mode
myBasicCalc.onLoad();
