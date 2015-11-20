// JavaScript Document

function DiscuzCrypto()
{
	var md5 = new Md5();
	var base64 = new Base64();
	
	this.encrypt = function encrypt(value, key)
	{
		var encryptKey = md5.hex_md5(String(parseInt(Math.random() * 32000))); 
		var ctr = 0; 
		var tmp = '';
		for(var i = 0; i < value.length; i++) 
		{ 
			ctr = ctr == encryptKey.length ? 0 : ctr; 
			tmp += encryptKey.charAt(ctr)+(this.xorString(value.charAt(i), encryptKey.charAt(ctr++))); 
		} 
		return base64.encode(this.cryptoKey(tmp, key)); 
	}
	this.decrypt = function decrypt(value, key)
	{ 
		value = this.cryptoKey(base64.decode(value), key); 
		var tmp = ''; 
		for(var i = 0; i < value.length; i++) 
		{ 
			var md5 = value.charAt(i); 
			tmp += this.xorString(value.charAt(++i), md5); 
		} 
		return tmp; 
	} 
	
	this.cryptoKey = function cryptoKey(value, encryptKey)
	{
		var encryptKey = md5.hex_md5(encryptKey); 
		var ctr = 0; 
		var tmp = ''; 
		for(var i = 0; i < value.length; i++) 
		{ 
			ctr = ctr == encryptKey.length ? 0 : ctr; 
			tmp += this.xorString(value.charAt(i), encryptKey.charAt(ctr++)); 
		} 
		return tmp; 
	}
	
	this.xorString = function xorString(a, b)
	{
		var codeIndex = 0;
		var resultLength = a.length > b.length ? b.length : a.length;
		var resultString = "";
	
		var aOneCode;
		var bOneCode;
		var resultOneCode;
		
		for(codeIndex = 0; codeIndex < resultLength; ++codeIndex)
		{
			aOneCode = a.charCodeAt(codeIndex);
			bOneCode = b.charCodeAt(codeIndex);
			resultOneCode = aOneCode ^ bOneCode;
			
			resultString += String.fromCharCode(resultOneCode);
		}
		
		return resultString;
		
	}
	this.andString = function andString(a, b)
	{
		var codeIndex = 0;
		var resultLength = a.length > b.length ? a.length : b.length;
		var resultString = "";
	
		var aOneCode;
		var bOneCode;
		var resultOneCode;
		
		
		for(codeIndex = 0; codeIndex < resultLength; ++codeIndex)
		{
			aOneCode = codeIndex < a.length ? a.charCodeAt(codeIndex) : 0;
			bOneCode =  codeIndex < b.length ? b.charCodeAt(codeIndex) : 0;
			
			resultOneCode = aOneCode | bOneCode;
			resultString += String.fromCharCode(resultOneCode);
		}
		
		return resultString;
	}
}