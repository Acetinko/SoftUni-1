function expressionSplit(str) {
    let pattern = /[\s.();,]/;
    console.log(str.split(pattern).filter(e => e.trim()).join('\n'));
}

//expressionSplit('let sum = 4 * 4,b = "wow";');
expressionSplit('let sum = 1 + 2;if(sum > 2){\tconsole.log(sum);}');