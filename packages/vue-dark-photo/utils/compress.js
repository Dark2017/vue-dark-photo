/**
 * 图片压缩，默认同比例压缩
 * @param {Object} path
 *   pc端传入的路径可以为相对路径，但是在移动端上必须传入的路径是照相图片储存的绝对路径
 * @param {Object} obj
 *   obj 对象 有 width， height， quality(0-1)
 * @param {Object} callback
 *   回调函数有一个参数，base64的字符串数据
 */
export function dealImage(path, obj, callback) {
	var img = new Image();
	img.src = path;
	var w = img.width,
		h = img.height,
		scale = w / h;
	w = obj.width || w;
	h = obj.height || w / scale;
	// var quality = 0.7; // 默认图片质量为0.7 //生成canvas
	// var canvas = document.getElementById("canvas");
	var canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d"); // 创建属性节点
	var anw = document.createAttribute("width");
	anw.nodeValue = w;
	var anh = document.createAttribute("height");
	anh.nodeValue = h;
	canvas.setAttributeNode(anw);
	canvas.setAttributeNode(anh);
	img.onload = function() {
		ctx.drawImage(img, 0, 0, w, h);
		// if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
		// 	quality = obj.quality;
		// }
		// quality值越小，所绘制出的图像越模糊
		var base64 = canvas.toDataURL();
		callback(base64);
	};
}
