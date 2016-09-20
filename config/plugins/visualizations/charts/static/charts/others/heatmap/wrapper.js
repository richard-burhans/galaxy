define( [ 'plugin/charts/utilities/tabular-utilities', 'plugin/charts/others/heatmap/heatmap-plugin' ], function( Utilities, HeatMap ) {
    return Backbone.View.extend({
        initialize: function( app, options ) {
            options.render = function( canvas_id, groups ) {
                new HeatMap( app, {
                    chart       : options.chart,
                    canvas_id   : canvas_id,
                    groups      : groups
                });
                return true;
            };
            Utilities.panelHelper( options );
        }
    });
});