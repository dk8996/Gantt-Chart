/* jshint unused: false */

'use strict';

var locationShouldBe = function(loc){
    if( loc.charAt(0) !== '/' ) { loc = '/' + loc; }

    expect( browser().location().url() ).toBe(loc);
};

var user = {
    clicksTheFirstAlbum: function(){
        element('.js-albums-list > li:nth-child(1) a').click();
    }
};