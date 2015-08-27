Ext.define('Form.controller.queryoutput.FBC.NS_48E84394A2649D06E1034D98E9CD4A63.Controller', {
		   	extend: 'Ext.app.Controller',
		   	views: ['queryoutput.FBC.NS_48E84394A2649D06E1034D98E9CD4A63.View'],
		   	models: ['queryoutput.FBC.NS_48E84394A2649D06E1034D98E9CD4A63.Model'],
		   	stores: ['queryoutput.FBC.NS_48E84394A2649D06E1034D98E9CD4A63.Store'],
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
		})