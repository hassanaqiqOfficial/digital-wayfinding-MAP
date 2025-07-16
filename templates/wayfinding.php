<!DOCTYPE html>
<html>
    <head>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" crossorigin="anonymous">
        <link rel="stylesheet" href="//code.jquery.com/ui/1.13.1/themes/base/jquery-ui.css">
        <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
        <script src="https://code.jquery.com/ui/1.13.1/jquery-ui.js"></script>
    </head>

    <style>
      .card{
        max-width: none;
        margin-top: 10px !important;
      }
      .remove_btn {
        float: right;
        margin-top: 127px !important;
        background-color : #f6f6f6
      !important;
        border-color : #dae0e5 !important;
        color : #212529 !important;
      }
      .remove_btn:hover {
        background-color : #EDEDEF
      !important;
        border-color : #c5c5c5 !important;
        color : #212529 !important;
      }
      #add_more_button {
      background-color: #f8f9fa !important;
      border-color: #c5c5c5 !important;
      }
      #add_more_button:hover {
      background-color: #EDEDEF !important;
      border-color: #c5c5c5 !important;
      }
    </style>

<body>



    <div class="card">
      <div class="card-body">

        <h5 class="card-title">Add WayFinding</h5>

        <hr class="solid">

          <form method="POST" action="admin.php?page=update_wayfinding<?=$condition = $wayfinding->id > 0 ? "&&action=update&& id=".$wayfinding->id : '&&action=add'; ?>" enctype="multipart/form-data">

            <div class="row">

              <div class="col-md-9 col-lg-9 col-sm-12 col-xs-12">



                <div class="form-group row">

                  <label for="inputtitle" class="col-md-2 col-lg-2 col-form-label">Title <span class="text-danger">*</span></label>

                  <div class="col-md-6 col-lg-6">

                    <input type="text" name="title" class="form-control" value="<?=$wayfinding->title;?>" required id="inputtitle" placeholder="Title">

                  </div>

                </div>  



                <div class="form-group row">

                  <label for="filterlabel" class="col-md-2 col-lg-2 col-form-label">Filter Label <span class="text-danger">*</span></label>

                  <div class="col-md-6 col-lg-6">

                    <input type="text" name="filter_label" class="form-control" value="<?=$wayfinding->filter_label;?>" required id="filterlabel" placeholder="Filter Label">

                  </div>

                </div>



                <div class="form-group row">

                  <label for="pdflabel" class="col-md-2 col-lg-2 col-form-label">PDF Label <span class="text-danger">*</span></label>

                  <div class="col-md-6 col-lg-6">

                    <input type="text" name="pdf_label" class="form-control" value="<?=$wayfinding->pdf_label;?>" required id="pdflabel" placeholder="PDF Label">

                  </div>

                </div>

              </div>

            </div>

            

            <div class="row">

              <div class="col-md-6 col-lg-6 col-sm-12 col-xs-12">

                <div class="form-group">

                  <label for="upperlevelpdf">Upper Level PDF <span class="text-danger">*</span></label>

                  <input type="file" name="upper_level_pdf" class="form-control" <?=$condition = $wayfinding->id > 0 ? " " : "required"; ?> id="upperlevelpdf" >
                  <?php if($wayfinding->upper_level_pdf != ""){ ?>
                    <input type="hidden" name="upper_level_pdf" value="<?=$wayfinding->upper_level_pdf;?>">
                    <span>
                        <i class="fa fa-arrow-right"></i>
                        <a href="<?=$wayfinding->upper_level_pdf;?>" target="blank">UPPER LEVEL PDF</a>
                    </span>
                  <?php } ?>
                  </br>
                  <span>

                      One file only.</br>

                      32 MB limit.</br>

                      Allowed types: pdf.

                  </span>
               
                </div>

                <div class="form-group">

                  <label for="lowerlevelpdf">Lower Level PDF <span class="text-danger">*</span></label>

                  <input type="file" name="lower_level_pdf" class="form-control" <?=$condition = $wayfinding->id > 0 ? " " : "required"; ?> id="lowerlevelpdf" >
                  <?php if($wayfinding->lower_level_pdf != ""){ ?>
                    <input type="hidden" name="lower_level_pdf" value="<?=$wayfinding->lower_level_pdf;?>">
                    <span>
                        <i class="fa fa-arrow-right"></i>
                        <a href="<?=$wayfinding->lower_level_pdf;?>" target="blank">LOWER LEVEL PDF</a>
                    </span>
                  <?php } ?>
                  </br>
                  <span>

                      One file only.</br>

                      32 MB limit.</br>

                      Allowed types: pdf.

                  </span>
                  
                </div>

              </div>

              <div class="col-md-12 col-lg-12 col-sm-12 col-xs-12">
                 
                  <div class="form-group">



                    <div class="card" style="padding:unset !important;">
                      <div class="card-header">
                        Airlines
                      </div>
                      <div class="card-body">

                          <div class="accordion" id="accordion">

                            <?php 
                                if($wayfinding->airlines != ''){
                                  $addMoreValue = count($wayfinding->airlines) + 1;                          
                                  foreach($wayfinding->airlines as $key =>  $airline){

                            ?>

                            <h3><?=$airline->airline_name;?></h3>
                            <div>
                              <div class="row">
                                <div class="col-md-6 col-lg-6 col-sm-12">
                                  <label for="airline-name">Airline Name <span class="text-danger">*</span></label>
                                  <input type="text" name="field_name[<?=$key;?>][airline_name]" value="<?=$airline->airline_name;?>" required class="form-control" placeholder="Airline Name">
                                </div>
                                <div class="col-md-6 col-lg-6 col-sm-12">
                                  &nbsp;
                                </div>
                                <div class="col-md-6 col-lg-6 col-sm-12">
                                  <label for="airline-name">Concourses <span class="text-danger">*</span></label></br>
                                  <label for="airline-name"><input type="checkbox" name="field_name[<?=$key;?>][Concourse][]" value="A" <?php if(in_array('A',$airline->Concourse)){ echo 'checked'; } ?>  class="form-control">A</label></br>
                                  <label for="airline-name"><input type="checkbox" name="field_name[<?=$key;?>][Concourse][]" value="B" <?php if(in_array('B',$airline->Concourse)){ echo 'checked'; } ?> class="form-control">B</label></br>
                                  <label for="airline-name"><input type="checkbox" name="field_name[<?=$key;?>][Concourse][]" value="C" <?php if(in_array('C',$airline->Concourse)){ echo 'checked'; } ?> class="form-control">C</label></br>
                                  <label for="airline-name"><input type="checkbox" name="field_name[<?=$key;?>][Concourse][]" value="D" <?php if(in_array('D',$airline->Concourse)){ echo 'checked'; } ?> class="form-control">D</label></br>
                                  <label for="airline-name"><input type="checkbox" name="field_name[<?=$key;?>][Concourse][]" value="E" <?php if(in_array('E',$airline->Concourse)){ echo 'checked'; } ?> class="form-control">E</label>
                                </div>
                                <div class="col-md-6 col-lg-6 col-sm-12">
                                  <button type="button" class="btn btn-primary btn-sm remove_btn" onclick="removeAccordion(this)">Remove</button>
                                </div>
                              </div>
                            </div>
                            
                            <?php } }else{ ?>
                            
                              <h3>Airline</h3>
                              <div>
                                <div class="row">
                                  <div class="col-md-6 col-lg-6 col-sm-12">
                                    <label for="airline-name">Airline Name <span class="text-danger">*</span></label>
                                    <input type="text" name="field_name[0][airline_name]" value="" required class="form-control" placeholder="Airline Name">
                                  </div>
                                  <div class="col-md-6 col-lg-6 col-sm-12">
                                    &nbsp;
                                  </div>
                                  <div class="col-md-6 col-lg-6 col-sm-12">
                                    <label for="airline-name">Concourses <span class="text-danger">*</span></label></br>
                                    <label for="airline-name"><input type="checkbox" name="field_name[0][Concourse][]" value="1"  class="form-control">A</label></br>
                                    <label for="airline-name"><input type="checkbox" name="field_name[0][Concourse][]" value="2"  class="form-control">B</label></br>
                                    <label for="airline-name"><input type="checkbox" name="field_name[0][Concourse][]" value="3"  class="form-control">C</label></br>
                                    <label for="airline-name"><input type="checkbox" name="field_name[0][Concourse][]" value="4"  class="form-control">D</label></br>
                                    <label for="airline-name"><input type="checkbox" name="field_name[0][Concourse][]" value="5"  class="form-control">E</label>
                                  </div>
                                  <div class="col-md-6 col-lg-6 col-sm-12">
                                    <button type="button" class="btn btn-primary btn-sm remove_btn" onclick="removeAccordion(this)">Remove</button>
                                  </div>
                                </div>
                              </div>
                              
                            <?php } ?>

                          </div>

                          <button type="button" name="add_airline" id="add_more_button" class="btn btn-light mt-2" value="<?=$value = $wayfinding->airlines != '' ? $addMoreValue : 2 ;?>" onclick="loadAccordion(this.value)">Add Airline</button>
                      </div>
                    </div> 
                    
                    

                  </div>


                  <input type="submit" name="submit" class="btn btn-primary" value="Submit">
              </div>

            </div>



          </form>



      </div>

    </div>

   


<script type="text/javascript">

    function loadAccordion(index){

      var index = parseInt(index);
      var fieldIndex = parseInt(index - 1);
      var addMoreValue = parseInt(index + 1);
      var html = '<h3>Airline</h3>'+
                  '<div>'+
                      '<div class="row">'+
                        '<div class="col-md-6 col-lg-6 col-sm-12">'+
                          '<label for="airline-name">Airline Name <span class="text-danger">*</span></label>'+
                          '<input type="text" name="field_name['+fieldIndex+'][airline_name]" value="" required class="form-control" placeholder="Airline Name">'+
                        '</div>'+
                        '<div class="col-md-6 col-lg-6 col-sm-12">'+
                          '&nbsp;'+
                        '</div>'+
                        '<div class="col-md-6 col-lg-6 col-sm-12">'+
                          '<label for="airline-name">Concourses <span class="text-danger">*</span></label></br>'+
                          '<label for="airline-name"><input type="checkbox" name="field_name['+fieldIndex+'][Concourse][]" value="1"  class="form-control">A</label></br>'+
                          '<label for="airline-name"><input type="checkbox" name="field_name['+fieldIndex+'][Concourse][]" value="2"  class="form-control">B</label></br>'+
                          '<label for="airline-name"><input type="checkbox" name="field_name['+fieldIndex+'][Concourse][]" value="3"  class="form-control">C</label></br>'+
                          '<label for="airline-name"><input type="checkbox" name="field_name['+fieldIndex+'][Concourse][]" value="4"  class="form-control">D</label></br>'+
                          '<label for="airline-name"><input type="checkbox" name="field_name['+fieldIndex+'][Concourse][]" value="5"  class="form-control">E</label>'+
                        '</div>'+
                        '<div class="col-md-6 col-lg-6 col-sm-12">'+
                          '<button type="button" class="btn btn-primary btn-sm remove_btn" onclick="removeAccordion(this)">Remove</button>'+
                        '</div>'+
                      '</div>'+
                  '</div>';

      $('#accordion').append(html);    
      $("#add_more_button").val(addMoreValue); 
      removeAccordion();
      $( "#accordion" ).accordion( "refresh" );     

    }

    function removeAccordion(e){
      $(e).parent().parent().parent().prev('.ui-accordion-header').remove();
      $(e).parent().parent().parent().remove();
    }

    $(document).ready(function() {
       $("#accordion").accordion();
    });

</script>    

</body>
</html>
