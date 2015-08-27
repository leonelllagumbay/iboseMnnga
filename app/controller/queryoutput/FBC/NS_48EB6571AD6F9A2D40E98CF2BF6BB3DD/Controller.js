Ext.define('Form.controller.queryoutput.FBC.NS_48EB6571AD6F9A2D40E98CF2BF6BB3DD.Controller', {
   	extend: 'Ext.app.Controller',
   	views: ['queryoutput.FBC.NS_48EB6571AD6F9A2D40E98CF2BF6BB3DD.View'],
   	models: ['queryoutput.FBC.NS_48EB6571AD6F9A2D40E98CF2BF6BB3DD.Model'],
   	stores: ['queryoutput.FBC.NS_48EB6571AD6F9A2D40E98CF2BF6BB3DD.Store'],
   		init: function() {
   			this.control({
   				'chart': {
   					render: this.initChart
   				}
   			})
   		},
   		initChart: function(b) {
   			console.log('init chart');
   		}
});