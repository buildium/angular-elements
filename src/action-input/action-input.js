const filter = require('lodash/filter');

/**
 * @ngdoc component
 * @name bdActionInput
 * @module buildium.angular-elements.action-input
 * 
 * @description
 * 
 * An input with an action dropdown, can be wrapped with bdFormElement for validation
 * 
 * @param {Array} options array of objects containing Name, Value, and Icon
 * 
 * @param {Object} [selectedOption] currently selected Value
 *
 * @param {Function} [onChange] callback to be executed when selectedOption is changed
 * 
 * @example
    <example name="bd-action-input" module="buildium.angular-elements.action-input">
        <file name="index.html">
            <script>
                angular.module('buildium.angular-elements.action-input')
                    .controller('ExampleController', function() {
                        this.phones = [
                            {
                                Name: 'Home',
                                Value: 'home',
                                Icon: 'icon-tel icon-tel--home-std'
                            },
                            {
                                Name: 'Mobile',
                                Value: 'mobile',
                                Icon: 'icon-tel icon-tel--mobile-std'
                            },
                            {
                                Name: 'Work',
                                Value: 'work',
                                Icon: 'icon-tel icon-tel--work-std'
                            },
                            {
                                Name: 'Fax',
                                Value: 'fax',
                                Icon: 'icon-tel icon-tel--fax-std'
                            }
                        ]
                    })
            </script>
            <section ng-controller="ExampleController as vm">
                <bd-action-input options="vm.phones" selected-option="vm.phones[1]">
                    <input type="tel" val-type-tel name="phone" id="phone" class="form-element__input" ng-model="vm.phone" />
                </bd-action-input>
            </section>
        </file>
    </example>
 */

const component = {};

component.controllerAs = 'vm';

component.transclude = true;
component.bindings = {
    options: '<',
    inputType: '@',
    inputId: '@',
    validation: '@?',
    selectedOption: '<?',
    onChange: '&?'
};

component.template = `
<div class="form-element__input-group">
    <div class="form-element__input-group-prepend padding--none" style="padding: 0;">
        <bd-popover pointer="true">
            <popover-link>
                <button id="btn" class="btn btn--no-right-border-radius no-border">
                    <span class="{{vm.selectedOption.Icon}}" aria-hidden="true"></span>
                    <span class="screen-reader-only">{{vm.selectedOption.Name}}</span>
                    <span class="icon-link-menu-pointer"></span>
                </button>
            </popover-link>
            <popover-body>
                <div class="popover__body">
                    <ul class="popover__menu">
                        <li class="popover__group">
                            <ul>
                                <li class="popover__item" ng-repeat="option in vm.filteredOptions" ng-click="vm.selectOption(option)">
                                    <a href class="popover__item-link" role="button">
                                        <span class="{{option.Icon}}" aria-hidden="true"></span> {{option.Name}}
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </popover-body>
        </bd-popover>
    </div>
    <div class="form-element__input-group-input">
        <ng-transclude></ng-transclude>
    </div>
</div>
`;

component.controller = function ActionInputController() {
    const vm = this;

    vm.$onInit = function onInit() {
        if (!vm.selectedOption) {
            vm.selectedOption = vm.options[0];
        }
        
        vm.filteredOptions = filter(vm.options, function(option) {
            return option !== vm.selectedOption;
        });
    };
    
    vm.selectOption = function selectOption(option) {
        vm.selectedOption = option;
        vm.filteredOptions = filter(vm.options, function(option) {
            return option !== vm.selectedOption;
        });

        if (vm.onChange) {
            vm.onChange({selectedOption: vm.selectedOption});
        }
    };
};

module.exports = component;
