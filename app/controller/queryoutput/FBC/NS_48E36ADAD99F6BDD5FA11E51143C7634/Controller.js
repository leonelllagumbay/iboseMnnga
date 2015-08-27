Ext.define('Form.controller.queryoutput.FBC.NS_48E36ADAD99F6BDD5FA11E51143C7634.Controller', {
		   	extend: 'Ext.app.Controller',
		   	views: ['queryoutput.FBC.NS_48E36ADAD99F6BDD5FA11E51143C7634.View'],
		   	models: ['queryoutput.FBC.NS_48E36ADAD99F6BDD5FA11E51143C7634.Model'],
		   	stores: ['queryoutput.FBC.NS_48E36ADAD99F6BDD5FA11E51143C7634.Store'],
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