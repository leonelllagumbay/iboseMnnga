Ext.define('Form.controller.queryoutput.FBC.NS_3B8AC320D422A32320F7F38055D13E42.Controller', {
   	extend: 'Ext.app.Controller',
   	views: ['queryoutput.FBC.NS_3B8AC320D422A32320F7F38055D13E42.View'],
   	models: ['queryoutput.FBC.NS_3B8AC320D422A32320F7F38055D13E42.Model'],
   	stores: ['queryoutput.FBC.NS_3B8AC320D422A32320F7F38055D13E42.Store'],
   		init: function() {
   			this.control({
   				'panel': {
   					render: this.initPanel
   				}
   			})
   		},
   		initPanel: function(b) {
   			console.log('init panel');
   		}
})