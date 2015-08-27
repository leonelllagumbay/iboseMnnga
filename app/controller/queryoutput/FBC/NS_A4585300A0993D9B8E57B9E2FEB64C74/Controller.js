Ext.define('Form.controller.queryoutput.FBC.NS_A4585300A0993D9B8E57B9E2FEB64C74.Controller', {
   	extend: 'Ext.app.Controller',
   	views: ['queryoutput.FBC.NS_A4585300A0993D9B8E57B9E2FEB64C74.View'],
   	models: ['queryoutput.FBC.NS_A4585300A0993D9B8E57B9E2FEB64C74.Model'],
   	stores: ['queryoutput.FBC.NS_A4585300A0993D9B8E57B9E2FEB64C74.Store'],
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