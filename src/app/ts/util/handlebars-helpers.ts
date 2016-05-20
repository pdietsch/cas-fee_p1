/**
 * Created by Patrik on 20.05.2016.
 */
/// <reference path="../definitions/handlebars-1.0.0.d.ts"/>
Handlebars.registerHelper('times', function(n :number, block ) {
    var accum = '';
    for(var i = 0; i < n; ++i)
        accum += block.fn(i);
    return accum;
});