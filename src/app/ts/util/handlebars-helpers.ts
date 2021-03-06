Handlebars.registerHelper('times', function(n :number, block:any ) {
    let accum = '';
    for(let i = 0; i < n; ++i)
        accum += block.fn(i);
    return accum;
});

Handlebars.registerHelper('ifCond', function(v1 : any) {
    let options : any = arguments[arguments.length - 1];
    if(arguments[0] >= arguments[1]) {
        return options.fn(this);
    }
    return options.inverse(this);
});

Handlebars.registerHelper("prettifyDate", function(timestamp : string) {
    let date = new Date(timestamp);
    let yyyy = date.getFullYear().toString();
    let mm = (date.getMonth()+1).toString(); // getMonth() is zero-based
    let dd  = date.getDate().toString();
    return yyyy +'-'+ (mm[1]?mm:"0"+mm[0])+'-' + (dd[1]?dd:"0"+dd[0]); // padding
});

Handlebars.registerHelper ('truncate', function (str, len) {
    if (str.length > len && str.length > 0) {
        let new_str = str + " ";
        new_str = str.substr (0, len);
        new_str = str.substr (0, new_str.lastIndexOf(" "));
        new_str = (new_str.length > 0) ? new_str : str.substr (0, len);
        return new_str;
    }
    return str;
});

Handlebars.registerHelper('if_eq', function(a, b, opts) {
    if(a == b) {
        return opts.fn(this);
    }
    else {
        return opts.inverse(this);
    }
});