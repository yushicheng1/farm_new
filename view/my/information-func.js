var aFunc = {
	initData: function() {
		myServer.getUserInfo(function(data) {
			if (data.status == 200) {
				aVariable.ipt.iptName.value = data.data.nick_name;
				aVariable.ipt.iptPhone.value = data.data.phone;
				aVariable.ipt.iptImg.src = aServer.ApiUrl + data.data.avatar;
			}
		}, function() {

		});
	},
	bindEvent: function() {
		aVariable.btn.btnSave.addEventListener("tap", function() {
			var name = aVariable.ipt.iptName.value;
			var phone = aVariable.ipt.iptPhone.value;
			var spread_code = aVariable.ipt.iptCode.value;
			console.log(name.trim().length)
			if (name == '' || name.trim().length == 0) {
				mui.toast('昵称不能为空');
				return;
			}
			// var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
			// if (!myreg.test(phone)) {
			// 	mui.toast('请输入正确的手机号码')
			// 	return;
			// }

			myServer.updateUserInfo(name.trim(), phone, spread_code, function(data) {
				if (data.status == 200) {
					var main = plus.webview.currentWebview().opener();
					mui.fire(main, 'infomation', {});
					mui.toast(data.msg);
				} else {
					mui.toast("保存失败");
				}
			}, function() {

			});

		})


		aVariable.btn.btnImg.addEventListener('tap', function() {
			document.getElementById("ipt_file").click();
		});
	},

	initView: function() {

	},
	plusReady: function() {
		// if (mui.os.plus) {
		// 	plus.navigator.closeSplashscreen();
		// 	plus.screen.lockOrientation("portrait-primary");
		// }

		aVariable.webview.current = plus.webview.currentWebview();
		aVariable.params.name = aVariable.webview.current.name;
		aVariable.params.phone = aVariable.webview.current.phone;
		aVariable.params.avatar = aVariable.webview.current.avatar;
		aFunc.initView();
		aFunc.initData();
		aFunc.bindEvent();
	}
};

function updateImg(e) {
	var file = e.files[0];
	// if (mui.os.ios) {
	// 	var objURL = getObjectURL(file);
	// 	document.getElementById('ipt_img').src = objURL;
	// 	uploadHeadImg(file)
	// } else {
	if (window.FileReader) {
		var reader = new FileReader();
		reader.readAsDataURL(file);
		//监听文件读取结束后事件    
		reader.onloadend = function(e) {
			var Orientation = 1;

			var imageObj = new Image();

			imageObj.src = e.target.result;

			imageObj.onload = function() {

				varOrientation = 1;

				var cvs = document.createElement('canvas');

				var ctx = cvs.getContext('2d');

				var scale = 0.1; //预留压缩比

				var size = this.size;

				cvs.width = this.width * scale;

				cvs.height = this.height * scale; //计算等比缩小后图片宽高

				EXIF.getData(imageObj, function() {

					Orientation = EXIF.getTag(this, "Orientation");

					if (Orientation && Orientation != 1) {

						switch (Orientation) {

							case 6: // 旋转90度
								console.log('11111111111111111111')
								/**
			
									*这边主要是获取到要加载标签的宽和高，用来给画布设置大小，这里cvs是预支的画布，ctx是重画的图像。
			
									*/
								// var fatherWidth=parseFloat(document.querySelector(".detailPhotoimg").style.width);
								// var fatherheight=parseFloat(document.querySelector(".detailPhotoimg").style.height);
								// var fatherWidth=parseFloat($('#ipt_img').css('width'));

								// var fatherheight=parseFloat($('#ipt_img').css('height'));
								// var fatherWidth = 60;

								// var fatherheight = 60;
								// console.log(fatherWidth + '...' + fatherheight)
								// scale = fatherWidth / this.width;

								// heightScale = fatherheight / this.height;

								// cvs.width = fatherWidth;

								// var x = this.height * scale / 2;

								// //旋转后的画布需要img标签获取高度的2倍

								// cvs.height = fatherheight * 1;

								// ctx.rotate(Math.PI / 2);

								// // (0,-imgHeight) 从旋转原理图那里获得的起始点

								// // ctx.drawImage(this,0,-this.height*scale-(fatherWidth/2-x),fatherWidth,fatherheight);
								// ctx.drawImage(this, 0, -this.height * scale - (fatherWidth / 1.6 - x), fatherWidth, fatherheight);
								ctx.drawImage(this, 0, 0, cvs.width, cvs.height);
								break;

							case 3: // 旋转180度
								console.log('2222222222222')

								ctx.rotate(Math.PI);

								ctx.drawImage(this, this.width * scale, -this.height * scale, this.width * scale, this.height * scale);

								break;

							case 8: // 旋转-90度
								console.log('3333333333333')

								cvs.width = this.height * scale;

								cvs.height = this.width * scale;

								ctx.rotate(3 * Math.PI / 2);

								ctx.drawImage(this, -this.width * scale, 0, this.width * scale, this.height * scale);

								break;

						}

					} else {
						console.log('444444444444')
						ctx.drawImage(this, 0, 0, cvs.width, cvs.height);

					}

					// var newImageData=cvs.toDataURL(this,1);
					var newImageData = cvs.toDataURL('image/png');

					//重新定向加载url地址
					// console.log(newImageData)
					// document.getElementById('ipt_img').src = newImageData;		
					uploadAvatarBig(newImageData, 'avatar.png')
					// canvasDataURL(e.target.result,{
					// 			quality: 0.2
					// 		}) 
					// var file= dataURLtoFile(newImageData,'avatar');
					// console.log(file.size)
					// $('.detailPhotoimg').attr('src',newImageData)

				});

			};


			// document.getElementById('ipt_img').src = e.target.result;
			// var formData = new FormData(); //这里需要实例化一个FormData来进行文件上传
			// formData.append('avatar', file);
			// mui.ajax({
			// 	type: "post",
			// 	url: "http://39.106.109.129:8000/api/my/avatar",
			// 	headers: {
			// 		'Authorization': 'Bearer' + ' ' + LocalStorage.getItem(LocalStorage.keys.Auth_Token)
			// 	},
			// 	data: formData,
			// 	processData: false,
			// 	contentType: false,
			// 	success: function(data) {
			// 		if(data.status=='200'){
			// 			mui.toast("头像上传成功");
			// 		}else{
			// 			mui.toast("头像上传失败")
			// 		}
			// 		console.log(JSON.stringify(data))
			// 		var main = plus.webview.currentWebview().opener();
			// 		mui.fire(main, 'infomation', {});
			// 	}
			// });
		};


	}
	// }
}

//上传图片
function uploadHeadImg(file) {
	//选中图片之后，头像当前的照片变为选择的照片
	// var mainImg = document.getElementById('ipt_img');
	// mainImg.src = imgPath;
	// var images = new Image();
	// images.src = imgPath;
	// console.log(imgPath)
	// var formData = new FormData(); //这里需要实例化一个FormData来进行文件上传
	// formData.append('avatar', file);
	// mui.ajax({
	// 	type: "post",
	// 	url: "http://39.106.109.129:8000/api/my/avatar",
	// 	headers: {
	// 		'Authorization': 'Bearer' + ' ' + LocalStorage.getItem(LocalStorage.keys.Auth_Token)
	// 	},
	// 	data: formData,
	// 	processData: false,
	// 	contentType: false,
	// 	success: function(data) {
	// 		if (data.status == '200') {
	// 			mui.toast("头像上传成功");
	// 		} else {
	// 			mui.toast("头像上传失败")
	// 		}
	// 		console.log(JSON.stringify(data))
	// 		// var main = plus.webview.currentWebview().opener();
	// 		// mui.fire(main, 'infomation', {});
	// 		// var plant=plus.webview.getWebviewById('plant');
	// 		// mui.fire(plant, 'refreshavatar', {});
	// 	}
	// });

	var xhr = new XMLHttpRequest();
	var formData = new FormData();
	formData.append('avatar', file);

	xhr.open('POST', 'http://39.106.109.129:8000/api/my/avatar', true);
	xhr.setRequestHeader('Authorization', 'Bearer' + ' ' + LocalStorage.getItem(LocalStorage.keys.Auth_Token))
	xhr.onreadystatechange = function() {
		// if(xhr.readyState == 4 && xhr.status == 200){  
		var res = JSON.parse(xhr.responseText)
		console.log(res)
		var main = plus.webview.currentWebview().opener();
		mui.fire(main, 'refreshJf', {});
		var plant = plus.webview.getWebviewById('plant');
		mui.fire(plant, 'refreshavatar', {});
		// }  
	}
	xhr.send(formData);
}

function uploadAvatarBig(dataurl, filename) {
	var arr = dataurl.split(','),
		mime = arr[0].match(/:(.*?);/)[1],
		bstr = atob(arr[1]),
		n = bstr.length,
		u8arr = new Uint8Array(n);
	while (n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}
	var file = new File([u8arr], filename, {
		type: mime
	});
	// var file = blobToFile(dataURLtoBlob(dataurl), filename);
	// var blob = base64ToBlob(dataurl);
	// var file = blobToFile(blob, 'avatar.png');
	// console.log(file.name)
	// console.log(file.size)
	// console.log(JSON.stringify(file))
	var objURL = getObjectURL(file);
	document.getElementById('ipt_img').src = objURL;
	var formData = new FormData(); //这里需要实例化一个FormData来进行文件上传
	formData.append('avatar', file);
	console.log(file.size)
	if (mui.os.ios) {
		var xhr = new XMLHttpRequest();
		xhr.open('POST', aServer.ApiUrl + '/api/my/avatar', true);
		xhr.setRequestHeader('Authorization', 'Bearer' + ' ' + LocalStorage.getItem(LocalStorage.keys.Auth_Token))
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200) {
				mui.toast("头像上传成功");
			}
			var main = plus.webview.currentWebview().opener();
			mui.fire(main, 'refreshJf', {});
			var plant = plus.webview.getWebviewById('plant');
			mui.fire(plant, 'refreshavatar', {});
			// }  
		}
		xhr.send(formData);
	} else {
		console.log(123)
		mui.ajax({
			type: "post",
			url: aServer.ApiUrl + "/api/my/avatar",
			headers: {
				'Authorization': 'Bearer' + ' ' + LocalStorage.getItem(LocalStorage.keys.Auth_Token)
			},
			data: formData,
			processData: false,
			contentType: false,
			success: function(data) {
				if (data.status == '200') {
					mui.toast("头像上传成功");
				} else {
					mui.toast("头像上传失败")
				}
				console.log(JSON.stringify(data))
				var main = plus.webview.currentWebview().opener();
				mui.fire(main, 'refreshJf', {});
				var plant = plus.webview.getWebviewById('plant');
				mui.fire(plant, 'refreshavatar', {});
			}
		});
	}


}

function base64ToBlob(base64Data) {
	let arr = base64Data.split(','),
		fileType = arr[0].match(/:(.*?);/)[1],
		bstr = atob(arr[1]),
		l = bstr.length,
		u8Arr = new Uint8Array(l);

	while (l--) {
		u8Arr[l] = bstr.charCodeAt(l);
	}
	console.log(fileType)
	return new Blob([u8Arr], {
		type: fileType
	});
};

//将blob转换成file

function blobToFile(theBlob, fileName) {

	theBlob.lastModifiedDate = new Date();

	theBlob.name = fileName;

	return theBlob;

}

// function uploadAvatar(file) {
// 		var formData = new FormData(); //这里需要实例化一个FormData来进行文件上传
// 		formData.append('avatar', file);
// 		mui.ajax({
// 			type: "post",
// 			url: "http://39.106.109.129:8000/api/my/avatar",
// 			headers: {
// 				'Authorization': 'Bearer' + ' ' + LocalStorage.getItem(LocalStorage.keys.Auth_Token)
// 			},
// 			data: formData,
// 			processData: false,
// 			contentType: false,
// 			success: function(data) {
// 				if(data.status=='200'){
// 					mui.toast("头像上传成功");
// 				}else{
// 					mui.toast("头像上传失败")
// 				}
// 				console.log(JSON.stringify(data))
// 				var main = plus.webview.currentWebview().opener();
// 				mui.fire(main, 'infomation', {});
// 			}
// 		});

//     }

function getObjectURL(file) {
	var url = null;
	if (window.createObjcectURL != undefined) {
		url = window.createOjcectURL(file);
	} else if (window.URL != undefined) {
		url = window.URL.createObjectURL(file);
	} else if (window.webkitURL != undefined) {
		url = window.webkitURL.createObjectURL(file);
	}
	return url;
}
