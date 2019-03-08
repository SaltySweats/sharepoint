# sharepoint
Repository for testing various sharepoint functionalities

# Base Pattern
```javascript
Function.prototype.RenderTemplate = function(tokens) {
    var strResult = this.toString()
      .split('/*').pop()
      .split('*/').shift().trim();

    for (token in tokens) {

        if (tokens.hasOwnProperty(token) && typeof (token) === 'string')
        {
            var re = new RegExp('{' + token + '}', "ig");
            strResult = strResult.replace(re, tokens[token]);
        }
    }

    return strResult;
};






$object = (function () {

    return {

        // main methods
        Controllers: {
           
        },

        // setup
        Initialize: function () {
      
        },

        // look/feel
        UI: {
            Navigation: function () {
                /*
                <div>
                    <div></div>
                </div>
                */
            }
        },


    }
})();

// convert function to string html
var navigationHtml = $object.UI.Navigation().RenderTemplate()

// attach to page (with jquery)
$("nav").append(navigationHtml);

```
