package br.com.api.util;

import java.lang.reflect.Type;
import java.util.Date;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonDeserializationContext;
import com.google.gson.JsonDeserializer;
import com.google.gson.JsonElement;
import com.google.gson.JsonParseException;
import com.google.gson.JsonParser;
import com.google.gson.JsonPrimitive;
import com.google.gson.JsonSerializationContext;
import com.google.gson.JsonSerializer;

import br.com.api.adpters.EspecieTypeAdpater;
import br.com.api.adpters.InstituicaoTypeAdpater;
import br.com.api.adpters.UsuarioTypeAdpater;
import br.com.api.model.Especie;
import br.com.api.model.Instituicao;
import br.com.api.model.Usuario;

public class Util {
	
	private static final JsonParser parser = new JsonParser();

	private static JsonSerializer<Date> ser = new JsonSerializer<Date>(){
		@Override
		public JsonElement serialize(Date date, Type typeOfSrc, JsonSerializationContext context) {
			return date == null ? null : new JsonPrimitive(date.getTime());
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
			registerTypeAdapter(Date.class, deser).
			registerTypeAdapter(Usuario.class, new UsuarioTypeAdpater()).
			registerTypeAdapter(Instituicao.class, new InstituicaoTypeAdpater()).
			registerTypeAdapter(Especie.class, new EspecieTypeAdpater()).
			create();
	
	
	
	public static Object jsonToObject(String json, Class<?> classe){
		return gson.fromJson(json, classe);
	}
	
	public static String objectToJson(Object objeto){
		return gson.toJson(objeto);
	}

	public static JsonParser getParser() {
		return parser;
	}

}
