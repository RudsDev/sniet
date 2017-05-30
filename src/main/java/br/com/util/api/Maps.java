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

public class Maps {

	private GeoApiContext context = new GeoApiContext().setApiKey("AIzaSyBL3U0sz0c75omwtSikefpx2AIXLqoQLuk");
	private Incidente incidente = new Incidente();
	private LatLng location;
	private GeocodingApiRequest reverso, direto; //reverso
	private String address = "praia de copacabana";

	public String latitude(){
		direto = GeocodingApi.geocode(context, address);
		GeocodingResult[] T;
		try {
			T = direto.await();
			Double a = T[0].geometry.location.lat;
			return a.toString();
		} catch (ApiException | InterruptedException | IOException e) {
			// TODO Auto-generated catch block
			//e.printStackTrace();
			return "Erro!";
		}
	}
	
	public String testeJson(){
		
		IncidenteDao i = new IncidenteDao();
		List<Incidente> incidentes = i.teste1();
		
		return Util.objectToJson(incidentes);
		
	}

	public List<Incidente> testeLatitude(){

		IncidenteDao i = new IncidenteDao();
		List<Incidente> incidentes = i.teste1();
		
		return incidentes;
	}

	public String incidenteLatitude(){

		IncidenteDao i = new IncidenteDao();

		return i.teste().getLatitude().toString();
	}

	public String incidenteLongitude(){

		IncidenteDao i = new IncidenteDao();

		return i.teste().getLongitude().toString();

	}

	public String incidenteDescricao(){

		return "";
	}

	public String longitude(){
		direto = GeocodingApi.geocode(context, address);
		GeocodingResult[] T;
		try {
			T = direto.await();
			Double a = T[0].geometry.location.lng;
			return a.toString();
		} catch (ApiException | InterruptedException | IOException e) {
			// TODO Auto-generated catch block
			//e.printStackTrace();
			return "Erro!";
		}
	}

	public String descricao(){

		location = new LatLng(incidente.getLatitude(), incidente.getLongitude());

		return "";
	}

	public LatLng location(){

		direto = GeocodingApi.geocode(context, address);
		GeocodingResult[] T;
		try {
			T = direto.await();
			location = new LatLng(T[0].geometry.location.lat, T[0].geometry.location.lng);
			//Double a = T[0].geometry.location.lng;
			return location;
		} catch (ApiException | InterruptedException | IOException e) {
			// TODO Auto-generated catch block
			//e.printStackTrace();
			return location;
		}
	}
	
	public String teste(){

		incidente.setLatitude(Double.parseDouble(latitude()));//(-22.792438);
		incidente.setLongitude(Double.parseDouble(longitude()));//(-43.169765);
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


			/*Aqui terá na saída todos os endereços que foi recebido.
			for (int i=1; i<T.length;i++){
				System.out.println("\nEndereço Formatado: "+T[i].formattedAddress);
				System.out.println("\nPlace ID: "+T[i].placeId);
			}*/
			//Existem outros atributos dentro do objeto.

		} catch (ApiException | InterruptedException | IOException e) {
			// TODO Auto-generated catch block
			//	e.printStackTrace();
			//System.out.println("Deu erro!");
			return "Deu erro!";
		}
/*
		try {
			GeocodingResult[] T = direto.await();
			System.out.println("FormattedAddress: "+T[0].formattedAddress);
			System.out.println("Types: "+T[0].types[0]);
			System.out.println("Geometry: "+T[0].geometry.location.lat);
			System.out.println("Geometry: "+T[0].geometry.location.lng);
			System.out.println("Geometry: "+T[0].geometry.locationType.toUrlValue());
		} catch (ApiException | InterruptedException | IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
*/
	}
	 
}