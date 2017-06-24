% include('header.tpl')
<br />
<br />
<div class="panel-group" id="accordion">
  <div class="panel panel-default">
    <div class="panel-heading">
      <h4 class="panel-title">
        <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne">
          About
        </a>
      </h4>
    </div>
    <div id="collapseOne" class="panel-collapse collapse in">
      <div class="panel-body">
    <div class="row featurette featureImagePad">
            <div class="col-sm-6 col-md-5">
              <img class="featurette-image img-responsive img-circle"  src="/icons/{{global_var_dict['profile_image']}}">
            </div>
            <div class="col-sm-6 col-md-7 featureTextPad">
            % if len(global_var_dict['profile_name']) > 13:
                  <h3 class="featurette-heading">{{global_var_dict['profile_name']}}</h3>
            % else:
                  <h2 class="featurette-heading">{{global_var_dict['profile_name']}}.</h2>
            % end 
              <p class="lead special-font"><small>{{global_var_dict['profile_quote']}}</small></p>
            % if len(global_var_dict['profile_name']) > 13:
              <h5><small>{{global_var_dict['profile_blurb']}}</small></h5>
            % else:
              <h4><small>{{global_var_dict['profile_blurb']}}</small></h4>
            % end 
            </div>
          </div>
    </div>
      </div>
    </div>
  </div>
  <div class="panel panel-default">
    <div class="panel-heading">
      <h4 class="panel-title">
        <a data-toggle="collapse" data-parent="#accordion" href="#collapseTwo">
          All the social!
        </a>
      </h4>
    </div>
    <div id="collapseTwo" class="panel-collapse collapse">
      <div class="panel-body">
        <div class="row padMe">
          <div class="col-md-6">
            <div class="row">
              <div class="col-xs-12 col-sm-6 col-md-6 imageLower">
                <img src="/icons/steam.png">
              </div>
              <div class="col-xs-12 col-sm-5 col-md-6 buttonLower">
                <a target="_blank" href="{{global_var_dict['steam_URL']}}" class="btn btn-primary btn-lg" role="button" data-toggle="tooltip" data-placement="bottom" title="Current handle on steam.">Steam</a>
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <div class="row">
              <div class="col-xs-12 col-sm-6 col-md-6">
                <img src="/icons/discord.png">
              </div>
              <div class="col-xs-12 col-sm-6 col-sm-5 col-md-6 buttonLower">
                <a target="_blank" href="{{global_var_dict['discord_username']}}" class="btn btn-primary btn-lg" role="button" data-toggle="tooltip" data-placement="bottom" title="Discord username <3.">Discord</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
% if global_var_dict['optional_panel']:
       <div class="panel panel-default">
          <div class="panel-heading">
            <h4 class="panel-title">
              <a data-toggle="collapse" data-parent="#accordion" href="#collapseThree">
                {{global_var_dict['optional_panel_title']}}
              </a>
            </h4>
          </div>
          <div id="collapseThree" class="panel-collapse collapse">
            <div class="panel-body">
              <h2>
                <p>
                  <img src="/icons/{{global_var_dict['optional_panel_pic']}}">
                  <a target="_blank" href="{{global_var_dict['optional_panel_button_URL']}}" class="btn btn-primary btn-lg" role="button">{{global_var_dict['optional_panel_button_text']}}</a>
                </p>
              </h2>
            </div>
          </div>
       </div> 
      </div>
% end
% include('footer.tpl')
