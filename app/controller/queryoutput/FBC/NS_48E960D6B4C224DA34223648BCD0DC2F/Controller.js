Ext.define('Form.controller.queryoutput.FBC.NS_48E960D6B4C224DA34223648BCD0DC2F.Controller', {
		   	extend: 'Ext.app.Controller',
		   	views: ['queryoutput.FBC.NS_48E960D6B4C224DA34223648BCD0DC2F.View'],
		   	models: ['queryoutput.FBC.NS_48E960D6B4C224DA34223648BCD0DC2F.Model'],
		   	stores: ['queryoutput.FBC.NS_48E960D6B4C224DA34223648BCD0DC2F.Store'],
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