const angular = require('angular');
const faker = require('faker');
require('angular-mocks');
require('./index.js');

describe('[Component] bdMediaGallery', () => {
    let vm;
    let $scope;
    let bindings;
    let compile;
    let onRemove;
    let onSelect;
    let onSetView;

    beforeEach(angular.mock.module('buildium.angular-elements.media-gallery'));

    beforeEach(() => {
        onRemove = jasmine.createSpy('onRemove');
        onSelect = jasmine.createSpy('onSelect');
        onSetView = jasmine.createSpy('onSetView');
    });

    beforeEach(angular.mock.inject(($rootScope, $componentController) => {
        $scope = $rootScope.$new();
        const locals = {};

        bindings = {
            photos: []
        };

        compile = function compileComponent() {
            vm = $componentController('bdMediaGallery', locals, bindings);
            $scope.$digest();
        };
    }));

    function makeMediaItem() {
        return {
            fileName: faker.system.fileName('jpeg'),
            title: faker.random.words(),
            src: faker.image.imageUrl()
        };
    }

    describe('removeMedia', () => {
        describe('when onRemove is defined', () => {
            beforeEach(() => {
                bindings.onRemove = onRemove;
                bindings.media = [
                    makeMediaItem()
                ];
                compile();
            });

            it('should call the onRemove method', () => {
                const [item] = bindings.media;
                vm.removeMedia(item);
                expect(onRemove).toHaveBeenCalledWith({ item });
            });
    
            it('should remove the item from the gallery', () => {
                const [item] = bindings.media;
                vm.removeMedia(item);
                expect(vm.media.length).toBe(0);
            });

            it('should not remove the item if onRemove returns false', () => {
                const [item] = bindings.media;
                onRemove.and.returnValue(false);
                vm.removeMedia(item);
                expect(vm.media.length).toBe(1);
            });
        });

        describe('when onRemove is defined', () => {
            beforeEach(() => {
                bindings.media = [
                    makeMediaItem()
                ];
                compile();
            });

            it('should remove the item from the gallery', () => {
                const [item] = bindings.media;
                vm.removeMedia(item);
                expect(vm.media.length).toBe(0);
            });
        });
    });

    describe('selectMedia', () => {
        it('should call the onSelect method if defined', () => {
            bindings.onSelect = onSelect;
            bindings.media = [
                makeMediaItem()
            ];
            const [item] = bindings.media;
            compile();
            vm.selectMedia(item);
            expect(onSelect).toHaveBeenCalledWith({ item });
        });
    });

    describe('setView', () => {
        it('should call the onSetView method if defined', () => {
            bindings.onSetView = onSetView;
            compile();
            vm.setView();
            expect(onSetView);
        });
    });
});
