package br.com.api.adpters;

import java.io.IOException;

import com.google.gson.TypeAdapter;
import com.google.gson.stream.JsonReader;
import com.google.gson.stream.JsonToken;
import com.google.gson.stream.JsonWriter;

import br.com.api.model.Barbatana;
import br.com.api.model.Denticao;
import br.com.api.model.Dorso;
import br.com.api.model.Especie;
import br.com.api.model.Familia;
import br.com.api.model.Focinho;
import br.com.api.model.Reproducao;
import br.com.api.model.Ventre;
import br.com.api.util.Util;

public class EspecieTypeAdpater extends TypeAdapter<Especie> {

	@Override
	public Especie read(JsonReader in) throws IOException {
		
		Especie especie  = new Especie();

		JsonToken token = in.peek();
		
		if(token.equals(JsonToken.BEGIN_OBJECT)){
			in.beginObject();
		    while(!in.peek().equals(JsonToken.END_OBJECT)){
		    	if(in.peek().equals(JsonToken.NAME)){
		    		
		    		switch (in.nextName()) {
				      case "id":
				    	  especie.setIdEspecie(Integer.parseInt(in.nextString()));
				      break;
				      case "nomeCientifico":
				    	  especie.setNomeCientifico(in.nextString());
					  break;
				      case "descricao":
				    	  especie.setDescricao(in.nextString());
				      break;
				      case "fotoPadrao":
				    	  especie.setFotoPadrao(in.nextString());
				      break;

				      case "tamMenor":
				    	  especie.setTamMenor(Double.parseDouble(in.nextString()));
				      break;

				      case "tamMaior":
				    	  especie.setTamMaior(Double.parseDouble(in.nextString()));
				      break;

				      case "tamMedio":
				    	  especie.setTamMedio(Double.parseDouble(in.nextString()));
				      break;

				      case "tamMedioFilhote":
				    	  especie.setTamMedioFilhote(Double.parseDouble(in.nextString()));
				      break;

				      case "extincao":
				    	  especie.setExtincao(in.nextString().toCharArray()[0]);
				      break;

				      case "nomes":
				    	  especie.setNomes(null);
				      break;
				      
				      case "reproducao":
				    	especie.setReproducao((Reproducao) Util.jsonToObject(in.nextString(), Reproducao.class));  
				      break;
				      
				      case "focinho":
				    	  especie.setFocinho((Focinho) Util.jsonToObject(in.nextString(), Focinho.class));
				      break;
				      
				      case "familia":
				    	  especie.setFamilia((Familia) Util.jsonToObject(in.nextString(), Familia.class));
				      break;
				      
				      case "dorso":
				    	  especie.setDorso((Dorso) Util.jsonToObject(in.nextString(), Dorso.class));
				      break;
				      
				      case "ventre":
				    	  especie.setVentre((Ventre) Util.jsonToObject(in.nextString(), Ventre.class));
				      break;
				      
				      case "denticao":
				    	  especie.setDenticao((Denticao) Util.jsonToObject(in.nextString(), Denticao.class));
				      break;
				      
				      case "barbatana":
				    	  especie.setBarbatana((Barbatana) Util.jsonToObject(in.nextString(), Barbatana.class));
				      break;
				    }
		    	}
		    	else in.skipValue();
		    }
		    in.endObject();
		}		
        return especie;
	}
	
	
	@Override
	public void write(JsonWriter out, Especie especie) throws IOException {
	   
		if (especie == null) {
	       out.nullValue();
	       return;
		}

		out.beginObject();
		out.name("idEspecie").value(especie.getIdEspecie());
		out.name("nomeCientifico").value(especie.getNomeCientifico());
		out.name("descricao").value(especie.getDescricao());
		out.name("fotoPadrao").value(especie.getFotoPadrao());
		out.name("tamMenor").value(especie.getTamMenor());
		out.name("tamMedio").value(especie.getTamMedio());
		out.name("tamMaior").value(especie.getTamMaior());
		out.name("tamMedioFilhote").value(especie.getTamMedioFilhote());
		out.name("extincao").value(especie.getExtincao());
		out.name("nomes").jsonValue(Util.objectToJson(especie.getNomes()));
		out.name("reproducao").jsonValue(Util.objectToJson(especie.getReproducao()));
		out.name("focinho").jsonValue(Util.objectToJson(especie.getFocinho()));
		out.name("familia").jsonValue(Util.objectToJson(especie.getFamilia()));
		out.name("dorso").jsonValue(Util.objectToJson(especie.getDorso()));
		out.name("ventre").jsonValue(Util.objectToJson(especie.getVentre()));
		out.name("denticao").jsonValue(Util.objectToJson(especie.getDenticao()));
		out.name("barbatana").jsonValue(Util.objectToJson(especie.getBarbatana()));
		out.endObject();
	}
		
	
}
