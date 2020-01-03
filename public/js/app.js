!function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){return o(e[i][1][r]||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r}()({1:[function(require,module,exports){window.CommonHandler=require("./helpers/common"),window.PopupPage=require("./util/popupHandler"),window.LoginPage=require("./views/loginHandler")},{"./helpers/common":2,"./util/popupHandler":6,"./views/loginHandler":7}],2:[function(require,module,exports){function readFileAndPreview(reader,ele,input){reader.onload=function(e){$(ele).attr("src",e.target.result)},reader.readAsDataURL(input.files[0])}var ApiUtil=require("../util/apiUtil"),FormValidator=require("../util/formValidator");module.exports={initAutoComplete:function(input,parentEle){function fillAddress(place,element){if(place){element.find(".js_area,.js_locality,.js_city,.js_state,.js_country").val("");for(var i=0;i<place.address_components.length;i++)switch(place.address_components[i].types[0]){case"sublocality_level_1":element.find(".js_area").val(place.address_components[i].long_name);break;case"locality":element.find(".js_locality").val(place.address_components[i].long_name);break;case"administrative_area_level_2":element.find(".js_city").val(place.address_components[i].long_name);break;case"administrative_area_level_1":element.find(".js_state").val(place.address_components[i].long_name);break;case"country":element.find(".js_country").val(place.address_components[i].long_name)}}}var _input=input||"address",_parentEle=parentEle||".js_address_details";if(document.getElementById(_input)){var profile_address_autocomplete=new google.maps.places.Autocomplete(document.getElementById(_input),{types:["(regions)"]});profile_address_autocomplete.addListener("place_changed",function(){fillAddress(profile_address_autocomplete.getPlace(),$(_parentEle))})}},checkImageDataString:function(dataString){var matches=dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);return matches&&3===matches.length},imagePreview:function(input,ele,onlyImg){var imgFileTypes=["jpg","jpeg","png","gif"];if(input.files&&input.files[0]){var reader=new FileReader,extension=input.files[0].name.split(".").pop().toLowerCase(),isSuccess=imgFileTypes.indexOf(extension)>-1;if(onlyImg){if(!isSuccess)return alert("Only jpg/jpeg and png files are allowed!"),!1;readFileAndPreview(reader,ele,input)}else readFileAndPreview(reader,ele,input)}},afterUserLogin:function(cb){ApiUtil.makeAjaxRequest("/api/user/details","","POST","","",function(data){data.err?(HeaderPage.setLoginCallBack(function(data){PopupPage.close(),cb(data)}),$(".js_global_sign_in").trigger("click")):cb(data)})},showFlashMsg:function(position,data){var _msg_tmpl=Handlebars.partials.notification({position:position,data:data});$("body").append(_msg_tmpl),$(".js_tr_flash_msg_close").off("click").on("click",function(){$(this).parent().parent().remove()})},initTrainerConnectBook:function(){var _self=this;$(".js_open_book_popup").off("click").on("click",function(){var _tname=$(this).data("tname"),_tid=$(this).data("tid");_self.afterUserLogin(function(data){if(data&&data.user&&data.user.user_id){var tmpl=Handlebars.partials.book_trainer_popup({trainer_name:_tname,user_id:data.user.user_id,trainer_id:_tid});PopupPage.init(tmpl,"",function(){_self.initTrainerConnectBook(),_self.initAutoComplete();var picker_two=new Pikaday({field:document.getElementById("tdate"),firstDay:1,minDate:new Date});new Pikaday({field:document.getElementById("fdate"),firstDay:1,minDate:new Date,onSelect:function(date){picker_two.setMinDate(date)}})})}else alert("Something went wrong try login again")})}),$(".js_open_connect_popup").off("click").on("click",function(){var _tname=$(this).data("tname"),_tid=$(this).data("tid");_self.afterUserLogin(function(data){if(data&&data.user&&data.user.user_id){var tmpl=Handlebars.partials.connect_trainer_popup({trainer_name:_tname,user_id:data.user.user_id,trainer_id:_tid});PopupPage.init(tmpl,"",function(){_self.initTrainerConnectBook(),$(".timepicker").timepicker({timeFormat:"h:mm p",interval:30,minTime:"8:00am",maxTime:"8:00pm",defaultTime:"10:00am",startTime:"8:00am",dynamic:!1,dropdown:!0,scrollbar:!0});var picker_two=new Pikaday({field:document.getElementById("tdate"),firstDay:1,minDate:new Date});new Pikaday({field:document.getElementById("fdate"),firstDay:1,minDate:new Date,onSelect:function(date){picker_two.setMinDate(date)}})})}else alert("Something went wrong try login again")})});$("#addNewBookingForm").submit(function(e){if(e.preventDefault(),FormValidator.validateForm("#addNewBookingForm")){var _form=$("#addNewBookingForm"),_obj={message:_form.find(".js_msg").val(),location:{street:"",area:_form.find(".js_locality").val(),city:_form.find(".js_city").val(),state:_form.find(".js_state").val(),country:_form.find(".js_country").val()},user:_form.find(".js_uid").val(),trainer:_form.find(".js_tid_id").val(),from_date:_form.find(".js_fdate").val(),to_date:_form.find(".js_tdate").val()};ApiUtil.makeAjaxRequest("/api/post/booking-request","","POST","",_obj,function(_data){_data&&!_data.err?($(".js_popup_form,.js_popup_footer").addClass("hide"),$(".js_form_success").removeClass("hide")):_form.find(".js_server_error_msg").removeClass("hide").html(_data.msg||"Something went wrong")})}});$("#addNewConnectionForm").submit(function(e){if(e.preventDefault(),FormValidator.validateForm("#addNewConnectionForm")){var _form=$("#addNewConnectionForm"),_obj={message:_form.find(".js_msg").val(),location:{street:"",area:_form.find(".js_locality").val(),city:_form.find(".js_city").val(),state:_form.find(".js_state").val(),country:_form.find(".js_country").val()},user:_form.find(".js_uid").val(),trainer:_form.find(".js_tid_id").val(),pref_date:_form.find(".js_fdate").val(),pref_time:_form.find(".js_pref_time").val(),alt_date:_form.find(".js_tdate").val(),alt_time:_form.find(".js_alt_time").val()};ApiUtil.makeAjaxRequest("/api/post/connection-request","","POST","",_obj,function(_data){_data&&!_data.err?($(".js_popup_form,.js_popup_footer").addClass("hide"),$(".js_form_success").removeClass("hide")):_form.find(".js_server_error_msg").removeClass("hide").html(_data.msg||"Something went wrong")})}})}}},{"../util/apiUtil":3,"../util/formValidator":5}],3:[function(require,module,exports){var qs=require("querystring");module.exports={makeAjaxRequest:function(url,query,method,dataType,data,callback){if(!url)return!1;url=qs.stringify(query)?url+"?"+qs.stringify(query):url;var reqObj={url:url,method:method,dataType:dataType,data:data,success:function(res){callback(res)},error:function(err){callback(err)}};$.ajax(reqObj)},makeFileUploadRequest:function(url,query,method,dataType,data,callback){if(!url)return!1;url=qs.stringify(query)?url+"?"+qs.stringify(query):url,$.ajax({url:url,method:"POST",data:data,contentType:!1,processData:!1,success:function(res){callback(res)},error:function(err){window.trackOnMixpanel("Client Api File Upload Error",{url:url,method:method,err:err}),callback(err)}})}}},{querystring:10}],4:[function(require,module,exports){module.exports={checkParams:function(_url){},getParameter:function(parameterName){var result=null,tmp=[];return location.search.substr(1).split("&").forEach(function(item){tmp=item.split("="),tmp[0]===parameterName&&(result=decodeURIComponent(tmp[1]))}),result},initProfileImageCropper:function(formId,_previewEle,imageId,cb){function readURL(input,preview_ele){if(input.files&&input.files[0]){var reader=new FileReader;reader.onload=function(e){$(preview_ele).attr("src",e.target.result),cropper&&cropper.destroy(),cropper=new Cropper(image,{autoCropArea:.5,aspectRatio:1,ready:function(){cropper.setCropBoxData(cropBoxData).setCanvasData(canvasData)}})},reader.readAsDataURL(input.files[0])}}var cropBoxData,canvasData,cropper,image=document.getElementById(imageId),inputElement=$(formId).find(".js_file_input"),submitElement=$(formId).find(".js_submit_img"),closeBtnElement=$(formId).find(".js_img_popup_close"),_image_holder_ele=$(_previewEle);inputElement.change(function(){this.files[0].size<3145728?readURL(this,$(this).data("preview")):(alert("file must be select less than 3 MB"),$(this).val(""))}),submitElement.off("click").on("click",function(){closeBtnElement.trigger("click"),_image_holder_ele.attr("src",cropper.getCroppedCanvas().toDataURL("image/png")),cb&&cb()})},initCoverImageCropper:function(formId,_previewEle,imageId,cb){function readURL(input,preview_ele){if(input.files&&input.files[0]){var reader=new FileReader;reader.onload=function(e){$(preview_ele).attr("src",e.target.result),cropper&&cropper.destroy(),cropper=new Cropper(image,{autoCropArea:.5,aspectRatio:1,ready:function(){cropper.setCropBoxData(cropBoxData).setCanvasData(canvasData)}})},reader.readAsDataURL(input.files[0])}}var cropBoxData,canvasData,cropper,image=document.getElementById(imageId),inputElement=$(formId).find(".js_file_input"),submitElement=$(formId).find(".js_submit_img"),closeBtnElement=$(formId).find(".js_img_popup_close"),_image_holder_ele=$(_previewEle);inputElement.change(function(){this.files[0].size<3145728?readURL(this,$(this).data("preview")):(alert("file must be select less than 3 MB"),$(this).val(""))}),submitElement.off("click").on("click",function(){closeBtnElement.trigger("click"),_image_holder_ele.css({"background-image":"url('"+cropper.getCroppedCanvas().toDataURL("image/png")+"')"}),cb&&cb()})}}},{}],5:[function(require,module,exports){module.exports={validateForm:function(formId){function markError(element,errorMsgId){return $(formId).find("."+errorMsgId).show(),element.addClass("error"),status=!1,!1}function unMarkError(element,errorMsgId){$(formId).find("."+errorMsgId).hide(),element.removeClass("error")}function validateFieldType(fieldType,element,elementVal,errorMsgId){return"function"==typeof _this[fieldType]&&(_this[fieldType](elementVal,element)?unMarkError(element,errorMsgId):markError(element,errorMsgId))}var _this=this,status=!0;return $(formId+" .required").each(function(){var element=$(this),elementVal=$(this).val(),errorMsgId=element.attr("data-errormsg"),validateList=element.attr("data-groupname"),isElementsNeedValidation=!1;if(""===elementVal&&!validateList)return void markError(element,errorMsgId);$.each(_this.getAllFieldsToValidate(),function(index,value){element.hasClass(value)&&(isElementsNeedValidation=!0,validateFieldType(value,element,elementVal,errorMsgId))}),isElementsNeedValidation||unMarkError(element,errorMsgId)}),status},getAllFieldsToValidate:function(){return["isValidEmail","isValidMobileNumber","isNumber","isLengthOk","numberInRange","isValidResetPassword","isEqualTo","isCardNo","validateList"]},isNumber:function(input){return!isNaN(input)},numberInRange:function(input,element){var inputInt=Number(input),min=$(element).data("min"),max=$(element).data("max");return!!this.isNumber(input)&&(inputInt>=min&&inputInt<=max)},isLengthOk:function(input,element){var minLength=element.data("minlength"),maxLength=element.prop("maxlength");return input.length>=minLength&&input.length<=maxLength},isValidEmail:function(email){return/^[-0-9a-zA-Z.+_]+@[-0-9a-zA-Z.+_]+\.[a-zA-Z]{2,4}$/.test(email)},isValidUserName:function(userName){return userName=userName.trim(),userName.length>=4},isValidAmount:function(amount){return/^[1-9]\d+$/.test(amount)},isValidMobileNumber:function(mobileNumber){var mobileNumberTrimmed=mobileNumber.trim(),specialCharRegex=/^[\w{./\\(),'}:?®©-]+$/,isValidNumber=mobileNumberTrimmed>0,hasSpecialChars=specialCharRegex.test(mobileNumberTrimmed),isSatisfyLenth=mobileNumberTrimmed.length>=10;return isValidNumber&&hasSpecialChars&&isSatisfyLenth},isEqualTo:function(password,element){var equalField=element.data("equalto");return $(equalField).val()===password},isCardNo:function(input,element){var inputEdited=input.replace(/ /g,""),minLength=element.data("minlength"),maxLength=element.prop("maxlength");return inputEdited.length>=minLength&&inputEdited.length<=maxLength},validateList:function(input,element){var groupName=element.data("groupname"),status=!1;return $('[name="'+groupName+'"]').each(function(){if($(this).is(":checked"))return void(status=!0)}),status},clearForm:function(formId){$(formId).find("input[type=text],input[type=tel],input[type=email],select,textarea").val(""),$(formId).find("input[type=checkbox],input[type=radio]").prop("checked",!1)}}},{}],6:[function(require,module,exports){module.exports=function(){function closePopup(){$("body").removeClass("popup-visible modal-open"),$(".cd-popup").removeClass("is-visible"),$("#windowPopup").remove(),$(".ui-timepicker-standard").addClass("ui-helper-hidden ui-timepicker-hidden")}function bindClickEvents(){$(".cd-popup-trigger").off("click").on("click",function(event){event.preventDefault(),$("body").addClass("popup-visible modal-open"),$(".cd-popup").addClass("is-visible")}),$(".cd-popup").off("click").on("click",function(event){($(event.target).is(".cd-popup-close")||$(event.target).is(".cd-popup-close-icon")||$(event.target).is(".cd-popup"))&&(event.preventDefault(),closePopup())}),$(document).keyup(function(event){"27"==event.which&&closePopup()})}return{init:function(html,theme,cb){$("#windowPopup").remove();var tmpl=Handlebars.partials.popup;$("body").addClass("modal-open").append(tmpl({html:html,theme:theme})),bindClickEvents(),cb&&cb()},close:function(){closePopup()}}}()},{}],7:[function(require,module,exports){var ApiUtil=require("../util/apiUtil"),FormValidator=require("../util/formValidator"),Helpers=require("../util/common");module.exports=function(){function submitLoginForm(){if(FormValidator.validateForm("#jsLoginForm")){var obj={username:$(".js_username").val(),password:$(".js_password").val()},callback=function(data){data&&!data.err?Helpers.getParameter("ref")?window.location.href=Helpers.getParameter("ref"):window.location.href="/":alert(data.msg||"something went wrong")};ApiUtil.makeAjaxRequest("/api/login","","POST","",obj,callback)}}function submitRegister(){if(FormValidator.validateForm("#jsRegisterForm")){var obj={first_name:$(".js_name").val(),email:$(".js_email").val(),password:$(".js_password").val()},callback=function(data){data&&!data.err?alert(data.msg):alert(data.msg||"something went wrong")};ApiUtil.makeAjaxRequest("/api/register","","POST","",obj,callback)}}function submitForgotPassword(){if(FormValidator.validateForm("#jsForgotPassword")){var obj={email:$(".js_email").val()},callback=function(data){data&&!data.err?alert(data.msg):alert(data.msg||"something went wrong"),console.log(data)};ApiUtil.makeAjaxRequest("/api/forgot-password","","POST","",obj,callback)}}function submitUpdatePassword(){if(FormValidator.validateForm("#jsUpdatePassword")){var newpassword=$(".js_newpassword").val(),confirmpassword=$(".js_confirmpassword").val(),status=!1,obj={token:$(".js_token").val()};newpassword===confirmpassword&&(status=!0,obj.password=newpassword);var callback=function(data){data&&!data.err?(alert(data.msg),window.location.href="/login"):alert(data.msg||"something went wrong"),console.log(obj),console.log(data)};console.log(status),status?ApiUtil.makeAjaxRequest("/api/update-password","","POST","",obj,callback):alert("incorrect password")}}return{initLogin:function(){$(".js_username").on("keypress",function(e){13===(event.keyCode?event.keyCode:event.which)&&submitLoginForm()}),$("#jsLoginForm").submit(function(e){return submitLoginForm(),!1})},initRegister:function(){$("#jsRegisterForm").submit(function(e){return submitRegister(),!1})},initForgotPassword:function(){$("#jsForgotPassword").submit(function(e){return submitForgotPassword(),!1})},initUpdatePassword:function(){$("#jsUpdatePassword").submit(function(e){return e.preventDefault(),submitUpdatePassword(),!1})}}}()},{"../util/apiUtil":3,"../util/common":4,"../util/formValidator":5}],8:[function(require,module,exports){"use strict";function hasOwnProperty(obj,prop){return Object.prototype.hasOwnProperty.call(obj,prop)}module.exports=function(qs,sep,eq,options){sep=sep||"&",eq=eq||"=";var obj={};if("string"!=typeof qs||0===qs.length)return obj;var regexp=/\+/g;qs=qs.split(sep);var maxKeys=1e3;options&&"number"==typeof options.maxKeys&&(maxKeys=options.maxKeys);var len=qs.length;maxKeys>0&&len>maxKeys&&(len=maxKeys);for(var i=0;i<len;++i){var kstr,vstr,k,v,x=qs[i].replace(regexp,"%20"),idx=x.indexOf(eq);idx>=0?(kstr=x.substr(0,idx),vstr=x.substr(idx+1)):(kstr=x,vstr=""),k=decodeURIComponent(kstr),v=decodeURIComponent(vstr),hasOwnProperty(obj,k)?isArray(obj[k])?obj[k].push(v):obj[k]=[obj[k],v]:obj[k]=v}return obj};var isArray=Array.isArray||function(xs){return"[object Array]"===Object.prototype.toString.call(xs)}},{}],9:[function(require,module,exports){"use strict";function map(xs,f){if(xs.map)return xs.map(f);for(var res=[],i=0;i<xs.length;i++)res.push(f(xs[i],i));return res}var stringifyPrimitive=function(v){switch(typeof v){case"string":return v;case"boolean":return v?"true":"false";case"number":return isFinite(v)?v:"";default:return""}};module.exports=function(obj,sep,eq,name){return sep=sep||"&",eq=eq||"=",null===obj&&(obj=void 0),"object"==typeof obj?map(objectKeys(obj),function(k){var ks=encodeURIComponent(stringifyPrimitive(k))+eq;return isArray(obj[k])?map(obj[k],function(v){return ks+encodeURIComponent(stringifyPrimitive(v))}).join(sep):ks+encodeURIComponent(stringifyPrimitive(obj[k]))}).join(sep):name?encodeURIComponent(stringifyPrimitive(name))+eq+encodeURIComponent(stringifyPrimitive(obj)):""};var isArray=Array.isArray||function(xs){return"[object Array]"===Object.prototype.toString.call(xs)},objectKeys=Object.keys||function(obj){var res=[];for(var key in obj)Object.prototype.hasOwnProperty.call(obj,key)&&res.push(key);return res}},{}],10:[function(require,module,exports){"use strict";exports.decode=exports.parse=require("./decode"),exports.encode=exports.stringify=require("./encode")},{"./decode":8,"./encode":9}]},{},[1]);