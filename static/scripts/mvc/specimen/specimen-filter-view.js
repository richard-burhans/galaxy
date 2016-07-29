define(["mvc/specimen/specimen-model","mvc/ui/ui-modal","layout/masthead","utils/utils","libs/toastr"],function(){var a=Backbone.View.extend({el:"#center",events:{"click #btn_toggle_filter":"toggleFilter","click #btn_clear_filter":"clearFilter","keyup #filter_family":"applyFilter","keyup #filter_barcode":"applyFilter","change #filter_state":"applyFilter","change #filter_type_1":"applyFilter","change #filter_type_2":"applyFilter","change #filter_type_3":"applyFilter"},initialize:function(){},render:function(){var a=this.templateFilter();this.$el.html(a())},toggleFilter:function(a){a.preventDefault(),$("#filter_form").slideToggle(),$("#btn_apply_filter").fadeToggle(),$("#btn_clear_filter").fadeToggle();var b=$("#btn_toggle_filter");b.text("Show Filter"===b.text()?"Hide Filter":"Show Filter")},clearFilter:function(){$("#filter_family").val(""),$("#filter_barcode").val(""),$("#filter_state").val(null),Galaxy.specimens.galaxySpecimenView.render()},applyFilter:function(){var a=$("#filter_family").val(),b=$("#filter_barcode").val(),c=$("#filter_state").val(),d=$("#filter_type_1").val(),e=$("#filter_type_2").val(),f=$("#filter_type_3").val(),g=Galaxy.specimens.galaxySpecimenView.collection;null!==g?(""!==a&&(g=g.filter(function(b){return b.get("sample_data").family===a})),""!==b&&(g=g.filter(function(a){return a.get("bar_code")===b})),null!==c&&c.length>0&&(g=g.filter(function(a){return-1!==jQuery.inArray(a.get("sample_data").state,c)})),null!==d&&d.length>0&&(g=g.filter(function(a){var b=a.get("sample_data").type;if(null!==b&&"undefined"!=typeof a.get("sample_data").type){var c=a.get("sample_data").type.split("-");return-1!==jQuery.inArray(c[0],d)}return!1})),null!==e&&e.length>0&&(g=g.filter(function(a){var b=a.get("sample_data").type;if(null!==b&&"undefined"!=typeof a.get("sample_data").type){var c=a.get("sample_data").type.split("-");return c.length>1?-1!==jQuery.inArray(c[1],e):!1}return!1})),null!==f&&f.length>0&&(g=g.filter(function(a){var b=a.get("sample_data").type;if(null!==b&&"undefined"!=typeof a.get("sample_data").type){var c=a.get("sample_data").type.split("-");return c.length>2?-1!==jQuery.inArray(c[2],f):!1}return!1})),g.length<Galaxy.specimens.galaxySpecimenView.collection.length?Galaxy.specimens.galaxySpecimenView.render(g):Galaxy.specimens.galaxySpecimenView.render()):Galaxy.specimens.galaxySpecimenView.render()},templateFilter:function(){return tmpl_array=[],tmpl_array.push('<div id="filter_container" style="width: 90%; margin: auto; margin-top:2em; overflow: auto !important; ">'),tmpl_array.push('   <button type="button" id="btn_toggle_filter" class="btn btn-primary" style="width: 86px; ">Show Filter</button>'),tmpl_array.push('   <button type="button" id="btn_clear_filter" class="btn btn-warning" style="display: none; ">Clear Filter</button>'),tmpl_array.push("         <hr/>"),tmpl_array.push('         <div id="filter_form" style="display:none; margin-top:0.5em; ">'),tmpl_array.push("         <div>"),tmpl_array.push('           <form class="form-inline" role="form">'),tmpl_array.push('            <div class="form-group">'),tmpl_array.push('              <input id="filter_family" type="text" class="form-control" placeholder="family">'),tmpl_array.push("            </div>"),tmpl_array.push('            <div class="form-group">'),tmpl_array.push('              <input id="filter_barcode" type="text" class="form-control" placeholder="barcode">'),tmpl_array.push("            </div>"),tmpl_array.push('               <div class="form-group">'),tmpl_array.push('                   <select id="filter_state" multiple class="form-control">'),tmpl_array.push("                       <option>new</option>"),tmpl_array.push("                       <option>onroad</option>"),tmpl_array.push("                       <option>psu</option>"),tmpl_array.push("                       <option>depleted</option>"),tmpl_array.push("                       <option>lost</option>"),tmpl_array.push("                       <option>discarded</option>"),tmpl_array.push("                   </select>"),tmpl_array.push("               </div>"),tmpl_array.push('               <div class="form-group">'),tmpl_array.push('                   <select id="filter_type_1" multiple class="form-control">'),tmpl_array.push("                       <option>blood</option>"),tmpl_array.push("                       <option>buccal</option>"),tmpl_array.push("                       <option>hair</option>"),tmpl_array.push("                       <option>breastmilk</option>"),tmpl_array.push("                       <option>stool</option>"),tmpl_array.push("                       <option>vaginal_swab</option>"),tmpl_array.push("                       <option>placenta</option>"),tmpl_array.push("                       <option>cord_blood</option>"),tmpl_array.push("                       <option>tissue</option>"),tmpl_array.push("                       <option>rectal_swab</option>"),tmpl_array.push("                       <option>skin_swab</option>"),tmpl_array.push("                   </select>"),tmpl_array.push("               </div>"),tmpl_array.push('               <div class="form-group">'),tmpl_array.push('                   <select id="filter_type_2" multiple style="height:42px;" class="form-control" size="2">'),tmpl_array.push("                       <option>dna</option>"),tmpl_array.push("                       <option>rna</option>"),tmpl_array.push("                   </select>"),tmpl_array.push("               </div>"),tmpl_array.push('               <div class="form-group">'),tmpl_array.push('                   <select id="filter_type_3" multiple style="height:63px;" class="form-control" size="3">'),tmpl_array.push("                       <option>library</option>"),tmpl_array.push("                       <option>amplicon</option>"),tmpl_array.push("                       <option>enriched_mtdna</option>"),tmpl_array.push("                   </select>"),tmpl_array.push("               </div>"),tmpl_array.push("           </form>"),tmpl_array.push("         </div>"),tmpl_array.push("         <hr/>"),tmpl_array.push("         </div>"),tmpl_array.push('         <div id="specimens_element">'),tmpl_array.push("         </div>"),tmpl_array.push("         </div>"),_.template(tmpl_array.join(""))}});return{FilterView:a}});
//# sourceMappingURL=../../../maps/mvc/specimen/specimen-filter-view.js.map