package br.com.api.adpters;

import java.io.IOException;

import com.google.gson.TypeAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonToken;
import com.google.gson.stream.JsonWriter;

import br.com.api.model.Instituicao;
import br.com.api.model.Usuario;
import br.com.api.util.Util;

public class UsuarioTypeAdpater extends TypeAdapter<Usuario> {

	@Override
	public Usuario read(JsonReader in) throws IOException {
		
		Usuario user  = new Usuario();
		InstituicaoTypeAdpater instituicaoAdpater = new InstituicaoTypeAdpater();
		
		JsonToken token = in.peek();
		
		if(token.equals(JsonToken.BEGIN_OBJECT)){
			in.beginObject();
		    while(!in.peek().equals(JsonToken.END_OBJECT)){
		    	
		    	if(in.peek().equals(JsonToken.NAME)){
		    		
		        	switch(in.nextName()) {
						case "idUsuario":
							user.setIdUsuario(Integer.parseInt(in.nextString()));
						break;
						case "name":
							user.setName(in.nextString());
						break;
						case "secondName":
							user.setSecondName(in.nextString());
						break;
						case "sex":
							user.setSex(in.nextString().toCharArray()[0]);
						break;
						case "acessLevel":
							user.setAcessLevel(Integer.parseInt(in.nextString()));
						break;
						case "email":
							user.setEmail(in.nextString());
						break;
						case "phone":
							user.setPhone(in.nextString());
						break;
						case "login":
							user.setLogin(in.nextString());
						break;
						case "status":
							user.setStatus(in.nextString().toCharArray()[0]);
						break;
						case "password":
							user.setPassword(in.nextString());
						break;
						case "instituicao":
							Instituicao instituicao = instituicaoAdpater.read(in);
							user.setInstituicao(instituicao);
						break;
						default:break;
		        	}
		    	}
		    	else in.skipValue();
		    }
		    in.endObject();
		}
        return user;
	}
	
	
	@Override
	public void write(JsonWriter out, Usuario user) throws IOException {
	   
		if (user == null) {
	       out.nullValue();
	       return;
		}

		out.beginObject();
		out.name("idUsuario").value(user.getIdUsuario());
		out.name("name").value(user.getName());
		out.name("secondName").value(user.getSecondName());
		out.name("sex").value(user.getSex());
		out.name("acessLevel").value(user.getAcessLevel());
		out.name("email").value(user.getEmail());
		out.name("phone").value(user.getPhone());
		out.name("login").value(user.getLogin());
		out.name("status").value(user.getStatus());
		out.name("instituicao").jsonValue(Util.objectToJson(user.getInstituicao()));
		out.endObject();
	}
		
	
}
