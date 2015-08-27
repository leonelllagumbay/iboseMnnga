Ext.define('Form.controller.queryoutput.FBC.NS_7640CD87E6104BF5DE19E74C6011E564.Controller', {
   	extend: 'Ext.app.Controller',
   	views: ['queryoutput.FBC.NS_7640CD87E6104BF5DE19E74C6011E564.View'],
   	models: ['queryoutput.FBC.NS_7640CD87E6104BF5DE19E74C6011E564.Model'],
   	stores: ['queryoutput.FBC.NS_7640CD87E6104BF5DE19E74C6011E564.Store'],
   		init: function() {
   			this.control({
   				'panel': {
   					render: this.initPanel
   				},
   				'NS_7640CD87E6104BF5DE19E74C6011E564 button': {
   					click: this.topBarButtonClicked
   				},
   				'NS_7640CD87E6104BF5DE19E74C6011E564': {
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
					var EGRGTEMPLATETEMPLATETYPE = Ext.create('Ext.data.Store', {fields: ['displayname', 'codename'],autoLoad: false,listeners: {beforeload: function(thiss,operation,eopts) {var theValue = new Array();var dependCol = ' ';if(dependCol != ' ') {dependCol = dependCol.split(',');for(thecntr=0;thecntr<dependCol.length;thecntr++) {var specCol = dependCol[thecntr];var resultQuery = eForm.query('field[name$=' + specCol + ']');if(resultQuery[0].inputValue) {var resultQueryB = eForm.query('field[name$=' + specCol + '][checked=true]');theValue.push(resultQueryB[0].inputValue);} else {theValue.push(resultQuery[0].value);}}thiss.proxy.extraParams.columnDependValues = theValue.toString();} else {return true;}}},pageSize: 30,proxy: {type: 'direct',timeout: 300000,extraParams: {tablename: 'EGRGOBJECTTYPE',columnDisplay: 'OBJECTNAME',columnValue: 'OBJECTID',columnDepends: ' ',columnDependValues: ' ',columnOrder: ' '},directFn: 'Ext.ss.lookup.formQueryLookup',paramOrder: ['limit', 'page', 'query', 'start', 'tablename', 'columnDisplay', 'columnValue','columnDepends','columnDependValues','columnOrder'],reader: {root: 'topics',totalProperty: 'totalCount'}}}); var eForm = Ext.create('Ext.form.Panel',{padding: '2 2 2 2', baseParams: {comments: ''},	items: [{xtype:'panel',  collapsible: true,margin: '10 10 10 10',title: ' ', defaultType: 'textfield', defaults: {anchor: '100%'}, layout: 'anchor', width: '100%', items :[
{xtype: 'textfield',//used to convert to display field
fieldLabel: 'Template Code',  name: 'G__EGRGTEMPLATE__TEMPLATECODE',
x: 5, y: 35, anchor: '50%', hidden: false,
labelAlign: 'left', labelWidth: 160,
allowBlank: false, cls: ' ',
disabled: false,
width: 200,
minLength: 0,
maxLength: 50,
margin: '0 0 0 0',
padding: '5 5 5 5',
border: ' ',
style: { }, id: 'FB7FC284-EB0A-3754-ABAA9A63DBBF9266',readOnly: false,value: '',

fieldStyle: ' '
}
,
{xtype: 'textfield',//used to convert to display field
 fieldLabel: 'Description', name: 'G__EGRGTEMPLATE__DESCRIPTION',
 x: 5, y: 65, anchor: '50%', hidden: false, labelAlign: 'left',
 labelWidth: 160,
 allowBlank: true,
 cls: ' ',
 disabled: false, width: 200, minLength: 0, maxLength: 200,
 margin: '0 0 0 0',
 padding: '5 5 5 5',
 border: ' ', style: { }, id: 'FB7FC415-0323-42A8-A684D40CF7AE5CB8',readOnly: false,
 value: '',  fieldStyle: ' '
 }
,{xtype: 'combobox', displayField: 'displayname',valueField: 'codename',queryMode: 'remote',store: EGRGTEMPLATETEMPLATETYPE,minChars: 1, pageSize: 30,fieldLabel: 'Type',name: 'G__EGRGTEMPLATE__TEMPLATETYPE',x: 5, y: 95, anchor: '50%', hidden: false,  labelAlign: 'left',labelWidth: 160, allowBlank: false,cls: ' ', disabled: false,width: 200,minLength: 0,maxLength: 50,margin: '0 0 0 0',padding: '5 5 5 5',border: ' ',style: { }, id: 'FB7FC518-FBE9-3A48-05216F5C7C3260DA',readOnly: false,value: '',fieldStyle: ' '},{xtype: 'textareafield',fieldLabel: 'Body', name: 'G__EGRGTEMPLATE__TEMPLATEBODY',x: 5, y: 125, anchor: '97%', hidden: false, labelAlign: 'left',labelWidth: 160, allowBlank: true, cls: ' ', disabled: false,height: 700, width: 200, minLength: 0,maxLength: 2147483647,margin: '0 0 0 0',padding: '5 5 5 5',border: ' ',style: { }, id: 'FB7FC7B8-DA49-9917-54DD03E68F85470A',readOnly: false,value: '',fieldStyle: ' '}, {xtype: 'hiddenfield',name: 'withFile',value: 'false' },{xtype: 'hiddenfield',name: 'fileCount',value: '0'},{xtype: 'hiddenfield',fieldLabel: '__APPROVED',disabled: true,name: 'G__EGRGTEMPLATE__APPROVED',width: 200},{xtype: 'hiddenfield',fieldLabel: '__EFORMID',disabled: true,name: 'G__EGRGTEMPLATE__EFORMID',width: 200},{xtype: 'hiddenfield',fieldLabel: '__PROCESSID',disabled: true,name: 'G__EGRGTEMPLATE__PROCESSID',width: 200},{xtype: 'hiddenfield',fieldLabel: '__ACTIONBY',disabled: true,name: 'G__EGRGTEMPLATE__ACTIONBY',width: 200},{xtype: 'hiddenfield',fieldLabel: '__PERSONNELIDNO',disabled: true,name: 'G__EGRGTEMPLATE__PERSONNELIDNO',width: 200},{xtype: 'datefield',fieldLabel: '__RECDATECREATED',disabled: true,hidden: true, name: 'G__EGRGTEMPLATE__RECDATECREATED',submitFormat: 'Y-n-j', width: 200},{xtype: 'datefield',fieldLabel: '__DATEACTIONWASDONE',disabled: true,hidden: true, name: 'G__EGRGTEMPLATE__DATEACTIONWASDONE',submitFormat: 'Y-n-j', width: 200},{xtype: 'datefield',fieldLabel: '__DATELASTUPDATE',disabled: true,hidden: true, name: 'G__EGRGTEMPLATE__DATELASTUPDATE',submitFormat: 'Y-n-j', width: 200}  ] } ],listeners: {beforeaction: function(thiss, action) { var win = eForm.up('window'); var commentfield = win.down('textfield[name=commentsxxx]'); var commentValue = commentfield.getValue(); eForm.getForm().baseParams.comments = commentValue;}}, 
alias: 'widget.eFormForm',id:'autoeformididid',buttonAlign: 'left',
width: '100%',
height: '100%',autoScroll: true,defaults: {anchor: '100%'},
defaultType: 'textfield'});var dw = Ext.create('Ext.window.Window', {
				width: '100%',
				height: '100%',
				layout: 'fit',
				items: eForm
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
							width: '95%',name: 'cbr201-CASUALMONTHS',
							fieldLabel: 'Y',
							padding: 10,
						 	labelAlign: 'top',
						 	xtype: 'textfield'
						}]
				    }],
				    buttons: [{
				    	text: 'Add',
				    	handler: function(em) {
				    		var dwin = em.up('window');
				    		var dform = dwin.down('form').getForm();
				    		var formValues = dform.getValues();
				    		if (dform.isValid()) {
				    			var dgrid = Ext.widget('NS_7640CD87E6104BF5DE19E74C6011E564');
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
							width: '95%',name: 'cbr201-CASUALMONTHS',
							fieldLabel: 'Y',
							padding: 10,
						 	labelAlign: 'top',
						 	xtype: 'textfield'
						}]
				    }],
				    buttons: [{
				    	text: 'Copy',
				    	handler: function(em) {
				    		var dwin = em.up('window');
				    		var dform = dwin.down('form').getForm();
				    		var formValues = dform.getValues();
				    		if (dform.isValid()) {
				    			var dgrid = Ext.widget('NS_7640CD87E6104BF5DE19E74C6011E564');
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
					var qrytitle = 'Possible actions';
					var qrycode = '7640CD87-E610-4BF5-DE19E74C6011E564';
					Ext.NS_7640CD87E6104BF5DE19E74C6011E564.Data.exportGridToExcel(qrycode, qrytitle, function(res) {
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
					    		Ext.NS_7640CD87E6104BF5DE19E74C6011E564.Data.emailSelGridQuery(fromv,tov,subjectv,bodyv,function(res) {
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
   			var qc = '7640CD87-E610-4BF5-DE19E74C6011E564';
   			Ext.NS_7640CD87E6104BF5DE19E74C6011E564.Data.getUserToolbars(qc, function(res) {
   				if (res.success) {
   					dis.addDocked(res);
   				}
   			});
   		},
   		gridRecordedSelected: function(dis, rec, ind) {
   			var formCmp = Ext.getCmp('viewform78CD2145-E64F-09FD-A3FB8C0E3159DD87') || Ext.getCmp('autoeformididid');
   			if (formCmp) {
   				formCmp.getForm().setValues(rec.data);
   			}
   		}
})