'use strict';

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
 * @param {object[]} media media elements to display in the gallery. Expected keys are:
 * - <a class="label type-hint type-hint-string">string</a> `fileName` the name of the file, recognized by the user
 * - <a class="label type-hint type-hint-string">string</a> `title` a title to display for this media as _alt_ text
 * - <a class="label type-hint type-hint-string">string</a> `imageUrl` the url for an image to display for this media
 * - <a class="label type-hint type-hint-boolean">boolean</a> `isRemovable=true` whether to show option to remove this item from gallery, takes precedence over `allowRemove`
 * 
 * @param {Boolean} [allowRemove=true] whether to show option to remove on items in gallery
 * 
 * @param {Function} [onRemove] callback to be executed when user removes an item
 * 
 * @param {Function} [onSelect] callback to be executed when user selects an item
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
                                imageUrl: 'https://images.pexels.com/photos/40815/youth-active-jump-happy-40815.jpeg?h=350&dpr=2&auto=compress&cs=tinysrgb'
                            },
                            {
                                fileName: 'woman-blowing-pink-powder.jpeg',
                                title: 'Woman Blowing Pink Powder',
                                imageUrl: 'https://images.pexels.com/photos/612977/pexels-photo-612977.jpeg?h=350&dpr=2&auto=compress&cs=tinysrgb'
                            },
                            {
                                fileName: 'super-mario-action-figure.jpeg',
                                title: 'Super Mario Action Figure',
                                imageUrl: 'https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?h=350&dpr=2&auto=compress&cs=tinysrgb'
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
const component = {};

component.controllerAs = 'vm';

component.bindings = {
    media: '<',
    allowRemove: '<?',
    onRemove: '&?',
    onSelect: '&?'
};

component.template = `
<div class="media-gallery">
    <div class="media-gallery__media-container"
        ng-repeat="media in vm.media track by media.fileName">
        <a href
            ng-hide="!vm.allowRemove || media.isRemovable === false"
            class="media-gallery__image-delete-icon svgicon svgicon--delete"
            ng-click="vm.removeMedia(media)"></a>
        <div class="media-gallery__image"
            ng-style="{'background-image': 'url(' + media.imageUrl + ')' }">
            <img class="media-gallery__screen-reader-image" 
                ng-click="vm.selectMedia(media)" 
                ng-if="media.fileName" 
                ng-src="{{:: media.imageUrl}}" 
                alt="{{:: media.title}}">
        </div>
    </div>
</div>
`;

component.controller = function MediaGalleryController() {
    const vm = this;

    vm.$onInit = function onInit() {
        if (vm.allowRemove === undefined) {
            vm.allowRemove = true;
        }
    };

    vm.selectMedia = function selectMedia(item) {
        if (typeof vm.onSelect === 'function') {
            vm.onSelect({ item: item });
        }
    };
    
    vm.removeMedia = function removeMedia(item) {
        if (typeof vm.onRemove !== 'function' || vm.onRemove({ item: item }) !== false) {
            vm.media.splice(vm.media.indexOf(item), 1);
        }
    };
};

module.exports = component;
