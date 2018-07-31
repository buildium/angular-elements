/**
 * @ngdoc component
 * @name bdMediaGallery
 * @module buildium.angular-elements.media-gallery
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
 * @param {Boolean} [allowEnlarge=false] whether to show prompt to enlarge image
 * 
 * @param {Function} [onEnlarge] callback to be executed when user clicks enlarge prompt
 * 
 * @param {Number} [limitTo] limits the number of items visible in the gallery
 * 
 * @param {Function} [onViewAll] if `limitTo` provided, callback to be executed when user chooses to view all items 
 * 
 * @param {Boolean} [enableListView=false] whether to show option to toggle between list view and tile view
 * 
 * @param {Function} [onSetView] if `listView` provided, callback to be executed when user chooses to display list view
 * 
 * @example
    <example name="bd-media-gallery" module="buildium.angular-elements.media-gallery">
        <file name="index.html">
            <style>
                .media-gallery__media-container {
                    height: 100px;
                    width: 100px;
                    margin: 10px;
                }
            </style>
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
                            {
                                fileName: 'sunset-beach-people-sunrise2.jpeg',
                                title: 'Sunset Beach People',
                                imageUrl: 'https://images.pexels.com/photos/40815/youth-active-jump-happy-40815.jpeg?h=350&dpr=2&auto=compress&cs=tinysrgb'
                            },
                            {
                                fileName: 'woman-blowing-pink-powder2.jpeg',
                                title: 'Woman Blowing Pink Powder',
                                imageUrl: 'https://images.pexels.com/photos/612977/pexels-photo-612977.jpeg?h=350&dpr=2&auto=compress&cs=tinysrgb'
                            },
                            {
                                fileName: 'super-mario-action-figure2.jpeg',
                                title: 'Super Mario Action Figure',
                                imageUrl: 'https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?h=350&dpr=2&auto=compress&cs=tinysrgb'
                            },
                        ]
                    })
            </script>
            <section ng-controller="ExampleController as vm">
                <bd-media-gallery media="vm.media" allow-remove="true" allow-enlarge="true" limit-to="3"></bd-media-gallery>
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
    onSelect: '&?',
    allowEnlarge: '<?',
    onEnlarge: '&?',
    limitTo: '<?',
    onViewAll: '&?',
    enableListView: '<?',
    onSetView: '&?'
};

component.template = `
<div ng-if="vm.enableListView && (vm.media && vm.media.length > 0)" class="button-container right row media-gallery__view-controls">
    <ul class="button-group row">
        <li><a class="btn svgicon svgicon--icon_grid-view media-gallery__btn" ng-class="{'media-gallery__btn--active': vm.view === vm.viewPreferences.TILE}" ng-click="vm.setView(vm.viewPreferences.TILE)"></a></li>
        <li><a class="btn svgicon svgicon--icon_list-view media-gallery__btn" ng-class="{'media-gallery__btn--active': vm.view === vm.viewPreferences.LIST}" ng-click="vm.setView(vm.viewPreferences.LIST)"></a></li>
    </ul>
</div>
<div class="media-gallery">
    <div class="media-gallery__media-container" ng-if="vm.view === vm.viewPreferences.TILE"
        ng-repeat="media in vm.media | limitTo:vm.limitTo track by media.fileName">
        <div class="media-gallery__image" 
            ng-style="{'background-image': 'url(' + media.imageUrl + ')' }"
            ng-click="vm.selectMedia(media)"> 
            <img class="media-gallery__screen-reader-only" 
                ng-src="{{:: media.imageUrl}}" 
                alt="{{:: media.title}}">
        </div>
        <button class="media-gallery__view-larger"
            ng-if="vm.allowEnlarge"
            ng-click="vm.viewLarger(media)">
            View larger
        </button>
        <button class="media-gallery__view-all"
            ng-if="vm.limitTo < vm.media.length"
            ng-show="$last"
            ng-click="vm.viewAll()">
            +{{ vm.media.length - vm.limitTo + 1 }}
        </button>
        <button class="media-gallery__image-delete svgicon svgicon--delete"
            ng-if="media.isRemovable || (media.isRemovable !== false && vm.allowRemove)"
            ng-click="vm.removeMedia(media)">
            <span class="media-gallery__screen-reader-only">Remove</span>
        </button>
    </div>
    <div class="media-list__media-container" ng-if="vm.view === vm.viewPreferences.LIST"
         ng-repeat="media in vm.media">
        <div class="col-md-12 media-list__row">
            <div class="col-md-1" ng-click=""vm.viewLarger(media)">
                <div class="media-list__image" 
                     ng-style="{'background-image': 'url(' + media.imageUrl + ')' }"> 
                    <img class="media-gallery__screen-reader-only" 
                         ng-src="{{:: media.imageUrl}}" 
                         alt="{{:: media.title}}">
                </div>
            </div>
            <div class="col-md-10 media-list__file-name" ng-click="vm.viewLarger(media)"></div>
            <div class="col-md-1"><a href="#" class="media-list__delete svgicon--trash-can btn--icon" ng-click="vm.removeMedia(media)" alt="" title=""></a></div>
        </div>
        <div class="col-md-12 editable-panel__divider media-list__divider"></div>
    </div>
</div>
`;

component.controller = function MediaGalleryController() {
    const vm = this;

    vm.viewPreferences = {
        TILE: 'Tile',
        LIST: 'List'
    };

    vm.$onInit = function onInit() {
        if (vm.allowRemove === undefined) {
            vm.allowRemove = true;
        }
        vm.view = vm.viewPreferences.TILE;
    };

    vm.selectMedia = function selectMedia(item) {
        if (typeof vm.onSelect === 'function') {
            vm.onSelect({ item });
        }
    };
    
    vm.removeMedia = function removeMedia(item) {
        if (typeof vm.onRemove !== 'function' || vm.onRemove({ item }) !== false) {
            vm.media.splice(vm.media.indexOf(item), 1);
        }
    };

    vm.viewLarger = function viewLarger(item) {
        if (typeof vm.onEnlarge === 'function') {
            vm.onEnlarge({ item });
        }
    };

    vm.viewAll = function viewAll() {
        if (typeof vm.onViewAll === 'function') {
            vm.onViewAll();
        }
    };

    vm.setView = function setView(view) {
        vm.view = view;
        if (typeof vm.onSetView === 'function') {
            vm.onSetView();
        }
    };  
};

module.exports = component;
