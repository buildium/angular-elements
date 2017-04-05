angular.module('docApp').constant('DOCS_NAVIGATION', {
  "api": {
    "id": "api",
    "href": "api",
    "name": "API",
    "navGroups": [
      {
        "name": "compile-dynamic-html",
        "type": "groups",
        "href": "api/compile-dynamic-html",
        "navItems": [
          {
            "name": "directive",
            "type": "section",
            "href": "api/compile-dynamic-html/directive",
            "navItems": [
              {
                "name": "bdCompileDynamicHtml",
                "type": "directive",
                "href": "api/compile-dynamic-html/directive/bdCompileDynamicHtml"
              }
            ]
          }
        ]
      },
      {
        "name": "compile-template",
        "type": "groups",
        "href": "api/compile-template",
        "navItems": [
          {
            "name": "directive",
            "type": "section",
            "href": "api/compile-template/directive",
            "navItems": [
              {
                "name": "bdCompileTemplate",
                "type": "directive",
                "href": "api/compile-template/directive/bdCompileTemplate"
              }
            ]
          }
        ]
      },
      {
        "name": "event",
        "type": "groups",
        "href": "api/event",
        "navItems": [
          {
            "name": "directive",
            "type": "section",
            "href": "api/event/directive",
            "navItems": [
              {
                "name": "bdEvent",
                "type": "directive",
                "href": "api/event/directive/bdEvent"
              }
            ]
          }
        ]
      },
      {
        "name": "loading-src",
        "type": "groups",
        "href": "api/loading-src",
        "navItems": [
          {
            "name": "directive",
            "type": "section",
            "href": "api/loading-src/directive",
            "navItems": [
              {
                "name": "bdLoadingSrc",
                "type": "directive",
                "href": "api/loading-src/directive/bdLoadingSrc"
              }
            ]
          }
        ]
      },
      {
        "name": "scroll-into-view",
        "type": "groups",
        "href": "api/scroll-into-view",
        "navItems": [
          {
            "name": "directive",
            "type": "section",
            "href": "api/scroll-into-view/directive",
            "navItems": [
              {
                "name": "bdScrollIntoView",
                "type": "directive",
                "href": "api/scroll-into-view/directive/bdScrollIntoView"
              }
            ]
          }
        ]
      }
    ]
  }
});
