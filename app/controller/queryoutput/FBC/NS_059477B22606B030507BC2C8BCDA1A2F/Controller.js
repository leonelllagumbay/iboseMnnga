Ext.define('Form.controller.queryoutput.FBC.NS_059477B22606B030507BC2C8BCDA1A2F.Controller', {
   	extend: 'Ext.app.Controller',
   	views: ['queryoutput.FBC.NS_059477B22606B030507BC2C8BCDA1A2F.View'],
   	models: ['queryoutput.FBC.NS_059477B22606B030507BC2C8BCDA1A2F.Model'],
   	stores: ['queryoutput.FBC.NS_059477B22606B030507BC2C8BCDA1A2F.Store'],
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