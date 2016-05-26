Handlebars.registerHelper('times', function(n :number, block:any ) {
    var accum = '';
    for(var i = 0; i < n; ++i)
        accum += block.fn(i);
    return accum;
});

Handlebars.registerHelper('ifCond', function(v1 : any) {
    var options : any = arguments[arguments.length - 1];
    console.log(arguments[0], arguments[1]);
    if(arguments[0] <= arguments[1]) {
        return options.fn(this);
    }
    return options.inverse(this);
});