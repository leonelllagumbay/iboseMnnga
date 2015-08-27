Ext.define('Form.controller.query.querydefinitioncontroller', {
    extend: 'Ext.app.Controller',
	views: [
        'query.querydefinitionView',
        'query.querydefinitionQueryDetailsView',
        'query.querydefinitionQueryDetailsChart',
        'query.querydefinitionQueryDetailsFeature',
        'query.querydefinitionQueryDetailsPlugin',
        'query.querydefinitionColumnListView',
        'query.querydefinitionColumnDetailsView',
        'query.querydefinitionPreviewView',
        'query.axisForm',
        'query.axisGrid',
        'query.axisWindow',
        'query.seriesForm',
        'query.seriesGrid',
        'query.seriesWindow',
        'query.assignUserWin',
        'query.assignUser',
        'query.assignUserRole'
    ],
	models: [
	    'query.managerModel',
	    'query.orderModel',
	    'form.columntypemodel',
	    'query.queryColumnNameModel',
	    'query.axisModel',
	    'query.seriesModel',
	    'form.userModel',
	    'form.rolemodel'
	],
	stores: [
	    'query.queryDefinitionStore',
	    'query.queryDefinitionColumnListStore',
	    'query.outputType',
	    'query.featureStore',
	    'query.pluginStore',
	    'query.yesno',
	    'query.orderStore',
	    'form.columntypestore',
	    'query.queryColumnNameStore',
	    'query.axisStore',
	    'query.seriesStore',
	    'query.axisTypeStore',
	    'query.seriesTypeStore',
	    'query.summarytype',
	    'form.fieldtypestore',
	    'file.userStore',
	    'form.rolestore',
	    'query.assignUserStore',
	    'query.assignUserRoleStore'
	],
	
	onLaunch: function() {
	    var ds = this.getQueryQueryColumnNameStoreStore();
	    ds.on('beforeload', this.columnStoreBeforeLoad);
	    
	    var ds = this.getQueryAssignUserStoreStore();
	    ds.on('beforeload', this.assignUserBeforeLoad);
	    
	    var ds = this.getQueryAssignUserRoleStoreStore();
	    ds.on('beforeload', this.assignUserBeforeLoad);
	},
	
	init: function() {
		this.control({
            
        	'button[action=generatequery]': {  
        		click: this.queryGenerate
			},
			'button[action=eraseequery]': {  
        		click: this.queryEraseCodes
			},
			'button[action=previewquery]': {  
        		click: this.previewQuery
			},
			'button[action=querylist]': {  
        		click: this.queryList
			},
			'querydefinitionpreviewview button[action=querylist]': {  
        		click: this.queryList
			},
			'querydefinitionpreviewview button[action=querydetails]': {  
        		click: this.queryDetails
			},
			'querydefinitionpreviewview button[action=querycolumnlist]': {  
        		click: this.queryColumnList
			},
			'querydefinitionpreviewview button[action=querycolumndefinition]': {  
        		click: this.queryColumnDefinition
			},
			'querydefinitioncolumndetailsview button[action=querycolumndefinition]': {  
        		click: this.queryColumnList
			},
			'querydefinitionview button[action=editdetails]': {  
        		click: this.queryDetails
			},
			'querydefinitionview button[action=showcolumns]': {  
        		click: this.queryColumnListFirst
			},
			'querydefinitioncolumnlistview button[action=columndefinition]': {  
        		click: this.queryColumnDefinition
			},
			'querydefinitioncolumndetailsview button[action=querycolumnlist]': {  
        		click: this.queryColumnList
			},
			'querydefinitionquerydetailsview button[action=save]': {
				click: this.saveQueryDetails
			},
			'querydefinitionquerydetailsview button[action=cancel]': {
				click: this.queryList
			},
			'querydefinitioncolumndetailsview button[action=save]': {
				click: this.saveColumnDetails
			},
			'querydefinitioncolumndetailsview button[action=cancel]': {
				click: this.queryColumnList
			},
			'querydefinitionquerydetailsview combobox[name=OUTPUTTYPE]': {
				change: this.outputTypeChange
			},
			'querydefinitionquerydetailsview combobox[name=FEATURES]': {
				change: this.featureChange
			},
			'querydefinitionquerydetailsview combobox[name=PLUGINS]': {
				change: this.pluginChange
			},
			'axisgrid button[action=addaxis]': {
				click: this.addAxis
			},
			'axisgrid button[action=editaxis]': {
				click: this.editAxis
			},
			'axisgrid button[action=deleteaxis]': {
				click: this.deleteAxis
			},
			'seriesgrid button[action=addseries]': {
				click: this.addSeries
			},
			'seriesgrid button[action=editseries]': {
				click: this.editSeries
			},
			'seriesgrid button[action=deleteseries]': {
				click: this.deleteSeries
			},
			'axisform button[action=add]': {
				click: this.submitAxis
			},
			'axisform button[action=save]': {
				click: this.updateAxis
			},
			'seriesform button[action=add]': {
				click: this.submitSeries
			},
			'seriesform button[action=save]': {
				click: this.updateSeries
			},
			'axisform combobox[name=AXISTYPE]': {
				change: this.chartAxisTypeChange
			},
			'seriesform combobox[name=TYPE]': {
				change: this.chartSeriesTypeChange
			},
			'axisform combobox[name=DUMMYFIELDS]': {
				select: this.setAxisFields
			},
			'seriesform combobox[name=XSERIESDUMMYFIELDS]': {
				select: this.setSeriesFields
			},
			'seriesform combobox[name=YSERIESDUMMYFIELDS]': {
				select: this.setSeriesFields
			},
			'querydefinitionview button[action=assignusers]': {
				click: this.assignUser
			},
			'assignuser button[action=assign]': {
				click: this.assignUserToQuery
			},
			'assignuserrole button[action=assign]': {
				click: this.assignUserToQuery
			},
			'assignuser button[action=undoassign]': {
				click: this.removeUserFromQuery
			},
			'assignuserrole button[action=undoassign]': {
				click: this.removeUserFromQuery
			}
		});
     },
     
     removeUserFromQuery: function(b) {
    	 var gobj = b.up("grid");
		 var gobjS = gobj.getStore();
		 if (gobj.getSelectionModel().hasSelection()) {
			 var r = gobj.getSelectionModel().getSelection();
			 if (r.length > 1) var us = "users.";
			 else var us = "user."
			 var cres = window.confirm("This action will unassign the selected " + us);
			 if (cres) gobjS.remove(r);
		 } else {
			 Ext.MessageBox.alert('No selection to remove!');
             return false;
		 }
	 },
     
     assignUserToQuery: function(btn) {
    	 
    	 var dgrid = btn.up('grid');
    	 var dtype = "user";
    	 var userpid = dgrid.down('combobox[name=USERNAME]');
    	 if (!userpid) {
    		 var userpid = dgrid.down('combobox[name=USERROLE]').getValue();
    		 dtype = "userrole";
    	 } else userpid = dgrid.down('combobox[name=USERNAME]').getValue();
    	 
    	 if (userpid.trim() == '') {
    		 return false;
    	 }	
    	 
    	 var qView = Ext.ComponentQuery.query("querydefinitionview")[0];
		 if (qView.getSelectionModel().hasSelection()) {
             var items = qView.getSelectionModel().getSelection();
             var fileids = [];
             for (var a = 0; a < items.length; a++) {
            	 fileids[a] = items[a].data.EQRYCODE;
             }
             if (userpid.length > 0) {
	             Ext.qd.OutputProcess.assignUserToQuery(fileids, userpid, dtype, function(result) {
	            	 var sg = dgrid.getStore();
	            	 sg.load();
	             });
             }
         } else {
             Ext.Msg.alert('Please select a query first.');
             return false;
         }
    	 
     },
     
     assignUser: function(b) {
		 var gobj = Ext.ComponentQuery.query("querydefinitionview")[0];
		 if (gobj.getSelectionModel().hasSelection()) {
			 var aswin = Ext.widget('assignuserwin');
			 aswin.down('assignuser').getStore().load();
			 aswin.down('assignuserrole').getStore().load();
			 aswin.show();
		 } else {
			 Ext.Msg.alert('Please select a record first!');
             return false;
		 }
	 },
     
     setSeriesFields: function(b) {
    	 var selectedField = b.getValue();
    	 var nm = b.actiontag;
    	 var dFieldCmp = Ext.ComponentQuery.query('seriesform textfield[name=' + nm + ']')[0];
    	 var dFieldOldValue = dFieldCmp.getValue().trim();
    	 if (dFieldOldValue != "") {
    		 dFieldOldValue = dFieldOldValue.replace(/^\['|^'\[|\[|^'/i, "");
    		 dFieldOldValue = dFieldOldValue.replace(/'\]$|\]'$|\]$|'$/i, "");
    		 dFieldCmp.setValue("['" + dFieldOldValue + "','" + selectedField + "']");
    	 } else {
    		 dFieldCmp.setValue(selectedField);
    	 }	 
     },
     
     setAxisFields: function(b) {
    	 var selectedField = b.getValue();
    	 var dFieldCmp = Ext.ComponentQuery.query('axisform textfield[name=FIELDS]')[0];
    	 var dFieldOldValue = dFieldCmp.getValue().trim();
    	 if (dFieldOldValue != "") {
    		 dFieldOldValue = dFieldOldValue.replace(/^\['|^'\[|\[|^'/i, "");
    		 dFieldOldValue = dFieldOldValue.replace(/'\]$|\]'$|\]$|'$/i, "");
    		 dFieldCmp.setValue("['" + dFieldOldValue + "','" + selectedField + "']");
    	 } else {
    		 dFieldCmp.setValue("['" + selectedField + "']");
    	 }
    	 
     },
     
     previewQuery: function(b) {
    	 var qryGrid = Ext.ComponentQuery.query('querydefinitionview')[0];
		 var querycode = qryGrid.getSelectionModel().getSelection()[0];
		 if(querycode) {
			 var openloc = "./myapps/queryoutput/" + GLOBAL_VARS_DIRECT["COMPANYCODE"].toUpperCase() + "/NS_" + querycode.data.EQRYCODE.toUpperCase().replace(/-/g, "") + "/index.cfm";
			 window.open(openloc, "iBOS/e eQuery Preview", "fullscreen=yes, channelmode=yes", "true");
	     } else {
	    	 Ext.Msg.alert("", "No item to preview.");
		 }
     },
     
     chartSeriesTypeChange: function(b, r) {
    	 var cNotGridAction = Ext.ComponentQuery.query('seriesform component[action~=area], component[action~=bar], component[action~=column], component[action~=gauge], component[action~=line], component[action~=pie], component[action~=radar], , component[action~=scatter]');
		 cNotGridAction.forEach(function(a, b) {
			 a.setVisible(false);
		 });
    	 
		 if (r) {
			 cNotGridAction = Ext.ComponentQuery.query('seriesform component[action~=' + r + ']');
    		 cNotGridAction.forEach(function(a, b) {
    			 a.setVisible(true);
    		 });
    	 }
     },
     
     chartAxisTypeChange: function(b, r) {
    	 var cNotGridAction = Ext.ComponentQuery.query('axisform component[action~=Numeric], component[action~=Category], component[action~=gauge], component[action~=Time], component[action~=Radial]');
		 cNotGridAction.forEach(function(a, b) {
			 a.setVisible(false);
		 });
    	 
		 if (r) {
			 cNotGridAction = Ext.ComponentQuery.query('axisform component[action~=' + r + ']');
    		 cNotGridAction.forEach(function(a, b) {
    			 a.setVisible(true);
    		 });
    	 }
     },
     
     
     updateSeries: function(b) {
      	var dform = b.up('form').getForm();
      	if(dform.isValid()) {
       		dform.submit({
   				waitMsg: 'Updating...',
   				timeout: 300000,
   				reset: true,
   			  		//Failure see app-wide error handler
   			  		success: function(form, action){
   			  			Ext.Msg.show({
   			  				msg: 'Done!',
   			  				buttons: Ext.Msg.OK
   			  			});
   			  			Ext.ComponentQuery.query('seriesgrid')[0].getStore().load();
   					}
   			});	
       	} else {
       		alert('Form has invalid value(s).');
       	}
      },
     
     updateAxis: function(b) {
     	var dform = b.up('form').getForm();
     	if(dform.isValid()) {
      		dform.submit({
  				waitMsg: 'Updating...',
  				timeout: 300000,
  				reset: true,
  			  		//Failure see app-wide error handler
  			  		success: function(form, action){
  			  			Ext.Msg.show({
  			  				msg: 'Done!',
  			  				buttons: Ext.Msg.OK
  			  			});
  			  			Ext.ComponentQuery.query('axisgrid')[0].getStore().load();
  					}
  			});	
      	} else {
      		alert('Form has invalid value(s).');
      	}
     },
     
     submitSeries: function(b) {
     	var dform = b.up('form').getForm();
     	dform.setValues({
      		CHARTSERIESCODE: ''
      	});
      	if(dform.isValid()) {
      		dform.submit({
  				waitMsg: 'Submitting...',
  				timeout: 300000,
  				reset: true,
  			  		//Failure see app-wide error handler
  			  		success: function(form, action){
  			  			Ext.Msg.show({
  			  				msg: 'Done!',
  			  				buttons: Ext.Msg.OK
  			  			});
  			  			Ext.ComponentQuery.query('seriesgrid')[0].getStore().load();
  					}
  			});	
      	} else {
      		alert('Form has invalid value(s).');
      	}
      },
     
     submitAxis: function(b) {
    	var dform = b.up('form').getForm();
    	dform.setValues({
     		CHARTAXISCODE: ''
     	});
     	if(dform.isValid()) {
     		dform.submit({
 				waitMsg: 'Submitting...',
 				timeout: 300000,
 				reset: true,
 			  		//Failure see app-wide error handler
 			  		success: function(form, action){
 			  			Ext.Msg.show({
 			  				msg: 'Done!',
 			  				buttons: Ext.Msg.OK
 			  			});
 			  			Ext.ComponentQuery.query('axisgrid')[0].getStore().load();
 					}
 			});	
     	} else {
     		alert('Form has invalid value(s).');
     	}
     },
     
     addAxis: function(b) {
    	var qryGrid = Ext.ComponentQuery.query('querydefinitionview')[0];
		var querycode = qryGrid.getSelectionModel().getSelection()[0];
    	 
    	var aw = Ext.widget('axiswindow');
    	var dform = aw.down('form');
    	dform.getForm().setValues({
     		CHARTAXISCODE: '',
     		EQRYCODEFK: querycode.data.EQRYCODE
     	});
    	
    	dform.down('button[action=save]').setVisible(false);
    	aw.show();
     },
     editAxis: function(b) {
    	 var ag = Ext.ComponentQuery.query('axisgrid')[0];
    	 var querysel = ag.getSelectionModel().getSelection()[0];
    	 var aw = Ext.widget('axiswindow');
    	 var dform = aw.down('form');
     	 dform.getForm().setValues(querysel.data);
    	 aw.show();
     },
     deleteAxis: function(b) {
    	 // What is the code
    	 var res = window.confirm('The selected axis will be deleted and will not be recovered!');
    	 if(res) {
	    	 var dtype = "chartaxis", dcode = '';
	    	 var g = b.up('grid');
	    	 g.getEl().mask("Removing...");
	    	 
	    	 dcode = g.getSelectionModel().getSelection()[0].data.CHARTAXISCODE;
	    	 Ext.qd.Chart.axisSeriesDelete(dtype, dcode, function(res) {
	    		 // log result here...
	    		 g.getStore().load();
	    		 g.getEl().unmask();
	    	 });
    	 }
     },
     addSeries: function(b) {
    	var qryGrid = Ext.ComponentQuery.query('querydefinitionview')[0];
 		var querycode = qryGrid.getSelectionModel().getSelection()[0];
     	 
     	var aw = Ext.widget('serieswindow');
     	var dform = aw.down('form');
     	dform.getForm().setValues({
      		CHARTSERIESCODE: '',
      		EQRYCODEFK: querycode.data.EQRYCODE
      	});
     	
     	dform.down('button[action=save]').setVisible(false);
     	aw.show();
     },
     editSeries: function(b) {
    	 var ag = Ext.ComponentQuery.query('seriesgrid')[0];
    	 var querysel = ag.getSelectionModel().getSelection()[0];
    	 var aw = Ext.widget('serieswindow');
    	 var dform = aw.down('form');
     	 dform.getForm().setValues(querysel.data);
    	 aw.show();
     },
     deleteSeries: function(b) { 
    	 // What is the code
    	 var res = window.confirm('The selected series will be deleted and will not be recovered!');
    	 if(res) {
	    	 var dtype = "chartseries", dcode = '';
	    	 var g = b.up('grid');
	    	 g.getEl().mask("Removing...");
	    	 
	    	 dcode = g.getSelectionModel().getSelection()[0].data.CHARTSERIESCODE;
	    	 Ext.qd.Chart.axisSeriesDelete(dtype, dcode, function(res) {
	    		 // log result here...
	    		 g.getStore().load();
	    		 g.getEl().unmask();
	    	 });
    	 }
     },
     
     pluginChange: function(dc, r, o) {
    	 var cNotGridAction = Ext.ComponentQuery.query('querydefinitionquerydetailsplugin component[action~=cellediting], component[action~=rowediting], component[action~=rowexpander], component[action~=bufferedrenderer]');
		 cNotGridAction.forEach(function(a, b) {
			 a.setVisible(false);
		 });
    	 
		 if (r) {
    		 cNotGridAction = Ext.ComponentQuery.query('querydefinitionquerydetailsplugin component[action~=' + r + ']');
    		 cNotGridAction.forEach(function(a, b) {
    			 a.setVisible(true);
    		 });
    	 } else {
    		 // ...
    	 }
     },
     
     featureChange: function(dc, r, o) {
    	 var cNotGridAction = Ext.ComponentQuery.query('querydefinitionquerydetailsfeature component[action~=summary], component[action~=grouping]');
		 cNotGridAction.forEach(function(a, b) {
			 a.setVisible(false);
		 });
    	 
		 if (r) {
    		 cNotGridAction = Ext.ComponentQuery.query('querydefinitionquerydetailsfeature component[action~=' + r + ']');
    		 cNotGridAction.forEach(function(a, b) {
    			 a.setVisible(true);
    		 });
    	 } else {
    		 // ...
    	 }
     },
     
     outputTypeChange: function(dc, r, o) {
    	 // find all non grid action to be hidden
    	 var dform = dc.up('form');
    	 var cNotGridAction = dform.query('component[action~=grid], component[action~=chart],component[action~=tree]');
		 Ext.suspendLayouts(); // It's useful to suspend the layout activity while updating multiple components and containers
    	 cNotGridAction.forEach(function(a, b) {
			 a.setVisible(false);
		 });
    	 if (r) {
    		 // find all r action to show
    		 cNotGridAction = dform.query('component[action~=' + r + ']');
    		 cNotGridAction.forEach(function(a, b) {
    			 a.setVisible(true);
    		 });
    	 }
    	 Ext.resumeLayouts(true);
     },
     
     assignUserBeforeLoad: function(s, a) {
    	 var qg = Ext.ComponentQuery.query('querydefinitionview')[0];
    	 var ds = qg.getSelectionModel().getSelection()[0];
    	 s.proxy.extraParams.querycode = ds.data.EQRYCODE;
    	 return true;
     },
     
     columnStoreBeforeLoad: function(s, a) {
    	 var qg = Ext.ComponentQuery.query('querydefinitionview')[0];
    	 var ds = qg.getSelectionModel().getSelection()[0];
    	 s.proxy.extraParams.equerycode = ds.data.EQRYCODE;
    	 return true;
     },
     
     saveQueryDetails: function(btn) {
    	var dform = btn.up('form').getForm();
    	if(dform.isValid()) {
    		dform.submit({
				waitMsg: 'Submitting...',
				timeout: 300000,
				reset: false,
			  		//Failure see app-wide error handler
			  		success: function(form, action){
			  			Ext.Msg.show({
			  				msg: 'Done!',
			  				buttons: Ext.Msg.OK
			  			});
					}
			});	
    	} else {
    		alert('Form has invalid value(s).');
    	}
     },
     
     saveColumnDetails: function(btn) {
     	var dform = btn.up('form').getForm();
     	if(dform.isValid()) {
     		dform.submit({
 				waitMsg: 'Sending, please wait...',
 				timeout: 300000,
 				reset: false,
 			  		//Failure see app-wide error handler
 			  		success: function(form, action){
 			  			Ext.Msg.show({
 			  				msg: 'Done!',
 			  				buttons: Ext.Msg.OK
 			  			});
 					}
 			});	
     	} else {
     		alert('Form has invalid value(s).');
     	}
     },
     
     queryEraseCodes: function(btn) {
    	 var qryGrid = Ext.ComponentQuery.query('querydefinitionview')[0];
		 var querycode = qryGrid.getSelectionModel().getSelection()[0];
		 var vp = btn.up('viewport');
		 
		 if(querycode) {
			 var myMask = Ext.create('Ext.LoadMask',{
					target: vp,
					msg: "Generating code, please wait..."
			 });
			 myMask.show();
			 Ext.qd.Preview.eraseQueryCodes(querycode.data.EQRYCODE,function(resp) {
				myMask.hide();
				if (!resp["success"]) Ext.Msg.alert("Response", resp["message"]);
			 });
	     } else {
	    	 Ext.Msg.alert("", "No query to erase.");
		 }
     },
     
     queryGenerate: function(btn) {
    	 var qryGrid = Ext.ComponentQuery.query('querydefinitionview')[0];
		 var querycode = qryGrid.getSelectionModel().getSelection()[0];
		 var vp = btn.up('viewport');
		 
		 if(querycode) {
			 var myMask = Ext.create('Ext.LoadMask',{
					target: vp,
					msg: "Generating code, please wait..."
			 });
			 myMask.show();
			 Ext.qd.Preview.generateOutput(querycode.data.EQRYCODE,function(resp) {
				myMask.hide();
				if (!resp["success"]) Ext.Msg.alert("Response", resp["message"]);
			 });
	     } else {
	    	 Ext.Msg.alert("", "No item to generate.");
		 }
     },
     
     queryList: function(btn) {
    	 var centerR = Ext.ComponentQuery.query('viewport panel[region=center], viewport')[0];
		 centerR.getLayout().setActiveItem(0);
     },
     queryDetails: function(btn) {
    	 var qryGrid = Ext.ComponentQuery.query('querydefinitionview')[0];
		 var querycode = qryGrid.getSelectionModel().getSelection()[0];
		 if(querycode) {
			 var qdetails = Ext.ComponentQuery.query('querydefinitionquerydetailsview')[0];
			 qdetails.setTitle("Query Details - " + querycode.data.EQRYNAME);
			 var dform = qdetails.getForm();
			 dform.reset();
			 dform.load({
				 params: {
					 querycode: querycode.data.EQRYCODE
				 }
			 });
			 
			 var axisStore = Ext.ComponentQuery.query('axisgrid')[0].getStore();
			 var seriesStore = Ext.ComponentQuery.query('seriesgrid')[0].getStore();
			 
			 axisStore.load({
				 params: {
					 querycode: querycode.data.EQRYCODE
				 }
			 });
			 
			 seriesStore.load({
				 params: {
					 querycode: querycode.data.EQRYCODE
				 }
			 });
			 
			 axisStore.proxy.extraParams.querycode = querycode.data.EQRYCODE;
			 seriesStore.proxy.extraParams.querycode = querycode.data.EQRYCODE;
			 
			 var centerR = Ext.ComponentQuery.query('viewport panel[region=center], viewport')[0];
			 centerR.getLayout().setActiveItem(1);
		 } else {
			 alert("No item to edit.");
		 }
     },
     
     queryColumnListFirst: function(btn) {
    	 
		 var qryGrid = Ext.ComponentQuery.query('querydefinitionview')[0];
		 var querycode = qryGrid.getSelectionModel().getSelection()[0];
		 if(querycode) {
			 querycode = querycode.data.EQRYCODE;
			 var clistStore = Ext.ComponentQuery.query('querydefinitioncolumnlistview')[0].getStore();
			 // clistStore.removeAll(); // remove
			 // clistStore.currentPage = 1; // back to page one -> resolves unreachable page
			 clistStore.load({
				 params: {
					 querycodefk: querycode
				 }
			 });
			 clistStore.proxy.extraParams.querycodefk = querycode;
			 var centerR = Ext.ComponentQuery.query('viewport panel[region=center], viewport')[0];
			 centerR.getLayout().setActiveItem(2);
		 } else {
			 alert("No reference query selected.");
		 }
     },
     queryColumnList: function(btn) {
    	 var centerR = Ext.ComponentQuery.query('viewport panel[region=center], viewport')[0];
		 centerR.getLayout().setActiveItem(2);
     },
     queryColumnDefinition: function(btn) {
    	 var qryGrid = Ext.ComponentQuery.query('querydefinitioncolumnlistview')[0];
		 var fieldcode = qryGrid.getSelectionModel().getSelection()[0];
		 if(fieldcode) {
			 var dform = Ext.ComponentQuery.query('querydefinitioncolumndetailsview')[0].getForm();
			 dform.reset();
			 dform.load({
				 params: {
					 fieldcode: fieldcode.data.EVIEWFIELDCODE
				 }
			 });
			 var centerR = Ext.ComponentQuery.query('viewport panel[region=center], viewport')[0];
			 centerR.getLayout().setActiveItem(3);
		 } else {
			 alert("No item to edit.");
		 }
     }
});