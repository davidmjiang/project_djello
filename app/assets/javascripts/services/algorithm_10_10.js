"use strict";
function nameOrder(arr){
	var names = {};
	arr.forEach(function(el){
		var fullName = el.split(" ");
		var name = fullName[0];
		var ordinal = fullName[1];
		if(names[name]){
			names[name].push(ordinal);
		}
		else{
			names[name] = [ordinal];
		}
	});
	var sortedNames = Object.keys(names).sort(function(a,b){
		return b-a;
	});
	var result = sortedNames.map(function(el){
		return sortedNumerals(names[el]);
	});
	return result.reduce(function(a,b){
		return a.concat(b);
	});

}

function sortedNumerals(arr){
	arr.sort(function(a,b){
		return numeral(b) > numeral(a);
	});
}

function numeral(roman){
	var numbers = [100, 90, 50, 40, 10, 9, 5, 4, 1];
	var romans = ["C", "XC", "L", "XL", "X","IX","V","IV","I"];
	var result = 0;
	//loop
}