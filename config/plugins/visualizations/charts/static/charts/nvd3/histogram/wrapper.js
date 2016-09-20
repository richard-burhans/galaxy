define( [ 'plugin/charts/utilities/tabular-utilities', 'plugin/components/jobs', 'plugin/charts/nvd3/common/wrapper' ], function( Utilities, Jobs, NVD3 ) {
    return Backbone.Model.extend({
        initialize: function( app, options ) {
            Jobs.request( app, Utilities.buildJobDictionary( 'histogram', app.chart ), function( dataset ) {
                options.request_dictionary = Utilities.buildRequestDictionary( app.chart, dataset.id );
                var index = 1;
                _.each( options.request_dictionary.groups, function( group ) {
                    group.columns = { x : { index : 0, is_numeric : true }, y : { index : index++ } }
                });
                options.type = 'multiBarChart';
                options.makeConfig = function( nvd3_model ) {
                    nvd3_model.options( { showControls: true } );
                };
                new NVD3( app, options );
            }, function() { options.process.reject() } );
        }
    });
});