package br.com.api.adpters;

import java.io.IOException;
import com.google.gson.TypeAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonToken;
import com.google.gson.stream.JsonWriter;
import br.com.api.model.Instituicao;

public class NameTypeAdpater extends TypeAdapter<Instituicao> {

	@Override
	public Instituicao read(JsonReader in) throws IOException {
		
		Instituicao instituicao  = new Instituicao();

		JsonToken token = in.peek();
		
		if(token.equals(JsonToken.BEGIN_OBJECT)){
			in.beginObject();
		    while(!in.peek().equals(JsonToken.END_OBJECT)){
		    	if(in.peek().equals(JsonToken.NAME)){
		    		
		    		switch (in.nextName()) {
				      case "id":
				    	  instituicao.setId(Integer.parseInt(in.nextString()));
				      break;
				      case "nome":
				    	  instituicao.setNome(in.nextString());
					  break;
				      case "registro":
				    	  instituicao.setRegistro(in.nextString());
				      break;
				      case "tipoInstituicao":
				    	  instituicao.setTipoInstituicao(in.nextString());
				      break;
				    }
		    	}
		    	else in.skipValue();
		    }
		    in.endObject();
		}		
        return instituicao;
	}
	
	
	@Override
	public void write(JsonWriter out, Instituicao instituicao) throws IOException {
	   
		if (instituicao == null) {
	       out.nullValue();
	       return;
		}

		out.beginObject();
		out.name("id").value(instituicao.getId());
		out.name("nome").value(instituicao.getNome());
		out.name("registro").value(instituicao.getRegistro());
		out.endObject();
	}
		
	
}
