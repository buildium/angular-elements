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
 * @param {Array} phones array of phone types
 * 
 * @param {Object} [selectedPhone] currently selected phone
 *
 * @param {Function} [onChange] callback to be executed when phone number is updated
 * 
 * @example
    <example name="bd-action-input" module="buildium.angular-elements.action-input">
        <file name="index.html">
            <script>
                angular.module('buildium.angular-elements.action-input')
                    .controller('ExampleController', function() {
                        this.phones = [
                            'Home',
                            'Mobile',
                            'Work',
                            'Fax'
                        ]
                    })
            </script>
            <section ng-controller="ExampleController as vm">
                <bd-action-input phones="vm.phones" selected-phone="vm.phones[1]"></bd-action-input>
            </section>
        </file>
    </example>
 */

const component = {};

component.controllerAs = 'vm';

component.bindings = {
    phones: '<',
    selectedPhone: '<?',
    onChange: '&?'
};

component.template = `
<div class="form-element__input-group">
    <div class="form-element__input-group-prepend padding--none" style="padding: 0;">
        <bd-popover pointer="true">
            <popover-link>
                <button id="btn" class="btn btn--no-right-border-radius no-border">
                    <span class="icon-tel icon-tel--{{vm.selectedPhone.toLowerCase()}}-std" aria-hidden="true"></span>
                    <span class="screen-reader-only">{{vm.selectedPhone}}</span>
                    <span class="icon-link-menu-pointer"></span>
                </button>
            </popover-link>
            <popover-body>
                <div class="popover__body">
                    <ul class="popover__menu">
                        <li class="popover__group">
                            <ul>
                                <li class="popover__item" ng-repeat="phone in vm.phoneNumbers" ng-click="vm.selectPhone(phone)">
                                    <a href class="popover__item-link" role="button">
                                        <span class="icon-tel icon-tel--{{phone.toLowerCase()}}-std" aria-hidden="true"></span> {{phone}}
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
        <input type="tel" val-type-tel name="phone" id="phone" class="form-element__input" ng-model="vm.phone" ng-change="vm.callOnChange()" />
    </div>
</div>
`;

component.controller = function ActionInputController() {
    const vm = this;

    vm.$onInit = function onInit() {
        if (!vm.selectedPhone) {
            vm.selectedPhone = vm.phones[0];
        }
        
        vm.phoneNumbers = filter(vm.phones, function(phone) {
            return phone !== vm.selectedPhone;
        });
    };
    
    vm.selectPhone = function selectPhone(selectedPhone) {
        vm.selectedPhone = selectedPhone;
        vm.phoneNumbers = filter(vm.phones, function(phone) {
            return phone !== vm.selectedPhone;
        }); 
    };

    vm.callOnChange = function callOnChange() {
        if (vm.onChange) {
            vm.onChange({phone: vm.phone, phoneType: vm.selectedPhone});
        }
    };
};

module.exports = component;
