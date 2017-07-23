package br.com.api.util;

import java.io.IOException;
import java.util.List;
import com.google.maps.GeoApiContext;
import com.google.maps.GeocodingApi;
import com.google.maps.GeocodingApiRequest;
import com.google.maps.errors.ApiException;
import com.google.maps.model.AddressComponentType;
import com.google.maps.model.GeocodingResult;
import com.google.maps.model.LatLng;

import br.com.api.dao.LocalDao;
import br.com.api.model.Local;

public class Maps {

	private GeoApiContext context = new GeoApiContext().setApiKey("AIzaSyBL3U0sz0c75omwtSikefpx2AIXLqoQLuk");
	private LatLng location;
	private Local nomeLocal = new Local();
	private GeocodingApiRequest reverso, direto; //reverso
	private String address = "praia de boa viagem";
	
	
	@SuppressWarnings("static-access")
	public String local(){
	
		direto = GeocodingApi.geocode(context, address);
		GeocodingResult[] T;
		try {
			T = direto.await();
			AddressComponentType a = T[0].addressComponents[0].types[0].SUBLOCALITY_LEVEL_1;
			//address_components[i][componentForm[addressType]]
			return a.toString();
		} catch (ApiException | InterruptedException | IOException e) {
			// TODO Auto-generated catch block
			//e.printStackTrace();
			return "Erro!";
		}
	}
	
	@SuppressWarnings("static-access")
	public String cidade(){

		direto = GeocodingApi.geocode(context, address);
		GeocodingResult[] T;
		try {
			T = direto.await();
			AddressComponentType a = T[0].addressComponents[0].types[0].LOCALITY;
			return a.toString();
		} catch (ApiException | InterruptedException | IOException e) {
			// TODO Auto-generated catch block
			//e.printStackTrace();
			return "Erro!";
		}
	}
	
	@SuppressWarnings("static-access")
	public String uf(){

		direto = GeocodingApi.geocode(context, address);
		GeocodingResult[] T;
		try {
			T = direto.await();
			AddressComponentType a = T[0].addressComponents[0].types[0].ADMINISTRATIVE_AREA_LEVEL_1;
			return a.toString();
		} catch (ApiException | InterruptedException | IOException e) {
			// TODO Auto-generated catch block
			//e.printStackTrace();
			return "Erro!";
		}
	}
	
	@SuppressWarnings("static-access")
	public String pais(){

		direto = GeocodingApi.geocode(context, address);
		GeocodingResult[] T;
		try {
			T = direto.await();
			AddressComponentType a = T[0].addressComponents[0].types[0].COUNTRY;
			return a.toString();
		} catch (ApiException | InterruptedException | IOException e) {
			// TODO Auto-generated catch block
			//e.printStackTrace();
			return "Erro!";
		}
	}
	
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
	
	public String enderecoFormatado(){
		
		direto = GeocodingApi.geocode(context, address);
		GeocodingResult[] T;
		try {
			T = direto.await();
			String a = T[0].formattedAddress;
			return a;
		} catch (ApiException | InterruptedException | IOException e) {
			// TODO Auto-generated catch block
			//e.printStackTrace();
			return "Erro!";
		}
	}
	
	
/*	
	
	public String testeJson(){
		
		LocalDao i = new LocalDao();
		List<Local> locals =  i.teste1();
		
		return Util.objectToJson(locals);
		
	}

	public List<Local> testeLatitude(){

		LocalDao i = new LocalDao();
		List<Local> locals =  i.teste1();
		
		return locals;
	}

	public String localLatitude(){

		LocalDao i = new LocalDao();

		return i.teste().getLatitude().toString();
	}

	public String localLongitude(){

		LocalDao i = new LocalDao();

		return i.teste().getLongitude().toString();

	}

	public String localDescricao(){

		return "";
	}

	
/*
	public String descricao(){

		location = new LatLng(nomeLocal.getLocal().getLatitude(), local.getLocal().getLongitude());

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

		//nomeLocal.setLatitude(Double.parseDouble(latitude()));//(-22.792438);
		//nomeLocal.setLongitude(Double.parseDouble(longitude()));//(-43.169765);
		//location = new LatLng(nomeLocal.getLatitude(), nomeLocal.getLongitude());
		location = new LatLng(-22.139380, -43.297960);
		reverso = GeocodingApi.reverseGeocode(context, location);
		direto = GeocodingApi.geocode(context, address);
		try {
			GeocodingResult[] T = reverso.await();
			//Aqui ter� na sa�da o endere�o mais pr�ximo em riqueza de detalhes 
			System.out.println("\nEndereço Formatado: "+T[0].formattedAddress);
			System.out.println("\nPlace ID: "+T[0].placeId);
			
			return T[0].formattedAddress;

/*
			//Aqui ter� na sa�da todos os endere�os que foi recebido.
			for (int i=1; i<T.length;i++){
				System.out.println("\nEndere�o Formatado: "+T[i].formattedAddress);
				System.out.println("\nPlace ID: "+T[i].placeId);
			}
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

	}
*/	 
}