Handlebars.registerHelper('times', function(n :number, block:any ) {
    var accum = '';
    for(var i = 0; i < n; ++i)
        accum += block.fn(i);
    return accum;
});

Handlebars.registerHelper('ifCond', function(v1 : any) {
    var options : any = arguments[arguments.length - 1];
    if(arguments[0] <= arguments[1]) {
        return options.fn(this);
    }
    return options.inverse(this);
});

Handlebars.registerHelper("prettifyDate", function(timestamp : string) {
    var date = new Date(timestamp);
    var yyyy = date.getFullYear().toString();
    var mm = (date.getMonth()+1).toString(); // getMonth() is zero-based
    var dd  = date.getDate().toString();
    return yyyy +'-'+ (mm[1]?mm:"0"+mm[0])+'-' + (dd[1]?dd:"0"+dd[0]); // padding
});