package br.com.util.api;

import java.lang.reflect.Type;
import java.util.Date;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonDeserializationContext;
import com.google.gson.JsonDeserializer;
import com.google.gson.JsonElement;
import com.google.gson.JsonParseException;
import com.google.gson.JsonPrimitive;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;

public class Util {
	

	private static JsonSerializer<Date> ser = new JsonSerializer<Date>(){
		@Override
		public JsonElement serialize(Date src, Type typeOfSrc, JsonSerializationContext context) {
			return src == null ? null : new JsonPrimitive(src.getTime());
		}
	};
	
	private static JsonDeserializer<Date> deser = new JsonDeserializer<Date>() {
		@Override
		public Date deserialize(JsonElement json, Type typeOfT, JsonDeserializationContext context)
				throws JsonParseException {
			return json == null ? null : new Date(json.getAsLong());
		}
	};
	
	private static Gson gson = new GsonBuilder().registerTypeAdapter(Date.class, ser).
			registerTypeAdapter(Date.class, deser).create();
	
	
	
	public static Object jsonToObject(String json, Class<?> classe){
		return gson.fromJson(json, classe);
	}
	
	public static String objectToJson(Object objeto){
		return gson.toJson(objeto);
	}

}
