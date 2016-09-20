/** This class handles, formats and caches datasets. */
define( [ 'utils/utils' ], function( Utils ) {
    /** Fills request dictionary with data from cache/response */
    var _cache = {};
    var request = function( options ) {
        // identify columns needed to fulfill request
        var column_list = [];
        _.each( options.groups, function( group ) {
            _.each( group.columns, function( column ) {
                var column = column.index;
                var block_id = _block_id( options, column );
                if ( column_list.indexOf( column ) === -1 && !_cache[ block_id ] && column != 'auto' && column != 'zero' && column !== undefined ) {
                    column_list.push( column );
                }
            });
        });
        if ( column_list.length == 0 ) {
            _fillFromCache( options );
            return;
        }

        // Fetch data columns into dataset object
        Utils.get({
            url     : Galaxy.root + 'api/datasets/' + options.id,
            data    : {
                data_type   : 'raw_data',
                provider    : 'dataset-column',
                indeces     : column_list.toString()
            },
            success : function( response ) {
                var results = new Array( column_list.length );
                for ( var i = 0; i < results.length; i++ ) {
                    results[ i ] = [];
                }
                for ( var i in response.data ) {
                    var row = response.data[ i ];
                    for ( var j in row ) {
                        var v = row[ j ];
                        if ( v !== undefined && v != 2147483647 ) {
                            results[ j ].push( v );
                        }
                    }
                }
                console.debug( 'tabular-datasets::_fetch() - Fetching complete.' );
                for ( var i in results ) {
                    var column = column_list[ i ];
                    var block_id = _block_id( options, column );
                    _cache[ block_id ] = results[ i ];
                }
                _fillFromCache( options );
            }
        });

    };

    /** Fill data from cache */
    var _fillFromCache = function( options ) {
        var result = Utils.clone( options );
        console.debug( 'tabular-datasets::_fillFromCache() - Filling request from cache.' );
        var limit = 0;
        for ( var i in result.groups ) {
            var group = result.groups[ i ];
            for ( var key in group.columns ) {
                var column = group.columns[ key ];
                var block_id = _block_id( result, column.index );
                var column_data = _cache[ block_id ];
                if ( column_data ) {
                    limit = Math.max( limit, column_data.length );
                }
            }
        }
        if ( limit == 0 ) {
            console.debug( 'tabular-datasets::_fillFromCache() - Reached data range limit.' );
        }
        for ( var i in result.groups ) {
            var group = result.groups[ i ];
            group.values = [];
            for ( var j = 0; j < limit; j++ ) {
                group.values[ j ] = { x : parseInt( j ) };
            }
        }
        for ( var i in result.groups ) {
            var group = result.groups[ i ];
            for ( var key in group.columns ) {
                var column = group.columns[ key ];
                switch ( column.index ) {
                    case 'auto':
                        for ( var j = 0; j < limit; j++ ) {
                            var value = group.values[ j ];
                            value[ key ] = parseInt( j );
                        }
                        break;
                    case 'zero':
                        for ( var j = 0; j < limit; j++ ) {
                            var value = group.values[ j ];
                            value[ key ] = 0;
                        }
                        break;
                    default:
                        var block_id = _block_id( result, column.index );
                        var column_data = _cache[ block_id ];
                        for ( var j = 0; j < limit; j++ ) {
                            var value = group.values[ j ];
                            var v = column_data[ j ];
                            if ( isNaN( v ) && !column.is_label && !column.is_text ) {
                                v = 0;
                            }
                            value[ key ] = v;
                        }
                }
            }
        }
        options.success( result );
    };

    /** Get block id */
    var _block_id = function ( options, column ) {
        return options.id + '_' + '_' + column;
    };

    return { request: request };
});