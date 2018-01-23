'use strict';

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
            ng-hide="media.isRemovable === false"
            class="media-gallery__image-delete-icon svgicon svgicon--delete"
            ng-click="vm.removeMedia(media)"></a>
        <img class="media-gallery__image" 
            ng-click="vm.selectMedia(media)" 
            ng-if="media.fileName" 
            ng-src="{{:: media.src}}" 
            alt="{{:: media.title}}"/>
    </div>
</div>
`;

component.controller = function MediaGalleryController() {
    const vm = this;

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
