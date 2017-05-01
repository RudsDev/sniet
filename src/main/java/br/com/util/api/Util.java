package br.com.util.api;

import com.google.gson.Gson;

public class Util {
	
	public static Object jsonToObject(String json, Class<?> classe){
		return new Gson().fromJson(json, classe);
	}
	
	public static String objectToJson(Object objeto){
		return new Gson().toJson(objeto);
	}

}
