//=================================panel操作================================
//改变panel大小
function resizePanel(_width,_height,region){
	if(_width==0 || _width=="auto")
	{_width="100%";}
	if(_height==0 || _height=="auto")
	{_height="100%";}
	$("body").layout('panel',region).panel('resize',{height:_height,width:_width});
	$("body").layout('resize');
}
//=================================左侧菜单==================================
//向左侧区域添加一个菜单
function ui_CreatAccordion(_title,_content,_iconCls){
	$("#LeftAccordion").accordion('add',{
			title:_title,
			iconCls:_iconCls,
			content:_content
	});
}
//=================================tabs选项卡================================
//向内容区域增加一个选项卡
function ui_CreatTabs(_title,_href){
	if(!$("#MainTabs").tabs("exists",_title))
	{
		$("#MainTabs").tabs('add',{
			title:_title,
			content:ui_creatFrame(_href),
			closable:true,
			fit:true,
			border:false,
			tools:[{
				iconCls:'icon-mini-refresh',
				handler:function(){refreshTabs();}
				  }]
		});
	}
	else
	{$("#MainTabs").tabs('select',_title);}
}
//刷新指定的选项卡
function refreshTabs(){
	var _selectedTtab=$("#MainTabs").tabs('getSelected');
	var _src=$(_selectedTtab.panel('options').content).attr('src');
	console.log(_src);
	$("#MainTabs").tabs('update',{
		tab:_selectedTtab,
		options:{content:ui_creatFrame(_src)}
	});
}
//更换一个选项卡的图标
function changeIconTabs(tabName,iconCls){
	var _selectedTtab=$("#MainTabs").tabs('getTab',tabName);
	$("#MainTabs").tabs('update',{
		tab:_selectedTtab,
		options:{iconCls:iconCls}
	});
}
//关闭一个选项卡
function closeTabs(tabsTitle){
	$("#MainTabs").tabs('close',tabsTitle);
}
//创建iframe区域
function ui_creatFrame(url){
	var _str='<iframe scrolling="auto" frameborder="0"  src="'+url+'" style="width:100%;height:100%;"></iframe>';
	return _str; 
}