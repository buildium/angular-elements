angular.module('docApp').constant('DOCS_NAVIGATION', {
  "api": {
    "id": "api",
    "href": "api/index",
    "name": "API",
    "navGroups": [
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
