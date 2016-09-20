define(["mvc/specimen/specimen-model","mvc/specimen/specimen-filter-view","mvc/ui/ui-modal","layout/masthead","utils/utils","libs/toastr"],function(a,b,c,d,e,f){var g=Backbone.View.extend({el:"#specimens_element",events:{"click tr":"rowClicked"},modal:null,collection:null,initialize:function(){this.modal=Galaxy.modal,this.collection=new a.Specimens,this.fetchCollection()},fetchCollection:function(){var a=this;this.collection.fetch({success:function(b){a.render(b.models)},error:function(a,b){403===b.statusCode().status?f.info("You don't have proper role to access the specimens within this project."):f.error("An error occured. Please try again.")}})},render:function(a){var b=this.templateSpecimenList(),c=null;null!==this.collection&&"undefined"==typeof a?c=this.collection.models:null!==a&&(c=a),$("#center").css("overflow","auto"),this.setElement($("#specimens_element")),this.$el.html(b({specimens:c}))},rowClicked:function(a){var b=$(a.target.parentElement).data("id");Galaxy.specimens.specimenRouter.navigate("specimens/"+b,{trigger:!0,replace:!0})},renderModalForSpecimen:function(a){var b=this,c=this.templateSpecimenDetailModal();this.modal.show({closing_events:!0,height:"600px",title:"Specimen details",closing_callback:function(){Galaxy.specimens.specimenRouter.navigate("/",{trigger:!1,replace:!0})},body:c({specimen:b.collection.get(a)}),buttons:{"Save modifications":function(){b.saveModification(a)},"Cancel modifications":function(){b.cancelModification(a)},Modify:function(){b.enableSpecimenModification(a)},Close:function(){b.modal.hide()}}}),this.modal.hideButton("Save modifications"),this.modal.hideButton("Cancel modifications")},saveModification:function(a){var b=this.collection.get(a),c=b.get("sample_data");c.state=c.state===$("#input_data_state").text()?c.state:$("#input_data_state").val();var d=[];d[0]=$("#input_data_type_1").val(),d[1]=$("#input_data_type_2").val(),d[2]=$("#input_data_type_3").val(),c.type=b.serializeType(d);var e=[];e[0]=$("#input_data_location_fridge").val(),e[1]=$("#input_data_location_shelf").val(),e[2]=$("#input_data_location_rack").val(),e[3]=$("#input_data_location_box").val(),e[4]=$("#input_data_location_spot_1").val(),e[5]=$("#input_data_location_spot_2").val(),c.location=b.serializeLocation(e),c.note=c.note===$("#input_data_note").val()?c.note:$("#input_data_note").val(),c.participant_relationship=c.participant_relationship===$("#input_data_participant_relationship").val()?c.participant_relationship:$("#input_data_participant_relationship").val(),c.sex=c.sex===$("#input_data_sex").val()?c.sex:$("#input_data_sex").val(),c.family=c.family===$("#input_data_family").val()?c.family:$("#input_data_family").val(),c.participant_dob=c.participant_dob===$("#picker_participant_dob").val()?c.participant_dob:$("#picker_participant_dob").val(),c.date_sent=c.date_sent===$("#picker_date_sent").val()?c.date_sent:$("#picker_date_sent").val(),c.date_of_collection=c.date_of_collection===$("#picker_date_of_collection").val()?c.date_of_collection:$("#picker_date_of_collection").val(),c.genotype_flag=$("#specimen_data_genotype_flag").hasClass("data-generated")?!0:!1,c.haplotype_flag=$("#specimen_data_haplotype_flag").hasClass("data-generated")?!0:!1,c.sanger_seq_flag=$("#specimen_data_sanger_seq_flag").hasClass("data-generated")?!0:!1,c.ngs_seg_flag=$("#specimen_data_ngs_seg_flag").hasClass("data-generated")?!0:!1,c.dd_pcr_flag=$("#specimen_data_dd_pcr_flag").hasClass("data-generated")?!0:!1;var g=this;b.save({sample_data:c},{patch:!0,success:function(){f.success("Saved"),$(".data-existence").off("click",g.toggle_data_presence),g.renderModalForSpecimen(a),g.render()},error:function(){f.error("An error occured while saving. Please try again.")}})},cancelModification:function(a){this.renderModalForSpecimen(a),$(".data-existence").off("click",this.toggle_data_presence)},toggle_data_presence:function(a){var b=$(a.target);b.hasClass("data-not-generated")?(b.removeClass("data-not-generated"),b.addClass("data-generated")):(b.addClass("data-not-generated"),b.removeClass("data-generated"))},enableSpecimenModification:function(a){this.modal.showButton("Save modifications"),this.modal.showButton("Cancel modifications"),this.modal.hideButton("Modify"),$(".data-existence").on("click",this.toggle_data_presence).addClass("data-modification");var b=this.collection.get(a),c=this.templateStateOptions(),d='<select id="input_data_state" class="form-control">'+c()+"</select>";$("#specimen_state").html(d),$("#input_data_state").val(b.get("sample_data").state);var e=b.get("sample_data").type,f=[];"undefined"!=typeof e&&null!==e&&e.length>0&&(f=b.getParsedType(e));var c=this.templateTypeOptions(),d=c();$("#specimen_type").html(d),f.length>0&&$("#input_data_type_1").val(f[0]),f.length>1&&$("#input_data_type_2").val(f[1]),f.length>2&&$("#input_data_type_3").val(f[2]);var g=b.get("sample_data").location;if("undefined"!=typeof g&&null!==g&&g.length>0)var h=b.getParsedLocation();var c=this.templateLocationOptions();$("#specimen_location").html(c()),"undefined"!=typeof h&&5===h.length&&($("#input_data_location_fridge").val(h[0]),$("#input_data_location_shelf").val(h[1]),$("#input_data_location_rack").val(h[2]),$("#input_data_location_box").val(h[3]),$("#input_data_location_spot_1").val(h[4].slice(0,1)[0]),$("#input_data_location_spot_2").val(h[4].slice(1,2)[0]));var d='<textarea id="input_data_note" type="text" class="form-control" placeholder="note" rows="2">';$("#specimen_note").html(d),$("#input_data_note").val(b.get("sample_data").note);var c=this.templateDatePicker();$("#specimen_data_date_of_collection").html(c({input_id:"picker_date_of_collection"})),$("#specimen_data_participant_dob").html(c({input_id:"picker_participant_dob"})),$("#specimen_data_date_sent").html(c({input_id:"picker_date_sent"})),$("#picker_date_of_collection").datepicker("update",b.get("sample_data").date_of_collection),$("#picker_participant_dob").datepicker("update",b.get("sample_data").participant_dob),$("#picker_date_sent").datepicker("update",b.get("sample_data").date_sent),$(".input-group.date").datepicker({todayBtn:"linked",autoclose:!0,todayHighlight:!0});var i=b.get("sample_data").participant_relationship,d='<input id="input_data_participant_relationship" type="text" class="form-control" placeholder="relationship">';$("#specimen_data_participant_relationship").html(d),void 0!==typeof i&&$("#input_data_participant_relationship").val(i);var j=b.get("sample_data").sex,d='<input id="input_data_sex" type="text" class="form-control" placeholder="sex">';$("#specimen_data_sex").html(d),void 0!==typeof j&&$("#input_data_sex").val(j);var k=b.get("sample_data").family,d='<input id="input_data_family" type="text" class="form-control" placeholder="family">';$("#specimen_data_family").html(d),void 0!==typeof k&&$("#input_data_family").val(k)},templateDatePicker:function(){var a=[];return a.push('<div class="input-group date">'),a.push('<input id="<%= input_id %>" type="text" class="form-control"><span class="input-group-addon"><i class="fa fa-calendar"></i></span>'),a.push("</div>"),_.template(a.join(""))},templateLocationOptions:function(){var a=[];return a.push('<form class="form-inline" role="form">'),a.push('<div class="form-group">'),a.push('<input id="input_data_location_fridge" type="text" class="form-control" placeholder="fridge">'),a.push("</div>"),a.push('<div class="form-group">'),a.push('<input id="input_data_location_shelf" type="text" class="form-control" placeholder="shelf">'),a.push("</div>"),a.push('<div class="form-group">'),a.push('<input id="input_data_location_rack" type="text" class="form-control" placeholder="rack">'),a.push("</div>"),a.push('<div class="form-group">'),a.push('<input id="input_data_location_box" type="text" class="form-control" placeholder="box">'),a.push("</div>"),a.push('spot: <div class="form-group">'),a.push('<select id="input_data_location_spot_1" class="form-control">'),a.push('   <option value="none"></option>'),a.push('   <option value="A">A</option>'),a.push('   <option value="B">B</option>'),a.push('   <option value="C">C</option>'),a.push('   <option value="D">D</option>'),a.push('   <option value="E">E</option>'),a.push('   <option value="F">F</option>'),a.push('   <option value="G">G</option>'),a.push('   <option value="H">H</option>'),a.push('   <option value="I">I</option>'),a.push("</select>"),a.push("</div>"),a.push('<div class="form-group">'),a.push('<select id="input_data_location_spot_2" class="form-control">'),a.push('   <option value="none"></option>'),a.push('   <option value="1">1</option>'),a.push('   <option value="2">2</option>'),a.push('   <option value="3">3</option>'),a.push('   <option value="4">4</option>'),a.push('   <option value="5">5</option>'),a.push('   <option value="6">6</option>'),a.push('   <option value="7">7</option>'),a.push('   <option value="8">8</option>'),a.push('   <option value="9">9</option>'),a.push("</select>"),a.push("</div>"),a.push("</form>"),_.template(a.join(""))},templateTypeOptions:function(){var a=[];return a.push('<form class="form-inline" role="form">'),a.push('<div class="form-group">'),a.push('<select id="input_data_type_1" class="form-control">'),a.push('   <option value="none"></option>'),a.push('   <option value="blood">blood</option>'),a.push('   <option value="buccal">buccal</option>'),a.push('   <option value="hair">hair</option>'),a.push('   <option value="breastmilk">breastmilk</option>'),a.push('   <option value="stool">stool</option>'),a.push('   <option value="vaginal_swab">vaginal_swab</option>'),a.push('   <option value="placenta">placenta</option>'),a.push('   <option value="cord_blood">cord_blood</option>'),a.push('   <option value="tissue">tissue</option>'),a.push("</select>"),a.push("</div>"),a.push('<div class="form-group">'),a.push('<select id="input_data_type_2" class="form-control">'),a.push('   <option value="none"></option>'),a.push('   <option value="dna">dna</option>'),a.push('   <option value="rna">rna</option>'),a.push("</select>"),a.push("</div>"),a.push('<div class="form-group">'),a.push('<select id="input_data_type_3" class="form-control">'),a.push('   <option value="none"></option>'),a.push('   <option value="amplicon">amplicon</option>'),a.push('   <option value="library">library</option>'),a.push('   <option value="enriched_mtdna">enriched_mtdna</option>'),a.push("</select>"),a.push("</div>"),a.push("</form>"),_.template(a.join(""))},templateStateOptions:function(){var a=[];return a.push('<option value="new">new</option>'),a.push('<option value="onroad">onroad</option>'),a.push('<option value="psu">psu</option>'),a.push('<option value="depleted">depleted</option>'),a.push('<option value="lost">lost</option>'),a.push('<option value="discarded">discarded</option>'),_.template(a.join(""))},templateSpecimenDetailModal:function(){var a=[];return a.push("<div>"),a.push('   <table class="specimen-modal-table table table-striped table-condensed">'),a.push('   <% if (specimen.get("sample_data").family) { %>'),a.push("       <tr>"),a.push('           <th scope="row">family</th>'),a.push('           <td id="specimen_data_family"><%= _.escape(specimen.get("sample_data").family) %></td>'),a.push("       </tr>"),a.push("   <% } %>"),a.push('   <% if (specimen.get("sample_data").participant_relationship) { %>'),a.push("       <tr>"),a.push('           <th scope="row">participant_relationship</th>'),a.push('           <td id="specimen_data_participant_relationship"><%= _.escape(specimen.get("sample_data").participant_relationship) %></td>'),a.push("       </tr>"),a.push("   <% } %>"),a.push('   <% if (specimen.get("sample_data").sex) { %>'),a.push("       <tr>"),a.push('           <th scope="row">sex</th>'),a.push('           <td id="specimen_data_sex"><%= _.escape(specimen.get("sample_data").sex) %></td>'),a.push("       </tr>"),a.push("   <% } %>"),a.push("       <tr>"),a.push('           <th scope="row">state</th>'),a.push('           <td id="specimen_state"><%= _.escape(specimen.get("sample_data").state) %></td>'),a.push("       </tr>"),a.push("       <tr>"),a.push('           <th scope="row">type</th>'),a.push('           <td id="specimen_type"><%= _.escape(specimen.get("sample_data").type) %></td>'),a.push("       </tr>"),a.push('   <% if (specimen.get("sample_data").location) { %>'),a.push("       <tr>"),a.push('           <th scope="row">location</th>'),a.push('           <td id="specimen_location"><%= _.escape(specimen.get("sample_data").location) %></td>'),a.push("       </tr>"),a.push("   <% } %>"),a.push('   <% if (specimen.get("sample_data").parent_id) { %>'),a.push("       <tr>"),a.push('           <th scope="row">derivate of</th>'),a.push('           <td><a title="Click to see the closest ancestor" href="#specimens/<%- specimen.get("sample_data").parent_id %>"><%= _.escape(specimen.get("sample_data").parent_id) %></a></td>'),a.push("       </tr>"),a.push("   <% } %>"),a.push('   <% if (specimen.get("sample_data").note) { %>'),a.push("       <tr>"),a.push('           <th scope="row">note</th>'),a.push('           <td id="specimen_note"><%= _.escape(specimen.get("sample_data").note) %></td>'),a.push("       </tr>"),a.push("   <% } %>"),a.push('   <% if (specimen.get("sample_data").date_sent) { %>'),a.push("       <tr>"),a.push('           <th scope="row">date_sent</th>'),a.push('           <td id="specimen_data_date_sent"><%= _.escape(specimen.get("sample_data").date_sent) %></td>'),a.push("       </tr>"),a.push("   <% } %>"),a.push('   <% if (specimen.get("sample_data").date_of_collection) { %>'),a.push("       <tr>"),a.push('           <th scope="row">date_of_collection</th>'),a.push('           <td id="specimen_data_date_of_collection"><%= _.escape(specimen.get("sample_data").date_of_collection) %></td>'),a.push("       </tr>"),a.push("   <% } %>"),a.push('   <% if (specimen.get("sample_data").participant_dob) { %>'),a.push("       <tr>"),a.push('           <th scope="row">participant_dob</th>'),a.push('           <td id="specimen_data_participant_dob"><%= _.escape(specimen.get("sample_data").participant_dob) %></td>'),a.push("       </tr>"),a.push("   <% } %>"),a.push("       <tr>"),a.push('           <th scope="row">generated_data</th>'),a.push("           <td>"),a.push('              <% if (specimen.get("sample_data").genotype_flag === true) { %>'),a.push('              <span id="specimen_data_genotype_flag" class="data-existence data-generated">'),a.push("              <% } else { %>"),a.push('              <span id="specimen_data_genotype_flag" class="data-existence data-not-generated">'),a.push("              <% } %>"),a.push("              GEN"),a.push("              </span>"),a.push('              <% if (specimen.get("sample_data").haplotype_flag === true) { %>'),a.push('              <span id="specimen_data_haplotype_flag" class="data-existence data-generated">'),a.push("              <% } else { %>"),a.push('              <span id="specimen_data_haplotype_flag" class="data-existence data-not-generated">'),a.push("              <% } %>"),a.push("              HAP"),a.push("              </span>"),a.push('              <% if (specimen.get("sample_data").sanger_seq_flag === true) { %>'),a.push('              <span id="specimen_data_sanger_seq_flag" class="data-existence data-generated">'),a.push("              <% } else { %>"),a.push('              <span id="specimen_data_sanger_seq_flag" class="data-existence data-not-generated">'),a.push("              <% } %>"),a.push("              SGR"),a.push("              </span>"),a.push('              <% if (specimen.get("sample_data").ngs_seg_flag === true) { %>'),a.push('              <span id="specimen_data_ngs_seg_flag" class="data-existence data-generated">'),a.push("              <% } else { %>"),a.push('              <span id="specimen_data_ngs_seg_flag" class="data-existence data-not-generated">'),a.push("              <% } %>"),a.push("              NGS"),a.push("              </span>"),a.push('              <% if (specimen.get("sample_data").dd_pcr_flag === true) { %>'),a.push('              <span id="specimen_data_dd_pcr_flag" class="data-existence data-generated">'),a.push("              <% } else { %>"),a.push('              <span id="specimen_data_dd_pcr_flag" class="data-existence data-not-generated">'),a.push("              <% } %>"),a.push("              PCR"),a.push("              </span>"),a.push("           </td>"),a.push("       </tr>"),a.push("       <tr>"),a.push('           <th scope="row">create_time</th>'),a.push('           <td><%= _.escape(specimen.get("create_time")) %></td>'),a.push("       </tr>"),a.push("       <tr>"),a.push('           <th scope="row">update_time</th>'),a.push('           <td><%= _.escape(specimen.get("update_time")) %></td>'),a.push("       </tr>"),a.push("       <tr>"),a.push('           <th scope="row">barcode</th>'),a.push('           <td><%= _.escape(specimen.get("bar_code")) %></td>'),a.push("       </tr>"),a.push("       <tr>"),a.push('           <th scope="row">ID</th>'),a.push('           <td><%= _.escape(specimen.get("id")) %></td>'),a.push("       </tr>"),a.push("   </table>"),a.push("</div>"),a.push("<div>"),a.push('   <% if (specimen.get("lineage_path")) { %>'),a.push("       <h5>Lineage</h5>"),a.push('       <ol class="breadcrumb">'),a.push('           <% _.each(specimen.get("lineage_path"), function(id, index) { %>'),a.push('           <% if (specimen.get("id") != id) { %>'),a.push("               <li>"),a.push('                   <a title="Go to this specimen" href="#/specimens/<%- id %>">ancestor (distance <% print( specimen.get("lineage_path").length - index -1 ) %>)</a>'),a.push("               </li>"),a.push("           <% } %>"),a.push("           <% }); %>"),a.push("           </ol>"),a.push("   <% } %>"),a.push("</div>"),_.template(a.join(""))},templateSpecimenList:function(){return tmpl_array=[],tmpl_array.push("   <% if (specimens !== null) { %>"),tmpl_array.push("   <div>"),tmpl_array.push("   Showing <%= specimens.length %> specimens."),tmpl_array.push("   </div>"),tmpl_array.push('   <table class="specimen-table table table-condensed">'),tmpl_array.push("   <thead>"),tmpl_array.push('     <th style="width: 3em;">fam</th>'),tmpl_array.push('     <th style="width: 3em;">rel</th>'),tmpl_array.push('     <th style="width: 3em;">sex</th>'),tmpl_array.push('     <th style="width: 5em;">state</th>'),tmpl_array.push('     <th style="width: 14em;">type</th>'),tmpl_array.push('     <th style="width: 24em;">location</th>'),tmpl_array.push('     <th style="width: 5em;">collected</th>'),tmpl_array.push('     <th style="width: 3em;">derivate</th>'),tmpl_array.push("     <th>note</th>"),tmpl_array.push("   </thead>"),tmpl_array.push("   <tbody>"),tmpl_array.push("       <% _.each(specimens, function(specimen) { %>"),tmpl_array.push('           <tr data-id="<%= _.escape(specimen.id) %>">'),tmpl_array.push('               <td><%- specimen.get("sample_data").family %></td>'),tmpl_array.push('               <td><%- specimen.get("sample_data").participant_relationship %></td>'),tmpl_array.push('               <td><%- specimen.get("sample_data").sex %></td>'),tmpl_array.push('               <td><%= _.escape(specimen.get("sample_data").state) %></td>'),tmpl_array.push('               <td><%= _.escape(specimen.get("sample_data").type) %></td>'),tmpl_array.push('               <td><%= _.escape(specimen.get("sample_data").location) %></td>'),tmpl_array.push('               <td><%= _.escape(specimen.get("sample_data").date_of_collection) %></td>'),tmpl_array.push("               <td>"),tmpl_array.push('                   <% if (specimen.get("sample_data").parent_id != null) { %>'),tmpl_array.push("                   yes"),tmpl_array.push("                   <% } else { %>"),tmpl_array.push("                   no"),tmpl_array.push("                   <% } %>"),tmpl_array.push("               </td>"),tmpl_array.push('               <td><%= _.escape(specimen.get("sample_data").note) %></td>'),tmpl_array.push("           </tr>"),tmpl_array.push("       <% }); %>"),tmpl_array.push("   </tbody>"),tmpl_array.push("   </table>"),tmpl_array.push("   <% } else { %>"),tmpl_array.push("       <span>No data received</span>"),tmpl_array.push("   <% }%>"),_.template(tmpl_array.join(""))}});return{GalaxySpecimenView:g}});
//# sourceMappingURL=../../../maps/mvc/specimen/specimen-list-view.js.map