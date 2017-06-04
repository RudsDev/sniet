package br.com.util.api;

import java.io.IOException;
import java.util.List;
import com.google.maps.GeoApiContext;
import com.google.maps.GeocodingApi;
import com.google.maps.GeocodingApiRequest;
import com.google.maps.errors.ApiException;
import com.google.maps.model.GeocodingResult;
import com.google.maps.model.LatLng;
import br.com.dao.api.IncidenteDao;
import br.com.model.api.Incidente;

public class MapsTest {

	private GeoApiContext context = new GeoApiContext()
			.setApiKey("AIzaSyBL3U0sz0c75omwtSikefpx2AIXLqoQLuk");

	private LatLng location;
	private GeocodingApiRequest reverso, direto; //reverso

	
	/**
	 * Retorna a latitude do local passado como parametro.
	 * 
	 * @param String - Nome do local desejado. 
	 * Ex: Praia de Boa Viagem.
	 * 
	 * 
	 * @return String
	 */
	public String latitudeLocal(String nomeLocal){
		
		this.direto = GeocodingApi.geocode(this.context, nomeLocal);
		GeocodingResult[] T;
		try {
			T = this.direto.await();
			Double a = T[0].geometry.location.lat;
			return a.toString();
		} catch (ApiException | InterruptedException | IOException e) {
			e.printStackTrace();
			return "Erro!";
		}
	}
	
	/**
	 * Retorna a longitude do local passado como parametro.
	 * 
	 * @param String - Nome do local desejado. 
	 * Ex: Praia de Boa Viagem.
	 * 
	 * 
	 * @return String
	 */
	public String longitude(String nomeLocal){
		this.direto = GeocodingApi.geocode(this.context, nomeLocal);
		GeocodingResult[] T;
		try {
			T = direto.await();
			Double a = T[0].geometry.location.lng;
			return a.toString();
		} catch (ApiException | InterruptedException | IOException e) {
			e.printStackTrace();
			return "Erro!";
		}
	}
	
	/**
	 * Retorna o location do local passado como parametro.
	 * 
	 * @param String - Nome do local desejado. 
	 * Ex: Praia de Boa Viagem.
	 * 
	 * 
	 * @return String
	 */
	public LatLng location(String nomeLocal){

		this.direto = GeocodingApi.geocode(this.context, nomeLocal);
		GeocodingResult[] T;
		try {
			T = direto.await();
			location = new LatLng(T[0].geometry.location.lat,
					T[0].geometry.location.lng);
			return location;
		} catch (ApiException | InterruptedException | IOException e) {
			e.printStackTrace();
			return location;
		}
	}
	
	
	/**
	 * Retorna a listagem de objetos incidentes existentes no BD
	 * em formato JSON.
	 *  
	 * @return String
	 */
	public String listaIncidentesJson(){
		
		IncidenteDao i = new IncidenteDao();
		List<Incidente> incidentes =  i.teste1();
		
		return Util.objectToJson(incidentes);
		
	}


	//TODO Transformar em método que retorne a lat/long em JSON
	public String incidenteLongitude(){
		IncidenteDao i = new IncidenteDao();
		return i.teste().getLocal().getLongitude().toString();
	}

	
	public String teste(String address){

		//incidente.getLocal().setLatitude(Double.parseDouble(latitude()));
		//incidente.getLocal().setLongitude(Double.parseDouble(longitude()));
		//location = new LatLng(incidente.getLatitude(), incidente.getLongitude());
		location = new LatLng(-22.139380, -43.297960);
		reverso = GeocodingApi.reverseGeocode(context, location);
		direto = GeocodingApi.geocode(context, address);
		try {
			GeocodingResult[] T = reverso.await();
			//Aqui terá na saída o endereço mais próximo em riqueza de detalhes 
			//System.out.println("\nEndereço Formatado: "+T[0].formattedAddress);
			//System.out.println("\nPlace ID: "+T[0].placeId);
			
			return T[0].formattedAddress;


			/*Aqui terá na saída todos os endereços que foram recebidos.
			for (int i=1; i<T.length;i++){
				System.out.println("\nEndereço Formatado: "+T[i].formattedAddress);
				System.out.println("\nPlace ID: "+T[i].placeId);
			}*/
			//Existem outros atributos dentro do objeto.

		} catch (ApiException | InterruptedException | IOException e) {
				e.printStackTrace();
				return "Deu erro!";
		}
	}
	 
}