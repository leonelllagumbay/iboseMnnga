Ext.define('Form.controller.queryoutput.FBC.NS_48F3979CD9E40EA88A5608197A0CFC99.Controller', {
   	extend: 'Ext.app.Controller',
   	views: ['queryoutput.FBC.NS_48F3979CD9E40EA88A5608197A0CFC99.View'],
   	models: ['queryoutput.FBC.NS_48F3979CD9E40EA88A5608197A0CFC99.Model'],
   	stores: ['queryoutput.FBC.NS_48F3979CD9E40EA88A5608197A0CFC99.Store'],
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