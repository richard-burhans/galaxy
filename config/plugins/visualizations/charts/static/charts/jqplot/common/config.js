define( [ 'plugin/charts/utilities/tabular-form' ], function( default_config ) {
    return $.extend(true, {}, default_config, {
        title       : '',
        category    : '',
        library     : 'jqPlot',
        tag         : 'div',
        zoomable    : true,
        keywords    : 'jqplot',
        settings    : {
            x_axis_grid : {
                label       : 'Axis grid',
                help        : 'Would you like to show grid lines for the X axis?',
                type        : 'boolean'
            },
            y_axis_grid : {
                label       : 'Axis grid',
                help        : 'Would you like to show grid lines for the Y axis?',
                type        : 'boolean'
            }
        }
    });
});