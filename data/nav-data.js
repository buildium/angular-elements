angular.module('docApp').constant('DOCS_NAVIGATION', {
  "api": {
    "id": "api",
    "href": "api/index",
    "name": "API",
    "navGroups": [
      {
        "name": "buildium.angular-elements.accordion",
        "type": "groups",
        "href": "api/buildium.angular-elements.accordion",
        "navItems": [
          {
            "name": "directive",
            "type": "section",
            "href": "api/buildium.angular-elements.accordion/directive",
            "navItems": [
              {
                "name": "bdAccordion",
                "type": "directive",
                "href": "api/buildium.angular-elements.accordion/directive/bdAccordion"
              },
              {
                "name": "bdAccordionGroup",
                "type": "directive",
                "href": "api/buildium.angular-elements.accordion/directive/bdAccordionGroup"
              },
              {
                "name": "bdAccordionSection",
                "type": "directive",
                "href": "api/buildium.angular-elements.accordion/directive/bdAccordionSection"
              },
              {
                "name": "bdAccordionToggle",
                "type": "directive",
                "href": "api/buildium.angular-elements.accordion/directive/bdAccordionToggle"
              }
            ]
          }
        ]
      },
      {
        "name": "buildium.angular-elements.media-gallery",
        "type": "groups",
        "href": "api/buildium.angular-elements.media-gallery",
        "navItems": [
          {
            "name": "directive",
            "type": "section",
            "href": "api/buildium.angular-elements.media-gallery/directive",
            "navItems": [
              {
                "name": "bdMediaGallery",
                "type": "directive",
                "href": "api/buildium.angular-elements.media-gallery/directive/bdMediaGallery"
              }
            ]
          }
        ]
      },
      {
        "name": "buildium.angular-elements.popover",
        "type": "groups",
        "href": "api/buildium.angular-elements.popover",
        "navItems": [
          {
            "name": "directive",
            "type": "section",
            "href": "api/buildium.angular-elements.popover/directive",
            "navItems": [
              {
                "name": "bdPopover",
                "type": "directive",
                "href": "api/buildium.angular-elements.popover/directive/bdPopover"
              }
            ]
          },
          {
            "name": "service",
            "type": "section",
            "href": "api/buildium.angular-elements.popover/service",
            "navItems": [
              {
                "name": "BdSubmenu",
                "type": "service",
                "href": "api/buildium.angular-elements.popover/service/BdSubmenu"
              }
            ]
          }
        ]
      }
    ]
  }
});
