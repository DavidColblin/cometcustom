/* ##### CONFIGURATIONS ######### 
Mods by DavidM.
*/

var serverFeederURL = 'backend.php';
var innerHTMLContentId = 'content';
var innerHTMLContentWrapper = 'div';
var ajaxMethod = 'get';

/* ##### CONFIGURATIONS #########*/


var Comet = Class.create();
Comet.prototype = {

  timestamp: 0,
  url: './' + serverFeederURL,
  noerror: true,

  initialize: function() { },

  connect: function()
  {
    this.ajax = new Ajax.Request(this.url, {
      method: ajaxMethod,
      parameters: { 'timestamp' : this.timestamp },
      onSuccess: function(transport) {
        // handle the server response
        var response = transport.responseText.evalJSON();
        this.comet.timestamp = response['timestamp'];
        this.comet.handleResponse(response);
        this.comet.noerror = true;
      },
      onComplete: function(transport) {
        // send a new ajax request when this request is finished
        if (!this.comet.noerror)
          // if a connection problem occurs, try to reconnect each 5 seconds
          setTimeout(function(){ comet.connect() }, 5000); 
        else
          this.comet.connect();
        this.comet.noerror = false;
      }
    });
    this.ajax.comet = this;
  },

  disconnect: function()
  {
  },

  handleResponse: function(response)
  {
    $(innerHTMLContentId).innerHTML += '<'+innerHTMLContentWrapper+'>' + response['msg'] + '</'+innerHTMLContentWrapper+'>';
  },

  doRequest: function(request)
  {
    new Ajax.Request(this.url, {
      method: ajaxMethod,
      parameters: { 'msg' : request }
    });
  }
}

var comet = new Comet();
comet.connect();
