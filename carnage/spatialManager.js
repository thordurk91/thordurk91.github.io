/*

spatialManager.js

A module which handles spatial lookup, as required for...
e.g. general collision detection.

*/

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

var spatialManager = {

// "PRIVATE" DATA

_nextSpatialID : 1, // make all valid IDs non-falsey (i.e. don't start at 0)

_entities : [],

// "PRIVATE" METHODS
//
// <none yet>


// PUBLIC METHODS

getNewSpatialID : function() {

	return this._nextSpatialID++;
},

register: function(entity) {
    var pos = entity.getPos();
    var spatialID = entity.getSpatialID();
    this._entities[entity.getSpatialID()] = entity;

},

unregister: function(entity) {
    var spatialID = entity.getSpatialID();

     delete this._entities[entity.getSpatialID()];

},

findEntityInRange: function(posX, posY, radius) {
	
	for (var ID in this._entities) {
        var loc = this._entities[ID];
		
        var distSq = util.distSq(loc.cx, loc.cy, posX, posY);
		
        var radSum = loc.getRadius() + radius;
        if ( distSq < radSum * radSum ) {
            return loc;
        }
    }

},

render: function(ctx) {
    var oldStyle = ctx.strokeStyle;
    ctx.strokeStyle = "red";
    
    for (var ID in this._entities) {
        var e = this._entities[ID];
        util.strokeCircle(ctx, e.posX, e.posY, e.radius);
    }
    ctx.strokeStyle = oldStyle;
}

}