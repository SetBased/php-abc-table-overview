
function set_to_lower_case_no_accents(text){"use strict";function remove_accent(char){switch(char){case'à':case'á':case'â':case'ã':case'ä':case'å':return'a';case'æ':return'ae';case'ç':return'c';case'è':case'é':case'ê':case'ë':case'ě':case'ę':return'e';case'ð':return'd';case'ì':case'í':case'î':case'ï':return'i';case'ł':return'l';case'ñ':case'ń':case'ň':return'n';case'ò':case'ó':case'ô':case'õ':case'ö':case'ø':return'o';case'ù':case'ú':case'û':case'ü':return'u';case'ş':case'š':return's';case'ý':case'ÿ':return'y';case'ž':return'z';case'þ':return'th';case'ß':return'ss';default:return char;}}
if(text){return text.toLowerCase().replace(/./g,remove_accent);}
return text;}
function SET_OverviewTable($table){"use strict";var that=this;var i;this.$myTable=$table;$table.find('thead tr.filter').each(function(){$(this).css('display','table-row');});this.myColumnHandlers=[];var column_index=0;$table.find('thead tr.header').find('th').each(function(header_index,th){var attr;var classes;var span;that.myColumnHandlers[column_index]=null;attr=$(th).attr('class');classes=attr.split(' ');for(i=0;i<classes.length;i=i+1){if(classes[i].substr(0,10)==='data-type-'){var column_type=classes[i].substr(10);if(SET_OverviewTable.ourColumnTypeHandlers[column_type]){that.myColumnHandlers[column_index]=new SET_OverviewTable.ourColumnTypeHandlers[column_type]();}}}
if(!that.myColumnHandlers[column_index]){that.myColumnHandlers[column_index]=new SET_NoneColumnTypeHandler();}
that.myColumnHandlers[column_index].initFilter(that,$table,header_index,column_index);span=$(this).attr('colspan');if(span){column_index=column_index+parseFloat(span);}else{column_index=column_index+1;}});}
SET_OverviewTable.ourColumnTypeHandlers={};SET_OverviewTable.registerColumnTypeHandler=function(column_type,handler){"use strict";SET_OverviewTable.ourColumnTypeHandlers[column_type]=handler;};SET_OverviewTable.filterTrigger=function(event){"use strict";event.data.table.filter(event,event.data.element);};SET_OverviewTable.prototype.filter=function(){"use strict";var filters=[];var row_index;var i;for(i=0;i<this.myColumnHandlers.length;i=i+1){if(this.myColumnHandlers[i]&&this.myColumnHandlers[i].startFilter()){filters[i]=this.myColumnHandlers[i];}else{filters[i]=null;}}
if(filters.length===0){this.$myTable.children('tbody').children('tr').show();this.$myTable.children('tbody').children('tr:odd').removeClass('odd').addClass('even');this.$myTable.children('tbody').children('tr:even').removeClass('even').addClass('odd');}else{this.$myTable.children('tbody').children('tr').hide();row_index=0;this.$myTable.children('tbody').children('tr').each(function(){var i;var show=1;var $this=$(this);for(i=0;i<filters.length;i+=1){if(filters[i]&&!filters[i].simpleFilter(this.cells[i])){show=0;break;}}
if(show===1){$this.show();row_index=row_index+1;if((row_index%2)===1){$this.removeClass('even').addClass('odd');}else{$this.removeClass('odd').addClass('even');}}});}};SET_OverviewTable.prototype.getSortInfo=function(event,$table,$header,column_index){"use strict";var span;var ret={};var width_col1;var width_col2;var width_header;var diff;var x;span=$header.attr('colspan');if(!span||span==='1'){ret.infix='-';ret.colspan=1;ret.offset=0;}else if(span==='2'){if($header.hasClass('sort-1')&&$header.hasClass('sort-2')){x=event.pageX-$header.offset().left;width_col1=$table.find('tbody > tr:visible:first > td:eq('+column_index+')').outerWidth();width_col2=$table.find('tbody > tr:visible:first > td:eq('+(column_index+1)+')').outerWidth();width_header=$header.outerWidth();diff=width_header-width_col1-width_col2;if(x<((2*width_col1-diff)/2)){ret.infix='-1-';ret.colspan=2;ret.offset=0;}else if(x>((2*width_col1+diff)/2)){ret.infix='-2-';ret.colspan=2;ret.offset=1;}}else if($header.hasClass('sort-1')){ret.infix='-1-';ret.colspan=2;ret.offset=0;}else if($header.hasClass('sort-2')){ret.infix='-2-';ret.colspan=2;ret.offset=1;}}
return ret;};SET_OverviewTable.prototype.sortSingleColumn=function(event,$header,column,header_index,column_index){"use strict";var that=this;var info;var rows;var sort_direction;var $element;var i;info=this.getSortInfo(event,this.$myTable,$header,column_index);if(!info.infix){return;}
if(info.colspan===1){$element=$header;}else if(info.colspan===2){if(info.offset===0){$element=$header.children('span').first();}else if(info.offset===1){$element=$header;}}
if($element.hasClass('sorted-asc')){sort_direction=-1;}else{sort_direction=1;}
column_index=column_index+info.offset;rows=this.$myTable.children('tbody').children('tr').get();for(i=0;i<rows.length;i=i+1){var cell=rows[i].cells[column_index];rows[i].sortKey=column.getSortKey(cell);}
rows.sort(function(row1,row2){return sort_direction*column.compareSortKeys(row1,row2);});this.$myTable.children('tbody')[0].rows=[];var tbody=this.$myTable.children('tbody')[0];for(i=0;i<rows.length;i=i+1){rows[i].sortKey=null;tbody.appendChild(rows[i]);}
that.$myTable.children('thead').find('th').removeClass('sorted-asc').removeClass('sorted-desc');that.$myTable.children('thead').find('th > span').removeClass('sorted-asc').removeClass('sorted-desc');if(sort_direction===1){$element.addClass('sorted-asc');}else{$element.addClass('sorted-desc');}
var index=0;this.$myTable.children('tbody').children('tr').each(function(){var $this=$(this);if($this.css('display')!=='none'){if(((index+1)%2)===1){$this.removeClass('even').addClass('odd');}else{$this.removeClass('odd').addClass('even');}
index=index+1;}});};SET_OverviewTable.ourTables=[];SET_OverviewTable.registerTable=function(selector){"use strict";$(selector).each(function(){var $this=$(this);if($this.is('table')){SET_OverviewTable.ourTables[SET_OverviewTable.ourTables.length]=new SET_OverviewTable($this);}else{$this.find('table').each(function(){SET_OverviewTable.ourTables[SET_OverviewTable.ourTables.length]=new SET_OverviewTable($(this));});}});};function SET_NoneColumnTypeHandler(){"use strict";}
SET_NoneColumnTypeHandler.prototype.startFilter=function(){"use strict";return false;};SET_NoneColumnTypeHandler.prototype.initFilter=function(overview_table,$table,header_index,column_index){"use strict";var $cell;$cell=$table.children('thead').find('tr.filter').find('td').eq(header_index);$cell.html('');$cell.width($cell.css('width'));};SET_OverviewTable.registerColumnTypeHandler('none',SET_NoneColumnTypeHandler);function SET_NumericColumnTypeHandler(){"use strict";}
SET_NumericColumnTypeHandler.prototype=SET_TextColumnTypeHandler.prototype;SET_NumericColumnTypeHandler.prototype.getSortKey=function(table_cell){"use strict";var exp;exp=/[\d\.,\-\+]/g;return parseInt(exp.exec($(table_cell).text()).replace(',','.'),10);};SET_NumericColumnTypeHandler.prototype.compareSortKeys=function(row1,row2){"use strict";if(row1.sortKey===row2.sortKey){return 0;}
if(row1.sortKey===""&&!isNaN(row2.sortKey)){return-1;}
if(row2.sortKey===""&&!isNaN(row1.sortKey)){return 1;}
return row1.sortKey-row2.sortKey;};SET_OverviewTable.registerColumnTypeHandler('numeric',SET_NumericColumnTypeHandler);function SET_TextColumnTypeHandler(){"use strict";this.$myInput=null;this.myFilterValue=null;}
SET_TextColumnTypeHandler.prototype.startFilter=function(){"use strict";this.myFilterValue=this.$myInput.val();return(this.myFilterValue!=='');};SET_TextColumnTypeHandler.prototype.simpleFilter=function(table_cell){"use strict";var value;value=this.extractForFilter(table_cell);return(value.indexOf(this.myFilterValue)!==-1);};SET_TextColumnTypeHandler.prototype.initFilter=function(overview_table,$table,header_index,column_index){"use strict";var that=this;var $header;this.$myInput=$table.children('thead').find('tr.filter').find('td').eq(header_index).find('input');this.$myInput.val('');this.$myInput.keyup(function(event){if(event.keyCode===27){that.$myInput.val('');}},SET_OverviewTable.filterTrigger);this.$myInput.keyup({table:overview_table,element:this.$myInput},SET_OverviewTable.filterTrigger);$header=$table.children('thead').find('tr.header').find('th').eq(header_index);if($header.hasClass('sort')||$header.hasClass('sort-1')||$header.hasClass('sort-2')){$header.click(function(event){overview_table.sortSingleColumn(event,$header,that,header_index,column_index);});}
this.$myInput.width(this.$myInput.closest('td').width()-
parseInt(this.$myInput.css('margin-left'),10)-
parseInt(this.$myInput.css('border-left-width'),10)-
parseInt(this.$myInput.css('border-right-width'),10)-
parseInt(this.$myInput.css('margin-right'),10));this.$myInput.css('visibility','visible');};SET_TextColumnTypeHandler.prototype.extractForFilter=function(table_cell){"use strict";return set_to_lower_case_no_accents($(table_cell).text());};SET_TextColumnTypeHandler.prototype.getSortKey=function(table_cell){"use strict";return set_to_lower_case_no_accents($(table_cell).text());};SET_TextColumnTypeHandler.prototype.compareSortKeys=function(row1,row2){"use strict";if(row1.sortKey<row2.sortKey){return-1;}
if(row1.sortKey>row2.sortKey){return 1;}
return 0;};SET_OverviewTable.registerColumnTypeHandler('text',SET_TextColumnTypeHandler);SET_OverviewTable.registerColumnTypeHandler('email',SET_TextColumnTypeHandler);