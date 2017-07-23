package br.com.api.util;

import java.io.IOException;

import com.google.maps.GeoApiContext;
import com.google.maps.GeocodingApi;
import com.google.maps.GeocodingApiRequest;
import com.google.maps.errors.ApiException;
import com.google.maps.model.AddressComponent;
import com.google.maps.model.GeocodingResult;
import com.google.maps.model.LatLng;

public class Geografico {
	
	private String nomeLocal, pais, uf, cidade, bairro, latitude, longitude;
	
	private GeoApiContext context = new GeoApiContext().setApiKey("AIzaSyBL3U0sz0c75omwtSikefpx2AIXLqoQLuk");
	private LatLng location;
	private GeocodingApiRequest direto; //reverso
	private String address = "praia de copacabana";

	public String getNomeLocal() {
		return nomeLocal;
	}
	public void setNomeLocal(String nomeLocal) {
		this.nomeLocal = nomeLocal;
	}

	@SuppressWarnings("static-access")
	public String getPais() {
		direto = GeocodingApi.geocode(context, address);//this.nomeLocal
		GeocodingResult[] T;
		try {
			T = direto.await();
			AddressComponent[] pais = T[0].addressComponents;

			System.out.println(pais[0].longName);
			System.out.println(pais[0].shortName);
			//System.out.println("ADMINISTRATIVE_AREA_LEVEL_1 "+pais[0].types.length);
			//System.out.println("ADMINISTRATIVE_AREA_LEVEL_1 "+pais[0].types[0].valueOf(pais[0].types[0].toString()));
			System.out.println("ADMINISTRATIVE_AREA_LEVEL_2 "+pais[0].types[0].toCanonicalLiteral());
			//System.out.println("ADMINISTRATIVE_AREA_LEVEL_3 "+pais[0].types[0].ADMINISTRATIVE_AREA_LEVEL_3);
			//System.out.println("ADMINISTRATIVE_AREA_LEVEL_4 "+pais[0].types[0].ADMINISTRATIVE_AREA_LEVEL_4);
			//System.out.println("ADMINISTRATIVE_AREA_LEVEL_5 "+pais[0].types[0].ADMINISTRATIVE_AREA_LEVEL_5);
			//System.out.println("COLLOQUIAL_AREA "+pais[0].types[0].COLLOQUIAL_AREA);
			//System.out.println("COUNTRY "+pais[0].types[0].COUNTRY);
			//System.out.println("LOCALITY "+pais[0].types[0].LOCALITY);
			//System.out.println("POINT_OF_INTEREST "+pais[0].types[0].POINT_OF_INTEREST);
			//System.out.println("SUBLOCALITY "+pais[0].types[0].SUBLOCALITY);
			//System.out.println("SUBLOCALITY_LEVEL_1 "+pais[0].types[0].SUBLOCALITY_LEVEL_1);
			//System.out.println("SUBLOCALITY_LEVEL_2 "+pais[0].types[0].SUBLOCALITY_LEVEL_2);
			//System.out.println("SUBLOCALITY_LEVEL_3 "+pais[0].types[0].SUBLOCALITY_LEVEL_3);
			//System.out.println("SUBLOCALITY_LEVEL_4 "+pais[0].types[0].SUBLOCALITY_LEVEL_4);
			//System.out.println("SUBLOCALITY_LEVEL_5 "+pais[0].types[0].SUBLOCALITY_LEVEL_5);
			
			return pais.toString();
		} catch (ApiException | InterruptedException | IOException e) {
			// TODO Auto-generated catch block
			//e.printStackTrace();
			return "Erro!";
		}
	}
	public void setPais(String pais) {
		this.pais = pais;
	}
	
	public String getUf() {
		return uf;
	}
	public void setUf(String uf) {
		this.uf = uf;
	}
	
	public String getCidade() {
		return cidade;
	}
	public void setCidade(String cidade) {
		this.cidade = cidade;
	}
	
	public String getBairro() {
		return bairro;
	}
	public void setBairro(String bairro) {
		this.bairro = bairro;
	}
	
	//Latitude
	public String getLatitude() {
		direto = GeocodingApi.geocode(context, address);//this.nomeLocal
		GeocodingResult[] T;
		try {
			T = direto.await();
			Double latitude = T[0].geometry.location.lat;
			return latitude.toString();
		} catch (ApiException | InterruptedException | IOException e) {
			// TODO Auto-generated catch block
			//e.printStackTrace();
			return "Erro!";
		}
	}
	public void setLatitude(String latitude) {
		this.latitude = latitude;
	}
	
	//Longitude
	public String getLongitude() {
		direto = GeocodingApi.geocode(context, address);//this.nomeLocal
		GeocodingResult[] T;
		try {
			T = direto.await();
			Double longitude = T[0].geometry.location.lng;
			return longitude.toString();
		} catch (ApiException | InterruptedException | IOException e) {
			// TODO Auto-generated catch block
			//e.printStackTrace();
			return "Erro!";
		}
	}
	public void setLongitude(String longitude) {
		this.longitude = longitude;
	}
}
