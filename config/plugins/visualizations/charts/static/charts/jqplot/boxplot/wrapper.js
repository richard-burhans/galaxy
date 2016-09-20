define( [ 'plugin/charts/jqplot/common/wrapper', 'plugin/components/jobs', 'plugin/charts/utilities/tabular-utilities' ], function( Plot, Jobs, Utilities ) {
    return Backbone.View.extend({
        initialize: function( app, options ) {
            Jobs.request( app, Utilities.buildJobDictionary( 'boxplot', app.chart ), function( dataset ) {
                var request_dictionary = Utilities.buildRequestDictionary( app.chart, dataset.id );
                var chart = options.chart;
                var index = 0;
                _.each( request_dictionary.groups, function( group ) {
                    group.columns = { x: { index : index++ } };
                });
                var plot = new Plot( app, {
                    process             : options.process,
                    chart               : options.chart,
                    request_dictionary  : request_dictionary,
                    canvas_list         : options.canvas_list,
                    makeConfig          : function( groups, plot_config ){
                        var boundary = Utilities.getDomains( groups, 'x' );
                        $.extend( true, plot_config, {
                            seriesDefaults: {
                                renderer: $.jqplot.OHLCRenderer,
                                rendererOptions : {
                                    candleStick     : true,
                                    fillUpBody      : true,
                                    fillDownBody    : true
                                }
                            },
                            axes : {
                                xaxis: {
                                    min: -1,
                                    max: groups.length + 0.01
                                },
                                yaxis: {
                                    min: boundary.x.min,
                                    max: boundary.x.max
                                }
                            }
                        });
                    },
                    makeCategories: function( groups ) {
                        var x_labels = [];
                        for ( var group_index in groups ) {
                            x_labels.push( groups[ group_index ].key );
                        }
                        Utilities.mapCategories ( groups, x_labels );
                        return {
                            array: {
                                x : x_labels
                            }
                        }
                    },
                    makeSeriesLabels : function ( groups, plot_config ) {
                        return [ { label : 'Boxplot values' } ];
                    },
                    makeSeries: function ( groups ) {
                        /*/ example data
                        var catOHLC = [
                            [0, 138.7, 139.68, 135.18, 135.4],
                            [1, 143.46, 144.66, 139.79, 140.02],
                            [2, 140.67, 143.56, 132.88, 142.44],
                            [3, 136.01, 139.5, 134.53, 139.48]
                        ];
                        return [catOHLC];*/
                        
                        // plot data
                        var plot_data = [];
                        
                        // check group length
                        if ( groups.length == 0 || groups[0].values.length < 5 ) {
                            chart.state( 'failed', 'Boxplot data could not be found.' );
                            return [ plot_data ];
                        }
                        
                        // loop through data groups
                        var indeces = [ 2, 4, 0, 1 ];
                        for ( var group_index in groups ) {
                            var group = groups[ group_index ];
                            var point = [];
                            point.push( parseInt( group_index ) );
                            for ( var key in indeces ) {
                                point.push( group.values[ indeces[ key ] ].x );
                            }
                            plot_data.push( point );
                        }
                        
                        // HACK: the boxplot renderer has an issue with single elements
                        var point = [];
                        point[ 0 ] = plot_data.length;
                        for ( var key in indeces ) {
                            point.push( 0 );
                        }
                        plot_data.push ( point );
                        return [ plot_data ];
                    }
                });
            }, function() { options.process.reject() } );
        }
    });
});
