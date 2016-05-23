Handlebars.registerHelper('times', function(n :number, block:any ) {
    var accum = '';
    for(var i = 0; i < n; ++i)
        accum += block.fn(i);
    return accum;
});