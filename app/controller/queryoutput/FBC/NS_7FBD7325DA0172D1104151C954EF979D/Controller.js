Ext.define('Form.controller.queryoutput.FBC.NS_7FBD7325DA0172D1104151C954EF979D.Controller', {
   	extend: 'Ext.app.Controller',
   	views: ['queryoutput.FBC.NS_7FBD7325DA0172D1104151C954EF979D.View'],
   	models: ['queryoutput.FBC.NS_7FBD7325DA0172D1104151C954EF979D.Model'],
   	stores: ['queryoutput.FBC.NS_7FBD7325DA0172D1104151C954EF979D.Store'],
   		init: function() {
   			this.control({
   				'panel': {
   					render: this.initPanel
   				},
   				'NS_7FBD7325DA0172D1104151C954EF979D button': {
   					click: this.topBarButtonClicked
   				},
   				'NS_7FBD7325DA0172D1104151C954EF979D': {
   					afterrender: this.gridRenderingComplete,
   					select: this.gridRecordedSelected
   				}
   			})
   		},
   		initPanel: function(b) {

   		},
   		
			topBarButtonClicked: function(b) {
	   		if (b.action) {
   				if (b.action == 'Print') {
   				var dg = b.up('grid');
   				Ext.ux.grid.Printer.mainTitle = dg.title;
   				if (typeof GLOBAL_VARS_DIRECT !== 'undefined') {
   					Ext.ux.grid.Printer.bannerLogo = '<img src="' + GLOBAL_VARS_DIRECT.COMPANYLOGO + '" width="150" height="35" />';
   				}
   				Ext.ux.grid.Printer.print(dg);

	   		} else if (b.action == 'View') {
					
				var dw = Ext.create('Ext.window.Window', {
				    height: '90%',
				    width: 500,
				    layout: 'fit',
				    items: [{
				    	xtype: 'form',
				    	id: 'viewform8F1AB77A-0D1E-2737-D9F3C4B0D9E05DA5',
				    	autoScroll: true,
				    	items: [{
							width: '95%',name: 'eginpmsempopr-OPRCODE',
							fieldLabel: 'Overall Performance Rating Code',
							padding: 10,
						 	labelAlign: 'top',
						 	xtype: 'displayfield'
						},{
							width: '95%',name: 'eginpmsempopr-KRACODEFK',
							fieldLabel: 'KRA Code Fk',
							padding: 10,
						 	labelAlign: 'top',
						 	xtype: 'displayfield'
						},{
							width: '95%',name: 'eginpmsempopr-NAMEANDSIGOFEMPLOYEE',
							fieldLabel: 'Name and Signature of Employee',
							padding: 10,
						 	labelAlign: 'top',
						 	xtype: 'displayfield'
						},{
							width: '95%',name: 'eginpmsempopr-NAMEANDSIGDATE',
							fieldLabel: 'Date',
							padding: 10,
						 	labelAlign: 'top',
						 	xtype: 'displayfield'
						},{
							width: '95%',name: 'eginpmsempopr-HRADRECEIVEDBY',
							fieldLabel: 'Received By',
							padding: 10,
						 	labelAlign: 'top',
						 	xtype: 'displayfield'
						},{
							width: '95%',name: 'eginpmsempopr-HRADRECEIVEDBYDATE',
							fieldLabel: 'Received By Date',
							padding: 10,
						 	labelAlign: 'top',
						 	xtype: 'displayfield'
						},{
							width: '95%',name: 'eginpmsempopr-RATEDBY',
							fieldLabel: 'Rated By',
							padding: 10,
						 	labelAlign: 'top',
						 	xtype: 'displayfield'
						},{
							width: '95%',name: 'eginpmsempopr-RATEDBYDATE',
							fieldLabel: 'Date Rated',
							padding: 10,
						 	labelAlign: 'top',
						 	xtype: 'displayfield'
						},{
							width: '95%',name: 'eginpmsempopr-REVIEWEDBY',
							fieldLabel: 'Reviewed By',
							padding: 10,
						 	labelAlign: 'top',
						 	xtype: 'displayfield'
						},{
							width: '95%',name: 'eginpmsempopr-REVIEWEDBYDATE',
							fieldLabel: 'Date Reviewed',
							padding: 10,
						 	labelAlign: 'top',
						 	xtype: 'displayfield'
						},{
							width: '95%',name: 'eginpmsempopr-APPROVEDBY',
							fieldLabel: 'Approved By',
							padding: 10,
						 	labelAlign: 'top',
						 	xtype: 'displayfield'
						},{
							width: '95%',name: 'eginpmsempopr-APPROVEDBYDATE',
							fieldLabel: 'Date Approved',
							padding: 10,
						 	labelAlign: 'top',
						 	xtype: 'displayfield'
						},{
							width: '95%',name: 'eginpmsempopr-REMARKS',
							fieldLabel: 'Remarks',
							padding: 10,
						 	labelAlign: 'top',
						 	xtype: 'displayfield'
						},{
							width: '95%',name: 'eginpmsempopr-COMMENTSOFIMMEDSUP',
							fieldLabel: 'Comments of Immediate Supervisor',
							padding: 10,
						 	labelAlign: 'top',
						 	xtype: 'displayfield'
						},{
							width: '95%',name: 'eginpmsempkra-KRACODE',
							fieldLabel: 'KRA Code',
							padding: 10,
						 	labelAlign: 'top',
						 	xtype: 'displayfield'
						}]
				    }]
				}).show();
			
				var df = dw.down('form').getForm();
				var dgdata = b.up('grid').getSelectionModel().getSelection()[0].data;
				df.setValues(dgdata);

   			} else if (b.action == 'Add') {
				
				var fwin = Ext.create('Ext.window.Window', {
				    title: 'Add',
				    layout: {
				    	type: 'vbox',
				    	align: 'center'
				    },
				    height: '90%',
				    width: 580,
				    resizable: false,
				    items: [{
				    	xtype: 'form',
				    	width: '100%',
				    	flex: 1,
				    	autoScroll: true,
				    	items: [{
							width: '95%',name: 'eginpmsempopr-OPRCODE',
							fieldLabel: 'Overall Performance Rating Code',
							padding: 10,
						 	labelAlign: 'top',
						 	xtype: 'textfield'
						},{
							width: '95%',name: 'eginpmsempopr-KRACODEFK',
							fieldLabel: 'KRA Code Fk',
							padding: 10,
						 	labelAlign: 'top',
						 	xtype: 'textfield'
						},{
							width: '95%',name: 'eginpmsempopr-NAMEANDSIGOFEMPLOYEE',
							fieldLabel: 'Name and Signature of Employee',
							padding: 10,
						 	labelAlign: 'top',
						 	xtype: 'textfield'
						},{
							width: '95%',name: 'eginpmsempopr-NAMEANDSIGDATE',
							fieldLabel: 'Date',
							padding: 10,
						 	labelAlign: 'top',
						 	xtype: 'datefield'
						},{
							width: '95%',name: 'eginpmsempopr-HRADRECEIVEDBY',
							fieldLabel: 'Received By',
							padding: 10,
						 	labelAlign: 'top',
						 	xtype: 'textfield'
						},{
							width: '95%',name: 'eginpmsempopr-HRADRECEIVEDBYDATE',
							fieldLabel: 'Received By Date',
							padding: 10,
						 	labelAlign: 'top',
						 	xtype: 'datefield'
						},{
							width: '95%',name: 'eginpmsempopr-RATEDBY',
							fieldLabel: 'Rated By',
							padding: 10,
						 	labelAlign: 'top',
						 	xtype: 'textfield'
						},{
							width: '95%',name: 'eginpmsempopr-RATEDBYDATE',
							fieldLabel: 'Date Rated',
							padding: 10,
						 	labelAlign: 'top',
						 	xtype: 'datefield'
						},{
							width: '95%',name: 'eginpmsempopr-REVIEWEDBY',
							fieldLabel: 'Reviewed By',
							padding: 10,
						 	labelAlign: 'top',
						 	xtype: 'textfield'
						},{
							width: '95%',name: 'eginpmsempopr-REVIEWEDBYDATE',
							fieldLabel: 'Date Reviewed',
							padding: 10,
						 	labelAlign: 'top',
						 	xtype: 'datefield'
						},{
							width: '95%',name: 'eginpmsempopr-APPROVEDBY',
							fieldLabel: 'Approved By',
							padding: 10,
						 	labelAlign: 'top',
						 	xtype: 'textfield'
						},{
							width: '95%',name: 'eginpmsempopr-APPROVEDBYDATE',
							fieldLabel: 'Date Approved',
							padding: 10,
						 	labelAlign: 'top',
						 	xtype: 'datefield'
						},{
							width: '95%',name: 'eginpmsempopr-REMARKS',
							fieldLabel: 'Remarks',
							padding: 10,
						 	labelAlign: 'top',
						 	xtype: 'textfield'
						},{
							width: '95%',name: 'eginpmsempopr-COMMENTSOFIMMEDSUP',
							fieldLabel: 'Comments of Immediate Supervisor',
							padding: 10,
						 	labelAlign: 'top',
						 	xtype: 'textfield'
						},]
				    }],
				    buttons: [{
				    	text: 'Add',
				    	handler: function(em) {
				    		var dwin = em.up('window');
				    		var dform = dwin.down('form').getForm();
				    		var formValues = dform.getValues();
				    		if (dform.isValid()) {
				    			var dgrid = Ext.widget('NS_7FBD7325DA0172D1104151C954EF979D');
				    			console.log(formValues);
				    			dgrid.getStore().add(formValues);
				    			dwin.close();
				    		}
				    	}
				    },{
				    	text: 'Cancel',
				    	handler: function(em) {
				    		em.up('window').close();
				    	}
				    }]
				}).show();

		
   			} else if (b.action == 'Edit') {
				
	       	    Ext.Msg.alert('Message', 'To begin editing, please double click a row or a cell of a specific record.');
			
   			} else if (b.action == 'Copy') {
				
				var fwin = Ext.create('Ext.window.Window', {
				    title: 'Copy',
				    layout: {
				    	type: 'vbox',
				    	align: 'center'
				    },
				    height: '90%',
				    width: 580,
				    resizable: false,
				    items: [{
				    	xtype: 'form',
				    	width: '100%',
				    	flex: 1,
				    	autoScroll: true,
				    	items: [{
							width: '95%',name: 'eginpmsempopr-OPRCODE',
							fieldLabel: 'Overall Performance Rating Code',
							padding: 10,
						 	labelAlign: 'top',
						 	xtype: 'textfield'
						},{
							width: '95%',name: 'eginpmsempopr-KRACODEFK',
							fieldLabel: 'KRA Code Fk',
							padding: 10,
						 	labelAlign: 'top',
						 	xtype: 'textfield'
						},{
							width: '95%',name: 'eginpmsempopr-NAMEANDSIGOFEMPLOYEE',
							fieldLabel: 'Name and Signature of Employee',
							padding: 10,
						 	labelAlign: 'top',
						 	xtype: 'textfield'
						},{
							width: '95%',name: 'eginpmsempopr-NAMEANDSIGDATE',
							fieldLabel: 'Date',
							padding: 10,
						 	labelAlign: 'top',
						 	xtype: 'datefield'
						},{
							width: '95%',name: 'eginpmsempopr-HRADRECEIVEDBY',
							fieldLabel: 'Received By',
							padding: 10,
						 	labelAlign: 'top',
						 	xtype: 'textfield'
						},{
							width: '95%',name: 'eginpmsempopr-HRADRECEIVEDBYDATE',
							fieldLabel: 'Received By Date',
							padding: 10,
						 	labelAlign: 'top',
						 	xtype: 'datefield'
						},{
							width: '95%',name: 'eginpmsempopr-RATEDBY',
							fieldLabel: 'Rated By',
							padding: 10,
						 	labelAlign: 'top',
						 	xtype: 'textfield'
						},{
							width: '95%',name: 'eginpmsempopr-RATEDBYDATE',
							fieldLabel: 'Date Rated',
							padding: 10,
						 	labelAlign: 'top',
						 	xtype: 'datefield'
						},{
							width: '95%',name: 'eginpmsempopr-REVIEWEDBY',
							fieldLabel: 'Reviewed By',
							padding: 10,
						 	labelAlign: 'top',
						 	xtype: 'textfield'
						},{
							width: '95%',name: 'eginpmsempopr-REVIEWEDBYDATE',
							fieldLabel: 'Date Reviewed',
							padding: 10,
						 	labelAlign: 'top',
						 	xtype: 'datefield'
						},{
							width: '95%',name: 'eginpmsempopr-APPROVEDBY',
							fieldLabel: 'Approved By',
							padding: 10,
						 	labelAlign: 'top',
						 	xtype: 'textfield'
						},{
							width: '95%',name: 'eginpmsempopr-APPROVEDBYDATE',
							fieldLabel: 'Date Approved',
							padding: 10,
						 	labelAlign: 'top',
						 	xtype: 'datefield'
						},{
							width: '95%',name: 'eginpmsempopr-REMARKS',
							fieldLabel: 'Remarks',
							padding: 10,
						 	labelAlign: 'top',
						 	xtype: 'textfield'
						},{
							width: '95%',name: 'eginpmsempopr-COMMENTSOFIMMEDSUP',
							fieldLabel: 'Comments of Immediate Supervisor',
							padding: 10,
						 	labelAlign: 'top',
						 	xtype: 'textfield'
						},]
				    }],
				    buttons: [{
				    	text: 'Copy',
				    	handler: function(em) {
				    		var dwin = em.up('window');
				    		var dform = dwin.down('form').getForm();
				    		var formValues = dform.getValues();
				    		if (dform.isValid()) {
				    			var dgrid = Ext.widget('NS_7FBD7325DA0172D1104151C954EF979D');
				    			console.log(formValues);
				    			dgrid.getStore().add(formValues);
				    			dwin.close();
				    		}
				    	}
				    },{
				    	text: 'Cancel',
				    	handler: function(em) {
				    		em.up('window').close();
				    	}
				    }]
				}).show();

				var df = fwin.down('form').getForm();
				var dgdata = b.up('grid').getSelectionModel().getSelection()[0];
				if (dgdata) df.setValues(dgdata.data);
				else {
					Ext.Msg.alert('Message', 'No selection to copy.');
					fwin.close();
				}
			
   			} else if (b.action == 'Delete') {
					
	       		Ext.Msg.show({
	       			title: 'Delete Selected Record!',
	       			msg: 'This will permanently remove the selected record. Would you like to continue?',
	       			buttons: Ext.Msg.YESNOCANCEL,
		    	    icon: Ext.Msg.QUESTION,
		    	    fn: function(res, txt) {
		    	    	if (res == 'yes') {
		    	    		var dgrid = b.up('grid');
					    	var seldata = dgrid.getSelectionModel().getSelection();
					    	dgrid.getStore().remove(seldata);
		    	    	}
		    	    }
	       		});
			
   			} else if (b.action == 'Export') {
					
					var dgrid = b.up('grid');
					dgrid.getEl().mask('Exporting...');
					var qrytitle = 'Overall Performance Rating';
					var qrycode = '7FBD7325-DA01-72D1-104151C954EF979D';
					Ext.NS_7FBD7325DA0172D1104151C954EF979D.Data.exportGridToExcel(qrycode, qrytitle, function(res) {
						dgrid.getEl().unmask();
						if (res.result !== true) {
							Ext.Msg.alert('Error','A problem occurred while exporting the record to excel.');
						} else {
						 	window.location.href = 'http://localhost:8500/unDB/temp/' + qrytitle + '.xls';
						}
					});
		
   			} else if (b.action == 'Email') {
					
				var ewin = Ext.create('Ext.window.Window', {
				    title: 'Email',
				    layout: {
				    	type: 'fit'
				    },
				    width: 580,
				    modal: true,
				    autoScroll: true,
				    resizable: true,
				    items: [{
				    	xtype: 'form',
				    	width: '100%',
				    	height: 450,
				    	items: [{
							xtype: 'textfield',
							padding: 10,
							width: 540,
							allowBlank: false,
							fieldLabel: 'From',
							name: 'fromfield',
							vtype: 'email',
							readOnly: true,
							value: 'leonelllagumbay@gmail.com'
						},{
							xtype: 'textfield',
							fieldLabel: 'To',
							padding: 10,
							width: 540,
							name: 'tofield',
							allowBlank: false
						},{
							xtype: 'textfield',
							padding: 10,
							width: 540,
							allowBlank: false,
							name: 'subjectfield',
							fieldLabel: 'Subject'
						},{
							xtype: 'htmleditor',
							height: 250,
							name: 'bodyfield',
							enableFormat: false,
							enableLinks: false,
							enableLists: false
						}]
				    }],
				    buttons: [{
				    	text: 'Send',
				    	handler: function(em) {
				    		var dwin = em.up('window');
				    		var dform = dwin.down('form').getForm();
				    		var formValues = dform.getFieldValues();
				    		var fromv = formValues.fromfield;
				    		var tov = formValues.tofield;
				    		var subjectv = formValues.subjectfield;
				    		var bodyv = formValues.bodyfield;
				    		if (dform.isValid()) {
					    		dwin.getEl().mask('Sending...');
					    		Ext.NS_7FBD7325DA0172D1104151C954EF979D.Data.emailSelGridQuery(fromv,tov,subjectv,bodyv,function(res) {
					    			dwin.getEl().unmask();
					    			if (res.success !== true) {
					    				Ext.Msg.alert('Error','There is a problem servicing this request.');
					    			}
					    			dwin.close();
					    		});
				    		}
				    	}
				    },{
				    	text: 'Cancel',
				    	handler: function(em) {
				    		em.up('window').close();
				    	}
				    }]
				}).show();
				var dform = ewin.down('form');
				var dgrid = b.up('grid');
				if (typeof GLOBAL_VARS_DIRECT !== 'undefined') {
  						Ext.ux.grid.Printer.bannerLogo = '<img src="' + GLOBAL_VARS_DIRECT.COMPANYLOGO + '" width="150" height="35px" />';
  					}
				var dgridrecord = Ext.ux.grid.Printer.printToString(dgrid);
				var dgridtitle = dgrid.title;
				dform.getForm().setValues({bodyfield: dgridrecord, subjectfield: dgridtitle});
		
   			} else {
   					// do nothing here...
   			}
   			}
   		},
	
   		gridRenderingComplete: function(dis, eopts) {
   			var qc = '7FBD7325-DA01-72D1-104151C954EF979D';
   			Ext.NS_7FBD7325DA0172D1104151C954EF979D.Data.getUserToolbars(qc, function(res) {
   				if (res.success) {
   					dis.addDocked(res);
   				}
   			});
   		},
   		gridRecordedSelected: function(dis, rec, ind) {
   			var formCmp = Ext.getCmp('viewform8F1AB77A-0D1E-2737-D9F3C4B0D9E05DA5') || Ext.getCmp('autoeformididid');
   			if (formCmp) {
   				formCmp.getForm().setValues(rec.data);
   			}
   		}
})