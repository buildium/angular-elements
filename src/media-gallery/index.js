'use strict';

const moduleName = 'buildium.angular-elements.media-gallery';

/**
 * @ngdoc module
 * @name buildium.angular-elements.media-gallery
 * @module buildium.angular-elements.media-gallery
 */
angular.module(moduleName, [])

/**
 * @ngdoc directive
 * @name bdMediaGallery
 * @module buildium.angular-elements.media-gallery
 * @restrict E
 * 
 * @description
 * 
 * Displays a gallery of media items (images, etc...)
 * 
 * @param {Object[]} media media elements to display in the gallery. Expected keys are:
 * - `fileName` the name of the file, recognized by the user
 * - `title` a title to display for this media as _alt_ text
 * - `src` the source url for this media
 * 
 * @param {Boolean} allowRemove whether to show option to remove an item from gallery
 * 
 * @param {Function} onRemove callback to be executed when user removes an item
 * 
 * @param {Function} onSelect callback to be executed when user selects an item

 * 
 * @example
    <example name="bd-media-gallery" module="buildium.angular-elements.media-gallery">
        <file name="index.html">
            <script>
                angular.module('buildium.angular-elements.media-gallery')
                    .controller('ExampleController', function() {
                        this.media = [
                            {
                                fileName: 'sunset-beach-people-sunrise.jpeg',
                                title: 'Sunset Beach People',
                                src: 'https://images.pexels.com/photos/40815/youth-active-jump-happy-40815.jpeg?h=350&dpr=2&auto=compress&cs=tinysrgb'
                            },
                            {
                                fileName: 'woman-blowing-pink-powder.jpeg',
                                title: 'Woman Blowing Pink Powder',
                                src: 'https://images.pexels.com/photos/612977/pexels-photo-612977.jpeg?h=350&dpr=2&auto=compress&cs=tinysrgb'
                            },
                            {
                                fileName: 'super-mario-action-figure.jpeg',
                                title: 'Super Mario Action Figure',
                                src: 'https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?h=350&dpr=2&auto=compress&cs=tinysrgb'
                            },
                        ]
                    })
            </script>
            <section ng-controller="ExampleController as vm">
                <bd-media-gallery media="vm.media" allow-remove="true"></bd-media-gallery>
            </section>
        </file>
    </example>
 */
.component('bdMediaGallery', require('./media-gallery.js'));

module.exports = moduleName;
