Ext.define('Form.controller.queryoutput.FBC.NS_48EEEE46C0A6E173B1716BA745E11F06.Controller', {
		   	extend: 'Ext.app.Controller',
		   	views: ['queryoutput.FBC.NS_48EEEE46C0A6E173B1716BA745E11F06.View'],
		   	models: ['queryoutput.FBC.NS_48EEEE46C0A6E173B1716BA745E11F06.Model'],
		   	stores: ['queryoutput.FBC.NS_48EEEE46C0A6E173B1716BA745E11F06.Store'],
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