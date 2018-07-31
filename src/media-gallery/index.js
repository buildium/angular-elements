const moduleName = 'buildium.angular-elements.media-gallery';

/**
 * @ngdoc module
 * @name buildium.angular-elements.media-gallery
 * @module buildium.angular-elements.media-gallery
 */
angular.module(moduleName, [])

.component('bdMediaGallery', require('./media-gallery.js'))
.constant('GalleryView',
{
    TILE: 'Tile',
    LIST: 'List'
});

module.exports = moduleName;
