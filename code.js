var reader = require("line-reader");
var exec = require('child_process').exec;

var c = [] // credits
,		p = null //products
,		t = 0 //count cases solves
,		solve = "";// response

var findProducts = function(list,top,cb) {
	for(var a = 0; a < list.length; a++) {
		var pivot = list[a];
		for (var b = a+1; b < list.length; b++) {
			var count = 0;
			var current = list[b];
			if(a === b) continue;//dont evalue self
			count += pivot+current;
			if(count === top) {
			 	return cb({
			 		a:a,
			 		b:b,
			 		total:count,
			 		pivot:pivot,
			 		last:current
			 	}) 
			 	break;			
			}
		}
		if(count === top) break;
	}
}

var solveChallenge = function(c,p) {
	//find for credit
	for (var i = 0; i < c.length; i++) {
		findProducts(p,c[i],function(data) {
			if(data.total === c[i]) {
				var n = "Case #"+t;
				var a = data.a+1;
				var b = data.b+1;
				solve += n+": "+a+" "+b;
				i = c.length-1;//break loop then find response
			}
		})
		t++;
	}//end for
}

//input = https://code.google.com/codejam/contest/351101/dashboard#s=p0
reader.eachLine('./input.txt', function(line,last) {
  var str = line.replace(/ /g, ",");
  var isItem = str.search(",") === -1 ? true: false; 
  //parse file 
  if(isItem) {
  	c.push(parseInt(str));
  }else {
 		p = JSON.parse("[" + str + "]").map(function(a) { return parseInt(a) })
  	solveChallenge(c,p);
  	c = [];
  	p = null;
  }
}).then(function() {
	exec("echo "+solve+" >> solve.txt",function (error, stdout, stderr) {
	 	//push solve into txt file
	 	if(error) return console.log(error,'error');
	 	console.log("stdout:", stdout);
	});

})






